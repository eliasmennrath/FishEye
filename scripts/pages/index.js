    function getPhotographers() {
        const url = 'data/photographers.json';

        // const response = await fetch(url);
        // if(response.status === 200) {
        //     const photographers = await response.json();
            
        //     return photographers;
        // }

        fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            const photographersSection = document.querySelector(".photographer_section");
            const { photographers } = data;
            photographers.forEach((photographer) => {
                const photographerModel = photographerTemplate(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        })
    }

    getPhotographers();

    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerTemplate(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // }

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();

    //     displayData(photographers);
    // }
    
    // init();
