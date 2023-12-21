class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    build() {
        const article = document.createElement('article');
        article.classList.add('media');
        article.setAttribute('id', this.id);
        article.setAttribute('tabindex', 0);
        article.setAttribute('aria-label', this.video);


        const video = document.createElement('video');
        video.classList.add('media-content');

        const source = document.createElement('source');
        source.setAttribute('src', 'assets/video/'+this.video);

        const details = document.createElement('div');
        details.classList.add('media-details');

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

        details.appendChild(title);
        details.appendChild(likes);

        video.appendChild(source);

        article.appendChild(video);
        article.appendChild(details);

        article.addEventListener('click', () => {
            openLightbox(this.id);
        });
        article.addEventListener('keydown', e => {
            if(e.code == 'Enter') {
                openLightbox(this.id);
            }
        });

        return article;
    }

    buildLightbox() {
        const article = document.createElement('article');
        article.classList.add('lightbox-media');
        article.setAttribute('id', `lightbox-${this.id}`);

        const video = document.createElement('video');
        video.classList.add('media-content');

        const source = document.createElement('source');
        source.setAttribute('src', 'assets/video/'+this.video);

        const title = document.createElement('h2');
        title.classList.add('litghtbox-caption');
        title.innerText = this.title;


        video.appendChild(source);

        article.appendChild(video);
        article.appendChild(title);

        return article;
    }
}