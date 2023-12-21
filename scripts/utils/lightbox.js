/**
 * Functions
 */

// Create HTML for the lightbox
function createLightbox(medias) {
    const lightbox = document.getElementById('media');
    lightbox.innerHTML = '';

    medias.forEach(item => {
        const media = new MediaFactory(item);
        lightbox.appendChild(media.buildLightbox());
    });
}

// Display the lightbox
function openLightbox(id) {
    document.getElementById('lightbox').style.display = 'flex';

    // Set the visible image at the oppening
    let htmlMedias = Array.from(document.getElementsByClassName('lightbox-media'));
    medias.forEach((media, i) => {
        if(media.id === id) {
            index = i;
            htmlMedias[i].classList.add('active');
        } else {
            htmlMedias[i].classList.remove('active')
        }
    });
}

// Go to the next image ine the lightbox
function lightboxNext() {
    index = (index + 1) % medias.length;

    let htmlMedias = Array.from(document.getElementsByClassName('lightbox-media'));
    htmlMedias.forEach((media, i) => {
        if(i === index) {
            htmlMedias[i].classList.add('active');
        } else {
            htmlMedias[i].classList.remove('active')
        }
    });
}

// Go to the previous image ine the lightbox
function lightboxPrevious() {
    index = ((index || medias.length) - 1) % medias.length;

    let htmlMedias = Array.from(document.getElementsByClassName('lightbox-media'));
    htmlMedias.forEach((media, i) => {
        if(i === index) {
            htmlMedias[i].classList.add('active');
        } else {
            htmlMedias[i].classList.remove('active')
        }
    });
}

// Close the lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}





/**
 * Code
 */

// Change lightbox content to the next media
let next = document.getElementById('next-media');
next.addEventListener('click', () => {
    lightboxNext();
});

// Change lightbox content to the previous media
let previous = document.getElementById('previous-media');
previous.addEventListener('click', () => {
    lightboxPrevious();
});

// Close the lightbox
let lightboxClose = document.getElementById('lightbox-close');
lightboxClose.addEventListener('click', () => {
    closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', e => {
        switch (e.code) {
            case 'Escape':
                closeLightbox();
                break;
            
            case 'ArrowLeft':
                lightboxPrevious();
                break;

            case 'ArrowRight':
                lightboxNext();
                break;

            default:
                break;
        }
});







