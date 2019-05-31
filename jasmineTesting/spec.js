describe("Dc.js dashboard rendering", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

  beforeAll(function(done) {
    setTimeout(done, 2000);
  });

  describe("are SVGs appended to all charting DIVs", function() {
    it("Should show all previously empty 'XXXChart-here' DIVs have had childElements", function() {
      const chart1 = document.getElementById("ageChart-here");
      const chart2 = document.getElementById("countryChart-here");
      const chart3 = document.getElementById("genderChart-here");
      const chart4 = document.getElementById("educationChart-here");
      const chart5 = document.getElementById("minorityChart-here");
      const chart6 = document.getElementById("employmentCompositeChart-here");
      const chart7 = document.getElementById("roleInterestChart-here");
      const chart8 = document.getElementById("whereChart-here");
      const chart9 = document.getElementById("bootcampChart-here");
      const chart10 = document.getElementById("whichCampChart-here");
      expect(
        chart1.childElementCount &&
          chart2.childElementCount &&
          chart3.childElementCount &&
          chart4.childElementCount &&
          chart5.childElementCount &&
          chart6.childElementCount &&
          chart7.childElementCount &&
          chart8.childElementCount &&
          chart9.childElementCount &&
          chart10.childElementCount
      ).toBe(1);
    });

    it("should show all charts have a width less than their containers", function() {
      const chart1 = document.getElementById("ageChart-here");
      const chart2 = document.getElementById("countryChart-here");
      const chart3 = document.getElementById("genderChart-here");
      const chart4 = document.getElementById("educationChart-here");
      const chart5 = document.getElementById("minorityChart-here");
      const chart6 = document.getElementById("employmentCompositeChart-here");
      const chart7 = document.getElementById("roleInterestChart-here");
      const chart8 = document.getElementById("whereChart-here");
      const chart9 = document.getElementById("bootcampChart-here");
      const chart10 = document.getElementById("whichCampChart-here");

      const child1 = chart1.children[0].attributes[0].nodeValue;
      const child2 = chart2.children[0].attributes[0].nodeValue;
      const child3 = chart3.children[0].attributes[0].nodeValue;
      const child4 = chart4.children[0].attributes[0].nodeValue;
      const child5 = chart5.children[0].attributes[0].nodeValue;
      const child6 = chart6.children[0].attributes[0].nodeValue;
      const child7 = chart7.children[0].attributes[0].nodeValue;
      const child8 = chart8.children[0].attributes[0].nodeValue;
      const child9 = chart9.children[0].attributes[0].nodeValue;
      const child10 = chart10.children[0].attributes[0].nodeValue;
      expect(child1).toBeLessThan(chart1.offsetWidth);
      expect(child2).toBeLessThan(chart2.offsetWidth);
      expect(child3).toBeLessThan(chart3.offsetWidth);
      expect(child4).toBeLessThan(chart4.offsetWidth);
      expect(child5).toBeLessThan(chart5.offsetWidth);
      expect(child6).toBeLessThan(chart6.offsetWidth);
      expect(child7).toBeLessThan(chart7.offsetWidth);
      expect(child8).toBeLessThan(chart8.offsetWidth);
      expect(child9).toBeLessThan(chart9.offsetWidth);
      expect(child10).toBeLessThan(chart10.offsetWidth);
    });

    it("should show all charts have a height less than their containers", function() {
      const chart1 = document.getElementById("ageChart-here");
      const chart2 = document.getElementById("countryChart-here");
      const chart3 = document.getElementById("genderChart-here");
      const chart4 = document.getElementById("educationChart-here");
      const chart5 = document.getElementById("minorityChart-here");
      const chart6 = document.getElementById("employmentCompositeChart-here");
      const chart7 = document.getElementById("roleInterestChart-here");
      const chart8 = document.getElementById("whereChart-here");
      const chart9 = document.getElementById("bootcampChart-here");
      const chart10 = document.getElementById("whichCampChart-here");

      const child1 = chart1.children[0].attributes[1].nodeValue;
      const child2 = chart2.children[0].attributes[1].nodeValue;
      const child3 = chart3.children[0].attributes[1].nodeValue;
      const child4 = chart4.children[0].attributes[1].nodeValue;
      const child5 = chart5.children[0].attributes[1].nodeValue;
      const child6 = chart6.children[0].attributes[1].nodeValue;
      const child7 = chart7.children[0].attributes[1].nodeValue;
      const child8 = chart8.children[0].attributes[1].nodeValue;
      const child9 = chart9.children[0].attributes[1].nodeValue;
      const child10 = chart10.children[0].attributes[1].nodeValue;
      expect(child1).toBeLessThan(chart1.offsetHeight);
      expect(child2).toBeLessThan(chart2.offsetHeight);
      expect(child3).toBeLessThan(chart3.offsetHeight);
      expect(child4).toBeLessThan(chart4.offsetHeight);
      expect(child5).toBeLessThan(chart5.offsetHeight);
      expect(child6).toBeLessThan(chart6.offsetHeight);
      expect(child7).toBeLessThan(chart7.offsetHeight);
      expect(child8).toBeLessThan(chart8.offsetHeight);
      expect(child9).toBeLessThan(chart9.offsetHeight);
      expect(child10).toBeLessThan(chart10.offsetHeight);
    });
  });
});
