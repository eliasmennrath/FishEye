class Image extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }

    build() {
        // const article = document.createElement('article');
        // const img = document.createElement('img');
        // img.setAttribute('src', 'assets/medias/'+this.image);

        // article.appendChild(img);

        let article = `<article class="media">
            <img src="assets/medias/${this.image}" alt="">
            <div class="media-details">
                <h2 class="media-title">${this.title}</h2>
                <div class="media-likes">
                    <span class="likes-number">${this.likes}</span>
                    <i class="fa-solid fa-heart likes-heart"></i>
                </div>
            </div>
        </article>`;

        return article;
    }
}