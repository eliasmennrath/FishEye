// Build photographer's card in home page
function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement('a');
        a.setAttribute('href', 'photographer.html?id='+id);

        const pCity = document.createElement('p');
        pCity.classList.add('location');
        pCity.innerText = city + ', ' + country;

        const pTagLine = document.createElement('p');
        pTagLine.classList.add('tagline');
        pTagLine.innerText = tagline;

        const pPrice = document.createElement('p');
        pPrice.classList.add('price');
        pPrice.innerText = price + '€/jour';

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('alt', 'Une photo de profil de ' + name);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;


        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(pCity);
        article.appendChild(pTagLine);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}