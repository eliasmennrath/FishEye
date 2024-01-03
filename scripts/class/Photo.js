"use strict";

class Photo extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    build() {
        const figure = document.createElement('figure');
        figure.classList.add('media');
        figure.setAttribute('id', this.id);
        figure.setAttribute('tabindex', 0);
        // figure.setAttribute('aria-label', this.image);

        const img = document.createElement('img');
        img.setAttribute('src', 'assets/images/'+this.image);
        img.setAttribute('alt', this.title);
        img.classList.add('media-content');

        const caption = document.createElement('figcaption');
        caption.classList.add('media-caption');

        const title = document.createElement('h2');
        title.classList.add('media-title');
        title.innerText = this.title;

        const likes = document.createElement('div');
        likes.classList.add('media-likes');

        const number = document.createElement('span');
        number.classList.add('likes-number');
        number.innerText = this.likes;
        number.setAttribute('aria-label', `${this.likes} j'aime sur cette photo`)

        const icon = document.createElement('span');
        icon.classList.add('fa-solid', 'fa-heart', 'likes-heart');
        icon.addEventListener('click', e => {
            e.preventDefault();
            this.checkLike();
            number.innerText = this.likes;
        });


        likes.appendChild(number);
        likes.appendChild(icon);

        caption.appendChild(title);
        caption.appendChild(likes);

        figure.appendChild(img);
        figure.appendChild(caption);

        figure.addEventListener('click', e => {
            let pointer = document.elementFromPoint(e.clientX, e.clientY);
                if(pointer.classList.contains('likes-heart')) {
                    return false;
                }
                openLightbox(this.id);

        });
        figure.addEventListener('keydown', e => {
            if(e.code == 'Enter') {
                openLightbox(this.id);
            }
        });

        return figure;
    }

    buildLightbox() {
        const figure = document.createElement('figure');
        figure.classList.add('lightbox-media');
        figure.setAttribute('id', `lightbox-${this.id}`);

        const img = document.createElement('img');
        img.setAttribute('src', 'assets/images/'+this.image);
        img.setAttribute('alt', this.title);

        const caption = document.createElement('figcaption');
        caption.classList.add('lightbox-caption');
        caption.innerText = this.title;


        figure.appendChild(img);
        figure.appendChild(caption);

        return figure;
    }
}