# FreeCodeCamp.org annual survey data visualisation dashbaord

This project was built for the purpose of completing the Interactive Frontend Development Milestone Project from CodeInstitute.

This is a dashboard built using html, css, vanilla javascript, and a data visualisation library called DC.js which is a javascript library designed with the sole purpose of dimensional charting.

The dataset I've chosen to use is from FreeCodeCamp.org's (FCC) Annual members survey, which can be found here: https://www.kaggle.com/fccuser/the-freecodecamp-2017-new-coder-survey

FCC's platform, publications, & forum make it one of the best places for asking coding questions or brushing up on your programming skills. As more people flock to join the online community, FCC have been gathering data on their members via their annual survey; so, if you too are on your journey to becoming a coder this dashboard is designed to help you get an idea of where others stand and hopefully where the opportunities lie!

The survey is participated in by over 30,000 of FCC's members from around the world and its insights are valuable to anyone hoping to build a career in software development as it provides data about what jobs people in the sector have, what their salary is, and what they did (e.g. upskilling via a bootcamp) to get there.

I've chosen what I believe to be the most important insights available from this data and visualised it into the series of charts that make up this dashboard.

## UX

This site is designed to meet the criterion of the Milestone project set by CodeInstitute so users should find the dashboard to dislay meaningful insights derived from an external dataset in the form of various graphs and charts built using DC.js.

This website is for people, such as myself, who are learning (or looking to learn) to code and want to know more about the future ahead of them and what the market looks like. As participants of the survey ranged from absolute beginners to senior engineers it provides a wealth of information on what jobs are most highly sought after, what salary to expect, and from where (country). It also shows such information such as working habits e.g. do people prefer to work from home or from an office; all interesting information for someone planning their future career in this field.

The design for the website has taken Minimalist approach. There is a wealth of data in the dataset but only putting forward that which is interesting or helpful is important. Wireframe.cc was used to mock up the basic layout and design for the dashboard. It was a basic wireframe that shows the header section describing the purpose/meaning of the dashboard, followed by the 3 sections (the 3 most important dimensions for the users in mind) highlighted by the dashboard: Demographics, Employment data, and whether participants went to bootcamp. It also incorporates the nav bar and a footer section. You can see the original wireframe design here: https://wireframe.cc/d6511c

## Features

### NavBar

#### The NavBar is designed to help the user:

- navigate back to the the top (by clicking the logo-top left)
- navigate to any of the three sections that make up the dashboard (i.e. the charts relating to Demographics, Employment, and Bootcamps)
- reset the filters selected on the charts

The NavBar is designed to disappear on scrolling down so as not to disturb the UX while reappearing instantly on scrolling up to help ease navigation. It is fully responsive and changes to a dropdown menu from a burger on mobile

### Header

A simple header used to describe the purpose of the website and the source of the data

### Charts

Each chart is built using the data from the FCC dataset at https://www.kaggle.com/fccuser/the-freecodecamp-2017-new-coder-survey. Built using DC.js these charts are interactive. Clicking on certain data points on various charts will filter information accordingly. For example, if I was interested to see the average salary of women in India with software development roles I would click on the female pie slice of the 'Gender Breakdown' Pie chart, on the India row in the 'Where we live' Row chart and then scroll down to the 'Employment and Income composite' Composite chart an search for the Job role 'Software Development' to see that it is just less than \$65,000 USD.

Once various filters have been applied it can be difficult to keep track of which we have selected. To reset the filters simply click the reset filters link in the NavBar.

The javascript file used to create these scripts can be found here: https://github.com/OlivanderSmith/codeinstitute-milestoneProject-2-IFD/commit/ddd3473c92572b538dad272c8fc79dbbce777042

#### The Charts:

#### Demographics section

- Survey Respondents Age; non-interactive Bar chart

- Where we live; interactive Row chart; depicts country of residence

- Gender Breakdown; interactive Pie chart

- Level of Education; interactive row chart

- Surveyers of an Ethnic Minority; interactive Pie chart; do the participants identify as being part of an ethnic minority

#### Employment section
Employment and Income composite; interactive Composite chart; shows what participants' job roles are and the average salary for that role - Interested in the following roles; interactive Row chart; Displays what role participants wish to have - Where they want to Work; interactive Pie chart; e.g. from Home, in an office etc.

#### Bootcamp section
% went to Bootcamp; interactive Pie chart - Most popular bootcamps; interactive Pie chart; shows top 10 Bootcamps that participants did

#### Footer

Credits FCC and links to developers GitHub account page

### Features still to implement

update dataset to include 2018

- Fix mobile responsiveness issue regarding chart rendering; legibility reduced due to cramped axes labels etc.

- Current selected filters to be displayed.

- Multiple filtering via dropdown selection at beginning of dashboard

- further css transitions/effects

## Technologies Used

### JavaScript

All major functionality for this project is dependent on JavaScript.

Javascript was used to control the functionality of the NavBar disappearing and reappearing, in building the charts, and in testing. Various libraries where used to help with this:

#### DC.js

    All charts in this dashboard were rendered using the JavaScript library DC.js which you can learn more about here: https://dc-js.github.io/dc.js/

#### Jasmine.js

    The testing conducted to ensure that DC had rendered the charts, and at the correct size was done using the Jasmine testing framwork which you can learn about here: https://jasmine.github.io/

### HTML/CSS

The core structure of this website was developed using vanilla HTML and CSS. The CSS file can be found here: https://github.com/OlivanderSmith/codeinstitute-milestoneProject-2-IFD/tree/master/styles although not all styling was done here as the DC.js library relies on BootStrap for it's styling. What you see in the custom CSS file are CSS selectors chosen to orinet the charts, execute the design layout, build responsiveness, and to override certain DC.js's BootStrap styling.

## Testing

### Jasmine Testing

The following tests for the javascript in this project relate specifically to the rendering of charts designed using Dc.js . The tests are built using the Jasmine testing framework (https://github.com/OlivanderSmith/codeinstitute-milestoneProject-2-IFD/tree/master/jasmineTesting) that tested for svgs being appended in all designated chart divs, and that their sizing was correct for the container they were placed in. You can see the tests below:

```
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

```

### HTML/CSS testing

For HTML and CSS I have tested for 4 categories:

#### Syntax:
All syntax is correct as verified by VSCode’s inbuilt syntax highlighter (no warnings)

#### Project:

CSS and HTML standards have been met. The site is designed to be legible beyond the developer (me), the semantic elements help navigate the HTML code and the CSS is ordered in line with the HTML elements and content also. The CSS file adopts the mobile first design principle with media queries set for screen widths greater than 900px (though there are issues with the charts’ CSS on mobile as mentioned below)

#### Reference:

Both the HTML and CSS for this project do not meet the standards I have set for this dashboard as I struggled to make the site fully responsive:

- The charts will resize for various screen widths but only on reloading the page
- The charts appear cramped on smaller screens

On a desktop the site appears as designed but issues on mobile (and with responsiveness) do not meet the design standards set for this project

#### Regression:

When interacting with the site there are certain actions that cause the layout to change. For instance, the nav bar disappears/reappears onScroll, there are internal links to sections within the page, and clicking on certain charts in the dashboard cause other charts to restructure data and axes. All of these actions are reversible by the user and to do so is either intuitive or clearly communicated (e.g. ‘Reset Filters’ button on NavBar).

Lastly there is user testing; the usual job of asking our friends and peers to weigh in on how the project performs and any issues with the UX/UI. Luckily, due to the simple nature of this project, there is very little to break, although, due to criticism, verbose analysis of the meaning of the data shown in various charts has been removed as it was deemed unnecessary (Analysis would be more relevant with a larger, and more current dataset).

## Deployment

This site is deployed using GitHub pages.

There are no differences between the development and the deployed versions of this site and they rest on the same Git branch therefore running this file locally requires no instructions

## Credits

### Data

#### FreeCodeCamp.org

The FCC deserve credit for the dataset used in this dashboard as well as the community of people who responded, making the dataset possible. If you would like to know more about the FCC you can visit their site at https://www.freecodecamp.org/

### Icons

#### Font Awesome

fontawesome provided various icons (e.g. burger icon in the navbar).
Their site: https://fontawesome.com/

### Fonts

#### Google Fonts

I used Montserrat as the font for this project.
Their site: https://fonts.google.com/
