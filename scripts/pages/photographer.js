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
    let { name, city, tagline, portrait } = photographer;

    const title = document.getElementById('name');
    const pLocation = document.getElementById('location');
    const pTagline = document.getElementById('tagline');
    const img = document.getElementById('profilePicture');

    title.innerText = name;
    pLocation.innerText = city;
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
    totalLikes = 0;
    medias.forEach(media => {
        totalLikes = totalLikes + media.likes;
    })

    return totalLikes;
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




