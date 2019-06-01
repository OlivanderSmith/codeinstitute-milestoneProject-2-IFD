window.addEventListener("resize", function() {
  "use strict";
  window.location.reload();
});

const ageChart = dc.barChart("#ageChart-here");
const countryChart = dc.rowChart("#countryChart-here");
const genderChart = dc.pieChart("#genderChart-here");
const educationChart = dc.rowChart("#educationChart-here");
const minorityChart = dc.pieChart("#minorityChart-here");
const employmentCompositeChart = dc.compositeChart(
  "#employmentCompositeChart-here"
);
employmentCompositeChart.rightYAxis().tickFormat(d3.format("$"));
const roleInterestChart = dc.rowChart("#roleInterestChart-here");
const whereChart = dc.pieChart("#whereChart-here");
const bootcampChart = dc.pieChart("#bootcampChart-here");
const whichCampChart = dc.pieChart("#whichCampChart-here");

function widthAuto(element) {
  var width =
    element &&
    element.getBoundingClientRect &&
    element.getBoundingClientRect().width;
  return width && width > employmentCompositeChart.minWidth() ? width : null;
}

function heightAuto(element) {
  var height =
    element &&
    element.getBoundingClientRect &&
    element.getBoundingClientRect().height;
  return height && height > employmentCompositeChart.minHeight(300)
    ? height
    : employmentCompositeChart.minHeight();
}

d3.csv("Data/2017-fCC-New-Coders-Survey-Data.csv").then(function draw(survey) {
  survey.forEach(x => (x.Age = +x.Age));

  const ndx = crossfilter(survey);

  const ageDim = ndx.dimension(function(d) {
    return d.Age;
  });
  const ageGroup = ageDim.group().reduceSum(function(d) {
    return d.Age;
  });

  const countryDim = ndx.dimension(function(d) {
    return d.CountryLive;
  });
  const countryGroup = countryDim.group().reduceSum(function(d) {
    return d.CountryLiveValue;
  });

  const genderDim = ndx.dimension(function(d) {
    return d.Gender.charAt(0).toUpperCase() + d.Gender.slice(1);
  });
  const genderGroup = genderDim.group().reduceSum(function(d) {
    return d.GenderValue;
  });

  const educationDim = ndx.dimension(function(d) {
    return d.SchoolDegree.charAt(0).toUpperCase() + d.SchoolDegree.slice(1);
  });
  const educationGroup = educationDim.group().reduceSum(function(d) {
    return d.SchoolDegreeValue;
  });

  const minorityDim = ndx.dimension(function(d) {
    return d.IsEthnicMinority;
  });
  const minorityGroup = minorityDim.group().reduceSum(function(d) {
    return d.IsEthnicMinorityValue;
  });

  const compositeFieldDim = ndx.dimension(function(d) {
    return (
      d.EmploymentField.charAt(0).toUpperCase() + d.EmploymentField.slice(1)
    );
  });
  const compositeFieldGroup = compositeFieldDim.group().reduceSum(function(d) {
    return d.EmploymentFieldValue;
  });
  const compositeIncomeGroup = compositeFieldDim.group().reduce(
    //custom reduce to get average salary per employment field and not the sum total which
    // reduceSum would give us

    //Add a fact
    function(p, v) {
      p.count++;
      p.total += parseInt(v.Income);
      p.average = p.total / p.count;
      return p;
    },
    //remove a fact
    function(p, v) {
      p.count--;
      if (p.count === 0) {
        p.total = 0;
        p.average = 0;
      } else {
        p.total -= parseInt(v.Income);
        p.average = p.total / p.count;
      }
      return p;
    },

    //Initialse reducer
    function() {
      return { count: 0, total: 0, average: 0 };
    }
  );

  const roleInterestDim = ndx.dimension(function(d) {
    return d.JobRoleInterest;
  });
  const roleInterestGroup = roleInterestDim.group().reduceSum(function(d) {
    return d.JobRoleInterestValue;
  });

  const whereDim = ndx.dimension(function(d) {
    return d.JobWherePref.charAt(0).toUpperCase() + d.JobWherePref.slice(1);
  });
  const whereGroup = whereDim.group().reduceSum(function(d) {
    return d.JobWherePrefValue;
  });

  const bootcampDim = ndx.dimension(function(d) {
    return d.AttendedBootcamp;
  });
  const bootcampGroup = bootcampDim.group().reduceSum(function(d) {
    return d.AttendedBootcampValue;
  });

  const whichCampDim = ndx.dimension(function(d) {
    return d.BootcampName.charAt(0).toUpperCase() + d.BootcampName.slice(1);
  });
  const whichCampGroup = whichCampDim.group().reduceSum(function(d) {
    return d.BootcampNameValue;
  });

  ageChart
    .width(widthAuto)
    .height(heightAuto)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .x(d3.scaleLinear().domain([10, 70]))
    .y(d3.scaleLinear().domain([0, 25000]))
    .brushOn(false)
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .elasticY(true)
    .dimension(ageDim)
    .group(ageGroup)
    .on("renderlet", function(ageChart) {
      ageChart.selectAll("rect").on("click", function(d) {
        console.log("click!", d);
      });
    });

  countryChart
    .width(widthAuto)
    .height(heightAuto)
    .margins({ top: 0, right: 50, bottom: 30, left: 50 })
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .dimension(countryDim)
    .group(countryGroup)
    .elasticX(true)
    .cap(10)
    .othersGrouper(false);

  genderChart
    .width(widthAuto)
    .height(heightAuto)
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .externalRadiusPadding(20)
    .innerRadius(50)
    .legend(
      dc
        .legend()
        .x(160)
        .y(135)
        .gap(10)
    )
    .dimension(genderDim)
    .group(genderGroup)
    .cap(2)
    .othersGrouper(false)
    .renderlet(function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) + "%"
        );
      });
    });

  educationChart
    .width(widthAuto)
    .height(heightAuto)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .dimension(educationDim)
    .group(educationGroup)
    .elasticX(true)
    .cap(10)
    .othersGrouper(false);

  minorityChart
    .width(widthAuto)
    .height(heightAuto)
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .dimension(minorityDim)
    .group(minorityGroup)
    .externalRadiusPadding(20)
    .innerRadius(50)
    .legend(
      dc
        .legend()
        .x(175)
        .y(130)
        .gap(15)
    )
    .renderlet(function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) + "%"
        );
      });
    });

  employmentCompositeChart
    .width(widthAuto)
    .height(heightAuto)
    .margins({ top: 10, right: 80, bottom: 40, left: 50 })
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .x(d3.scaleBand())
    .xAxisLabel("Current Job role")
    .yAxisLabel("Count")
    .elasticY(true)
    .rightYAxisLabel("Average Salary by role")
    .xUnits(dc.units.ordinal)
    .group(compositeFieldGroup)
    ._rangeBandPadding(1)
    .brushOn(false)
    .compose([
      dc
        .barChart(employmentCompositeChart)
        .dimension(compositeFieldDim)
        .ordinalColors(["#8ec9d7", "#59a9bc", "#cce8ef", "#9bd187", "#edeeef"])
        .centerBar(true),
      dc
        .lineChart(employmentCompositeChart)
        .dimension(compositeFieldDim)
        .group(compositeIncomeGroup)
        .useRightYAxis(true)
        .renderDataPoints(false)
        .curve(d3.curveMonotoneX)
        .valueAccessor(function(d) {
          return d.value.average;
        })
    ]);

  roleInterestChart
    .width(widthAuto)
    .height(heightAuto)
    .elasticX(true)
    .margins({ top: 10, right: 50, bottom: 30, left: 50 })
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .dimension(roleInterestDim)
    .group(roleInterestGroup)
    .cap(10)
    .othersGrouper(false);

  whereChart
    .width(widthAuto)
    .height(heightAuto)
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .dimension(whereDim)
    .group(whereGroup)
    .cap(3)
    .othersGrouper(false)
    .externalRadiusPadding(15)
    .innerRadius(70)
    .legend(
      dc
        .legend()
        .x(135)
        .y(120)
        .gap(10)
        .legendWidth(10)
    )
    .externalLabels(10)
    .on("pretransition", function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) + "%"
        );
      });
    });

  bootcampChart
    .width(widthAuto)
    .height(heightAuto)
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .externalRadiusPadding(0)
    .innerRadius(60)
    .dimension(bootcampDim)
    .group(bootcampGroup)
    .legend(
      dc
        .legend()
        .x(255)
        .y(130)
        .gap(15)
    )
    .on("pretransition", function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) + "%"
        );
      });
    });

  whichCampChart
    .width(widthAuto)
    .height(heightAuto)
    .ordinalColors(["#59a9bc", "#9bd187", "#8ec9d7", "#cce8ef", "#edeeef"])
    .externalRadiusPadding(0)
    .innerRadius(60)
    .dimension(whichCampDim)
    .group(whichCampGroup)
    .legend(
      dc
        .legend()
        .x(-10)
        .y(0)
        .gap(15)
        .legendWidth(300)
    )
    .cap(10)
    .othersGrouper(false)
    .on("pretransition", function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) + "%"
        );
      });
    });

  dc.renderAll();

  function AddXAxis(chartToUpdate, displayText) {
    chartToUpdate
      .svg()
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", chartToUpdate.width() / 2)
      .attr("y", chartToUpdate.height() - 3.5)
      .text(displayText);
  }
  AddXAxis(countryChart, "Count");
  AddXAxis(educationChart, "Count");
});

// -------------------------------------Burger Menu script
// -------------------------------------Burger Menu script
// -------------------------------------Burger Menu script

const burgerButton = document.getElementById("burgerButton");
const burgerMenu = document.getElementById("burgerMenu");
const burgerIcon = document.getElementById("burgerIcon");

const hidden = "hiddenMenu";
const down = "menuSlideDown";
const up = "menuSlideUp";
const unhidden = "unhiddenMenu";
const startways = "menuOrigin";
const sideways = "menuOpen";
const rightways = "menuClosed";

const burgerClick = (burgerButton.onclick = () => {
  if (burgerMenu.classList.contains(hidden)) {
    burgerMenu.classList.add(down);
    burgerMenu.classList.remove(hidden);
    burgerMenu.classList.remove(up);
    setTimeout(() => burgerMenu.classList.add(unhidden), 100);
    burgerIcon.classList.remove(startways);
    burgerIcon.classList.remove(rightways);
    burgerIcon.classList.add(sideways);
  } else if (burgerMenu.classList.contains(unhidden)) {
    burgerMenu.classList.add(up);
    burgerMenu.classList.remove(down);
    burgerMenu.classList.add(hidden);
    setTimeout(() => burgerMenu.classList.remove(unhidden), 100);
    burgerIcon.classList.remove(sideways);
    burgerIcon.classList.add(rightways);
    burgerIcon.classList.add(startways);
  }
});

// -----------------------------------Hide/Unhide menu onScroll

const navBar = document.getElementById("navBar");
var previousPosition = window.pageYOffset;

window.onscroll = () => {
  var currentPosition = window.pageYOffset;

  if (window.pageYOffset < 10) {
    navBar.style.top = "0";
  } else if (previousPosition > currentPosition) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-50vh";
  }
  previousPosition = currentPosition;
};
