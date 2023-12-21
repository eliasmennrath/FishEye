function init() {
    const url = 'data/photographers.json';
    fetch(url)
    .then(response => {
        return response.json();
    }).then(data => {
        const photographersSection = document.querySelector(".photographer_section");
        const { photographers } = data;
        // Display photographers on home page
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    })
}





init();