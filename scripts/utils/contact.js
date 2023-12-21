/**
 * Functions
 */

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.getElementById('contact_button').focus();
}

// Functions to check the form validity
function checkFirst() {
    let first = document.getElementsByName('firstname')[0];

    // Check the validation rule
    if (first.value.length < 2) {
        first.classList.add('invalid');
        // Return false to prevent the validation to be print
        return false;
    }

    removeError(first.getAttribute('id'));
    // Return true to allow the validation to be print
    return true;
}

function checkLast() {
    let last = document.getElementsByName('lastname')[0];

    if (last.value.length < 2) {
        last.classList.add('invalid');
        return false;
    }

    removeError(last.getAttribute('id'));
    return true;
}

function checkEmail() {
    let email = document.getElementsByName('email')[0];

    // Regex to verify an email validity
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Check if the entered value match the regex
    if(email.value.match(regex)) {
        removeError(email.getAttribute('id'));
        return true;
    }

    email.classList.add('invalid');
    return false;
}

function checkMsg() {
    let msg = document.getElementsByName('message')[0];

    if(msg.value == "") {
        msg.classList.add('invalid');
        return false;
    } 

    removeError(msg.getAttribute('id'));
    return true;
}

// Function to remove an error message
// Need the id of an input to check if it has the 'invalid' class
function removeError(id) {
    let input = document.getElementById(id);
    input.classList.remove('invalid');
}



// Give the focus to the elements inside the contact modal
function trapFocus (element, prevFocusableElement = document.activeElement) {
  const focusableEls = Array.from(
    element.querySelectorAll(
      'button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled])'
    )
  );

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let currentFocus = null;

  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  const handleFocus = e => {
    e.preventDefault();
    // if the focused element "lives" in your modal container then just focus it
    if (focusableEls.includes(e.target)) {
      currentFocus = e.target;
    } else {
      // you're out of the container
      // if previously the focused element was the first element then focus the last 
      // element - means you were using the shift key
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus();
      } else {
        // you previously were focused on the last element so just focus the first one
        firstFocusableEl.focus();
      }
      // update the current focus var
      currentFocus = document.activeElement;
    }
  };

  document.addEventListener("focus", handleFocus, true);

  return {
    onClose: () => {
      document.removeEventListener("focus", handleFocus, true);
      prevFocusableElement.focus();
    }
  };
}





/**
 * Code
 */
const displayContact = document.getElementById('contact_button');
const contactModal = document.getElementById('contact_modal');
displayContact.addEventListener('click', () => {
    contactModal.style.display = 'block';
    trapFocus(contactModal);
});

const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.addEventListener('click', () => {
  closeModal();
});


let form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
    // Cancel submit
    e.preventDefault();

    // Call to every functions to check inputs
    let isValid = checkFirst() && checkLast() && checkEmail() && checkMsg();

    // If isValid is true (if all inputs are valid)
    if(isValid) {
        // Print validation
        console.log(
            'Firstname => ' + document.getElementsByName('firstname')[0].value + '\n',
            'Lastname => ' + document.getElementsByName('firstname')[0].value + '\n',
            'Email => ' + document.getElementsByName('email')[0].value + '\n',
            'Message => ' + document.getElementsByName('message')[0].value
        );
    }
});

contactModal.addEventListener('keydown', e => {
    switch (e.code) {
        case 'Escape':
            closeModal();
            break;

        default:
            break;
    }
});