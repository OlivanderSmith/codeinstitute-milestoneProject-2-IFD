const ageChart = dc.barChart("#ageChart-here");
const genderChart = dc.pieChart("#genderChart-here");
const countryChart = dc.rowChart("#countryChart-here");
const educationChart = dc.rowChart("#educationChart-here");
const minorityChart = dc.pieChart("#minorityChart-here");
const employmentCompositeChart = dc.compositeChart(
  "#employmentCompositeChart-here"
);
const roleInterestChart = dc.rowChart("#roleInterestChart-here");
const whereChart = dc.pieChart("#whereChart-here");
const bootcampChart = dc.pieChart("#bootcampChart-here");
const whichCampChart = dc.pieChart("#whichCampChart-here");

d3.csv("/data/2017-fCC-New-Coders-Survey-Data.csv").then(function(survey) {
  survey.forEach(x => (x.Age = +x.Age));

  const ndx = crossfilter(survey);

  const ageDim = ndx.dimension(function(d) {
    return d.Age;
  });
  const ageGroup = ageDim.group().reduceSum(function(d) {
    return d.Age;
  });

  const genderDim = ndx.dimension(function(d) {
    return d.Gender;
  });
  const genderGroup = genderDim.group().reduceSum(function(d) {
    return d.GenderValue;
  });

  const countryDim = ndx.dimension(function(d) {
    return d.CountryLive;
  });
  const countryGroup = countryDim.group().reduceSum(function(d) {
    return d.CountryLiveValue;
  });

  const educationDim = ndx.dimension(function(d) {
    return d.SchoolDegree;
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
    return d.EmploymentField;
  });
  const compositeFieldGroup = compositeFieldDim.group().reduceSum(function(d) {
    return d.EmploymentFieldValue;
  });
  const compositeIncomeGroup = compositeFieldDim.group().reduceSum(function(d) {
    return d.Income;
  });

  const roleInterestDim = ndx.dimension(function(d) {
    return d.JobRoleInterest;
  });
  const roleInterestGroup = roleInterestDim.group().reduceSum(function(d) {
    return d.JobRoleInterestValue;
  });

  const whereDim = ndx.dimension(function(d) {
    return d.JobWherePref;
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
    return d.BootcampName;
  });
  const whichCampGroup = whichCampDim.group().reduceSum(function(d) {
    return d.BootcampNameValue;
  });

  ageChart
    .width(1000)
    .height(480)
    .x(d3.scaleLinear().domain([10, 75]))
    .y(d3.scaleLinear().domain([0, 26000]))
    .brushOn(false)
    .yAxisLabel("Count")
    .xAxisLabel("Age")
    .dimension(ageDim)
    .group(ageGroup)
    .on("renderlet", function(ageChart) {
      ageChart.selectAll("rect").on("click", function(d) {
        console.log("click!", d);
      });
    });

  genderChart
    .width(1000)
    .height(480)
    .dimension(genderDim)
    .group(genderGroup)
    .cap(2)
    .othersGrouper(false);

  countryChart
    .width(1000)
    .height(480)
    .dimension(countryDim)
    .group(countryGroup)
    .cap(10)
    .othersGrouper(false);

  educationChart
    .width(1000)
    .height(480)
    .dimension(educationDim)
    .group(educationGroup)
    .cap(10)
    .othersGrouper(false);

  minorityChart
    .width(1000)
    .height(480)
    .dimension(minorityDim)
    .group(minorityGroup);

  employmentCompositeChart
    .width(1000)
    .height(480)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .group(compositeFieldGroup)
    ._rangeBandPadding(1)
    .brushOn(false)
    .compose([
      dc
        .barChart(employmentCompositeChart)
        .dimension(compositeFieldDim)
        .centerBar(true),
      dc
        .lineChart(employmentCompositeChart)
        .dimension(compositeFieldDim)
        .group(compositeIncomeGroup)
        .useRightYAxis(true)
        .renderDataPoints(true)
        .curve(d3.curveMonotoneX)
    ]);

  roleInterestChart
    .width(1000)
    .height(480)
    .dimension(roleInterestDim)
    .group(roleInterestGroup)
    .cap(10)
    .othersGrouper(false);

  whereChart
    .width(1000)
    .height(480)
    .dimension(whereDim)
    .group(whereGroup);

  bootcampChart
    .width(400)
    .height(400)
    .dimension(bootcampDim)
    .group(bootcampGroup)
    .legend(dc.legend())
    .on("pretransition", function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          d.data.key +
          " " +
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) +
          "%"
        );
      });
    });

  whichCampChart
    .width(1000)
    .height(480)
    .dimension(whichCampDim)
    .group(whichCampGroup)
    .legend(dc.legend())
    .cap(10)
    .othersGrouper(false)
    .on("pretransition", function(chart) {
      chart.selectAll("text.pie-slice").text(function(d) {
        return (
          d.data.key +
          " " +
          dc.utils.printSingleValue(
            ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100
          ) +
          "%"
        );
      });
    });

  dc.renderAll();
});
