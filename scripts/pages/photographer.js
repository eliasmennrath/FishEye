// Code to the photographer page

/**
 * Functions
 */

function getId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    return id;
}

function getPhotographer(photographers, id) {
    let photographer;

    photographers.forEach(artist => {
        if(artist.id == id) {
            photographer = artist;
        }
    });

    return photographer;
}

function getMedia(medias, photographer) {
    let photographerMedias = [];
    medias.forEach(media => {
        if(media.photographerId == photographer) {
            photographerMedias.push(media);
        }
    });

    return photographerMedias;
}

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

function displayMedias(medias) {
    const mediaSection = document.getElementById('medias');
    medias.forEach(item => {
        const media = new MediaFactory(item);
        mediaSection.appendChild(media.build());
    }); 
}

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

const url = 'data/photographers.json';

fetch(url)
.then(response => {
    return response.json();
})
.then(data => {
    const {photographers, media} = data;

    // const id = getId();
    // const photographer = getPhotographer(photographers, id);
    // const medias = getMedia(media, id);
    // displayData(photographer);
    // displayMedias(medias);
    
    const id = getId();
    const photographer = getPhotographer(photographers, id);
    const medias = getMedia(media, id);
    displayData(photographer);
    displayMedias(medias);

    console.log(photographer);
    document.getElementById('totalLikes').innerText = getLikes(medias);
    document.getElementById('price').innerText = photographer.price + '€ / jour';

    document.getElementById('contactName').innerText = photographer.name;

    let test = Array.from(document.getElementsByClassName('media'));
    test.forEach(item => {
        item.addEventListener('click', function() {
            console.log(this.id);
        });
    })
});

const displayContact = document.getElementById('contact_button');
const contactModal = document.getElementById('contact_modal');
displayContact.addEventListener('click', e => {
    contactModal.style.display = block;
})

