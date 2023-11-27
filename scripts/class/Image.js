class Image extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    build() {
        const article = document.createElement('article');
        article.classList.add('media');
        article.setAttribute('id', this.id);

        const img = document.createElement('img');
        img.setAttribute('src', 'assets/medias/'+this.image);

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

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-heart', 'likes-heart');
        icon.addEventListener('click', e => {
            this.checkLike();
            number.innerText = this.likes;
        });


        likes.appendChild(number);
        likes.appendChild(icon);

        details.appendChild(title);
        details.appendChild(likes);

        article.appendChild(img);
        article.appendChild(details);

        article.addEventListener('click', e => {
            console.log('Display LightboxImg');
        })

        return article;
    }
}

// Changer pour createElement
// Add eventListener dans build