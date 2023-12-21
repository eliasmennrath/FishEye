class Media {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.isLiked = false;
    }

    checkLike() {
        const totalLikes = document.getElementById('totalLikes');
        if(this.isLiked) {
            this.likes--;
            totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
        } else {
            this.likes++;
            totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
        }
        this.isLiked = !this.isLiked;
    }
}