import { VAC_SITES } from './data/vac_sites.js';

const USER_PCODE = document.querySelector('#user_postcode');
const POSTCODE_BTN = document.querySelector('#postcode_btn');
const NEAREST_CENTRE_DIV = document.querySelector('#nearest_centre_div');
const LINK_DIV = document.querySelector('#link-div')
const INFO_DIV = document.querySelector('#info-div')

let user_lat
let user_long
let site_lat
let site_long
let closest_site
let closest_site_key

function getHypot(user_lat, user_long, site_lat, site_long) {
    let lat_dist = user_lat - site_lat;
    let long_dist = user_long - site_long;
    return Math.sqrt(lat_dist ** 2 + long_dist ** 2)
}

function format_postcode(postcode) {
    postcode = postcode.toUpperCase().replace(/\s+/g, '')
    let parts = postcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/)
    if (parts === null) {
        return 'bad postcode'
    }
    parts.shift()
    return parts.join(' ')
}

function findCentre(e) {
    e.preventDefault();
    INFO_DIV.style.display = 'block';
    let user_postcode = USER_PCODE.value;
    user_postcode = format_postcode(user_postcode)
    if (user_postcode === 'bad postcode') {
        LINK_DIV.style.display = 'none'
        NEAREST_CENTRE_DIV.classList.remove('fade-in')
        NEAREST_CENTRE_DIV.innerHTML = 'Sorry, can\'t find that postcode...<br> Please try again.';
        NEAREST_CENTRE_DIV.style.color = 'red'
        return false;
    }
    NEAREST_CENTRE_DIV.innerHTML = 'Finding your nearest vaccine centre. Please wait...'
    NEAREST_CENTRE_DIV.classList.add('fade-in')
    import('./data/postcodeJSON.js')
        .then((POSTCODES) => {
            POSTCODES = POSTCODES.postcodes
            if (!POSTCODES.hasOwnProperty(user_postcode)) {
                NEAREST_CENTRE_DIV.classList.remove('fade-in')
                NEAREST_CENTRE_DIV.innerHTML = 'Sorry, can\'t find that postcode...<br> Please try again.';
                NEAREST_CENTRE_DIV.style.color = 'red'
                return false;
            }
            user_long = POSTCODES[user_postcode][0]
            user_lat = POSTCODES[user_postcode][1]
            let smallest_distance = getHypot(user_lat, user_long, 1000, 1000);
            for (let [key, value] of Object.entries(VAC_SITES)) {
                site_lat = value[4]
                site_long = value[3]
                let site_distance = getHypot(user_lat, user_long, site_lat, site_long)
                if (site_distance < smallest_distance) {
                    smallest_distance = site_distance;
                    closest_site = VAC_SITES[key]
                    closest_site_key = key
                }
            };
            let stite_name_for_URL = closest_site[0].replace(/\s/g, '+');
            let site_postcode_for_URL = closest_site_key.replace(/\s/g, '');
            NEAREST_CENTRE_DIV.classList.remove('fade-in')
            NEAREST_CENTRE_DIV.innerHTML = `<p style='color:black'>Your nearest vaccination centre is:</p><h3>${closest_site[0]}</h3><p>${closest_site[1]}</p>`;
            NEAREST_CENTRE_DIV.style.color = 'green'
            LINK_DIV.style.display = 'block'
            LINK_DIV.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${stite_name_for_URL}+${site_postcode_for_URL}" target="_blank">Click for map</a>`
        })
};

POSTCODE_BTN.addEventListener('click', findCentre);
