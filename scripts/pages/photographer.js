"use strict";

/**
 * Functions
 */

// Get photographer's id
function getId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    return id;
}

// Get photographer's information
function getPhotographer(photographers, id) {
    let photographer;

    photographers.forEach(artist => {
        if(artist.id == id) {
            photographer = artist;
        }
    });

    return photographer;
}

// Get photographer's medias
function getMedia(medias, photographer) {
    let photographerMedias = [];
    medias.forEach(media => {
        if(media.photographerId == photographer) {
            photographerMedias.push(media);
        }
    });

    return photographerMedias;
}

// Display photographer's information
function displayData(photographer) {
    let { name, city, country, tagline, portrait } = photographer;

    const title = document.getElementById('name');
    const pLocation = document.getElementById('location');
    const pTagline = document.getElementById('tagline');
    const img = document.getElementById('profilePicture');

    title.innerText = name;
    pLocation.innerText = city + ', ' + country;
    pTagline.innerText = tagline;
    img.setAttribute('src', 'assets/photographers/' + portrait);
    img.setAttribute('alt', 'Une photo de profil de ' + name);
}

// Display photographer's medias
function displayMedias(medias) {
    const mediaSection = document.getElementById('medias');
    medias.forEach(item => {
        const media = new MediaFactory(item);
        mediaSection.appendChild(media.build());
    }); 
}

// Get the total likes
function getLikes(medias) {
    let totalLikes = 0;
    medias.forEach(media => {
        totalLikes = totalLikes + media.likes;
    });

    return totalLikes;
}


// Give the focus to the elements inside a modal
function trapFocus (element, prevFocusableElement = document.activeElement) {
    const focusableEls = Array.from(
        element.querySelectorAll(
            'button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled])'
        )
    );

    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;

    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;

    const handleFocus = e => {
        e.preventDefault();
        // if the focused element "lives" in your modal container then just focus it
        if (focusableEls.includes(e.target)) {
            currentFocus = e.target;
        } else {
            // you're out of the container
            // if previously the focused element was the first element then focus the last 
            // element - means you were using the shift key
            if (currentFocus === firstFocusableEl) {
                lastFocusableEl.focus();
            } else {
                // you previously were focused on the last element so just focus the first one
                firstFocusableEl.focus();
            }
            // update the current focus var
            currentFocus = document.activeElement;
        }
    };

    document.addEventListener("focus", handleFocus, true);

    return {
        onClose: () => {
            document.removeEventListener("focus", handleFocus, true);
            prevFocusableElement.focus();
        }
    };
}







/**
 * Code
 */
let medias = [];
let index;

const url = 'data/photographers.json';
fetch(url)
.then(response => {
    return response.json();
})
.then(data => {
    const {photographers, media} = data;
    const id = getId();
    const photographer = getPhotographer(photographers, id);

    medias = getMedia(media, id);
    displayData(photographer);
    displayMedias(medias);
    createLightbox(medias);


    // Display the statistics. Total likes + Price
    let totalLikes = document.getElementById('totalLikes');
    totalLikes.innerText = getLikes(medias);
    totalLikes.setAttribute('aria-label', `${getLikes(medias)} j'aimes au total`)

    let price = document.getElementById('price');
    price.innerText = photographer.price + '€ / jour';
    price.setAttribute('aria-label', `Tarif journalier : ${photographer.price}€`);

    // Set photographer's name in contact modal
    document.getElementById('contactName').innerText = photographer.name;
});




