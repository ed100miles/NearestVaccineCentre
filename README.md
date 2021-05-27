# NearestVaccineCentre

### Finds your nearest Covid-19 vaccine centre (England Only - sorry)

If you look online, the only way to find your closest vaccine centre is to look at a very old-school OS map drawn up by the Ministry of Defence. Or you can scroll through the list of ~2000 vaccine centres until you find one close to you. This isn't very convenient. 
---

## Enter Python! (and an exciting evening of scripting)

Two datasets were used for this project. 

1. The list of Covid-19 vaccination sites available on the NHS England website. (correct as of 21 May 2021)
2. A list of 1.7m postcodes in the UK and their approximate longitudes and latitudes.

Longs and Lats were then added to the list of vaccine sites. 
---

## Usage

The user enters their postcode, and their nearest vaccine centre is printed to console - simple! I plan on adding an MVP front end soon. 
---

## How it works

Also simple, it takes users postcode, looks it up in the list of postcodes and gets user long+lat. Then compares this to long+lats of each vaccine site. Shortest hypotenuse between the two co-odinatest is the closest. 