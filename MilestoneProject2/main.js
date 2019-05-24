const ageChart = dc.barChart("#ageChart-here");
const bootcampChart = dc.pieChart("#bootcampChart-here");
const whichCampChart = dc.pieChart("#whichCampChart-here");
const countryChart = dc.rowChart("#countryChart-here");

d3.csv("/data/2017-fCC-New-Coders-Survey-Data.csv").then(function(survey) {
  survey.forEach(x => (x.Age = +x.Age));

  const ndx = crossfilter(survey);

  const ageDim = ndx.dimension(function(d) {
    return d.Age;
  });
  const ageGroup = ageDim.group().reduceSum(function(d) {
    return d.Age;
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

  const countryDim = ndx.dimension(function(d) {
    return d.CountryLive;
  });
  const countryGroup = countryDim.group().reduceSum(function(d) {
    return d.CountryLiveValue;
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

  countryChart
    .width(1000)
    .height(480)
    .dimension(countryDim)
    .group(countryGroup)
    .cap(10)
    .othersGrouper(false);

  dc.renderAll();
});
