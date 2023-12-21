/**
 * Functions
 */

function sortMedias(sorting, medias) {
    switch (sorting) {
        case 'popularity':
            // Sort medias from the most liked to the less one
            medias.sort((a, b) => b.likes - a.likes);
            break;

        case 'date':
            // Sort medias from the newest to the oldest
            medias.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;

        case 'title':
            // Sort media in the alphabetical order
            medias.sort((a, b) => a.title.localeCompare(b.title));
            break;
    
        default:
            break;
    }

    // Removing actual content to replace it with the sorted one
    document.getElementById('medias').innerHTML = '';
    displayMedias(medias);

    // Recreating the lightbox content to make the indexs match
    createLightbox(medias);
}

// Remove style from the dropdown list when an element isn't focused anymore + prevent scroll
function lostFocus(event) {
    // Prevent the scroll when using arrows
    event.preventDefault();

    options.forEach(option => {
        option.classList.remove('focus');
    });
}




/**
 * Code
 */

// Toggle the dropdown display when click
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('click', function() {
    dropdown.classList.toggle('active');
});

// Sort medias with the selected value. Handle click and keyboard nav
let options = Array.from(document.getElementsByClassName('option'));
options.forEach(option => {
    option.addEventListener('click', () => {
        sortMedias(option.getAttribute('data-sorting'), medias);
        document.getElementById('textBox').value = option.textContent;
    });

    option.addEventListener('keydown', e => {
        if(e.code == 'Enter') {
            sortMedias(option.getAttribute('data-sorting'), medias);
            document.getElementById('textBox').value = option.textContent;
        }
    });
});

// Keyboard navigation
let sortingIndex = 0;
dropdown.addEventListener('keydown', e => {
    switch(e.code) {
        case 'Enter':
            lostFocus(e);
            dropdown.classList.toggle('active');

            sortingIndex = 0;
            options[sortingIndex].focus();
            options[sortingIndex].classList.add('focus');
            break;
        case 'ArrowDown':
            lostFocus(e);
            if(!dropdown.classList.contains('active')) {
                dropdown.classList.add('active');
                sortingIndex = 0;
            } else {
                // Setting index
                sortingIndex = (sortingIndex + 1) % options.length;
            }
            options[sortingIndex].focus();
            options[sortingIndex].classList.add('focus');
            break;

        case 'ArrowUp':
            lostFocus(e);
            // Setting index
            sortingIndex = ((sortingIndex || options.length) - 1) % options.length;
            // sortingIndex = ((sortingIndex - 1) + options.length) % options.length;

            options[sortingIndex].focus();
            options[sortingIndex].classList.add('focus');
            break;

        case 'Escape':
            lostFocus(e);
                dropdown.classList.remove('active')
            break;

        default:
            break;
    }
});


