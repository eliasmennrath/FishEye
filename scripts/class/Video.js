"use strict";

class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    build() {
        const figure = document.createElement('figure');
        figure.classList.add('media');
        figure.setAttribute('id', this.id);
        figure.setAttribute('tabindex', 0);
        // figure.setAttribute('aria-label', this.video);


        const video = document.createElement('video');
        video.classList.add('media-content');

        const source = document.createElement('source');
        source.setAttribute('src', 'assets/video/'+this.video);

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

        const icon = document.createElement('span');
        icon.classList.add('fa-solid', 'fa-heart', 'likes-heart');
        icon.addEventListener('click', () => {
            this.checkLike();
            number.innerText = this.likes;
        });


        likes.appendChild(number);
        likes.appendChild(icon);

        caption.appendChild(title);
        caption.appendChild(likes);

        video.appendChild(source);

        figure.appendChild(video);
        figure.appendChild(caption);

        figure.addEventListener('click', () => {
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

        const video = document.createElement('video');
        video.classList.add('media-content');
        video.setAttribute('controls', '');

        const source = document.createElement('source');
        source.setAttribute('src', 'assets/video/'+this.video);

        const caption = document.createElement('figcaption');
        caption.classList.add('lightbox-caption');
        caption.innerText = this.title;


        video.appendChild(source);

        figure.appendChild(video);
        figure.appendChild(caption);

        return figure;
    }
}