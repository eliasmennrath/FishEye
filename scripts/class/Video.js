class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }

    build() {


        let article = `<article class="media">
            <video controls>
                <source src="assets/medias/${this.video}" type="video/mp4">
            </video>
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