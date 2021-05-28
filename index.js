import {VAC_SITES} from './data/vac_sites.js';

const USER_PCODE = document.querySelector('#user_postcode');
const POSTCODE_BTN = document.querySelector('#postcode_btn');
const NEAREST_CENTRE_DIV = document.querySelector('#nearest_centre_div');
const LINK_DIV = document.querySelector('#link-div')

let user_lat
let user_long
let site_lat
let site_long
let closest_site
let closest_site_key

function getHypot(user_lat, user_long, site_lat, site_long){
    let lat_dist = user_lat - site_lat;
    let long_dist = user_long - site_long;
    return Math.sqrt(lat_dist**2 + long_dist**2)
}

function findCentre(e){
    e.preventDefault();
    NEAREST_CENTRE_DIV.innerHTML = 'Finding your nearest vaccine centre. Please wait...'
    import('/data/postcode.js')
        .then((POSTCODES) => {
            POSTCODES = POSTCODES.POSTCODES
            let user_postcode = USER_PCODE.value;
            // console.log(user_postcode)
            for(let postcode of POSTCODES){
                if(postcode[0] == user_postcode){
                    user_long = postcode[1];
                    user_lat = postcode[2];
                }
            }
            let smallest_distance = getHypot(user_lat, user_long, 1000, 1000);
                // console.log(smallest_distance)
            for(let [key, value] of Object.entries(VAC_SITES)){
                site_lat = value[4]
                site_long = value[3]
                let site_distance = getHypot(user_lat, user_long, site_lat, site_long)
                if(site_distance < smallest_distance){
                    smallest_distance = site_distance;
                    closest_site = VAC_SITES[key]
                    closest_site_key = key
                }
            };
            let stite_name_for_URL = closest_site[0].replace(/\s/g, '+');
            let site_postcode_for_URL = closest_site_key.replace(/\s/g, '');
            NEAREST_CENTRE_DIV.innerHTML = `<h3>${closest_site[0]}</h3><p>${closest_site[1]}</p>`;
            LINK_DIV.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${stite_name_for_URL}+${site_postcode_for_URL}">Click for map</a>`
        })
};

POSTCODE_BTN.addEventListener('click', findCentre);
