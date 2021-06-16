# **NearestVaccineCentre**

## Finds your nearest Covid-19 vaccine centre 

### [Open App](https://ed100miles.github.io/NearestVaccineCentre/) 

---

## What does it do?
The user enters their postcode, and their nearest covid-19 vaccine centre is displayed along with a link to google maps showing the location. 

---

## How does it work?
Only vanilla JavaScript, HTML and CSS are used (and a bit of python for initial data wrangling / prototyping). 

Two datasets were used for this project:
1. The list of Covid-19 vaccination sites available on the NHS England website (correct as of 21 May 2021).
2. A list of 1.7m postcodes in the UK and their approximate longitudes and latitudes.

Longs and Lats were then added to the list of vaccine sites. The vaccination sites data is imported when the site loads and the postcode + long/lat data is loaded dynamically when the user enters their postcode. 

After the user enters their postcode, a function is called to reformat the postcode if it's entered with any errors (incorrect spacing or lower case letters). The users longitude and latitude is then retrieved from the dataset. Then the program iterates through all the vaccination sites, calculating the hypotenuse of the difference between the users and each vaccine centre's longitude and latitude. The vaccine centre with the shortest hypotenuse from the users location is then returned along with a link to google maps formatted query the google maps API with the vaccine site name and it's postcode. 
