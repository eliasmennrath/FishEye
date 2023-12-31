"use strict";

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
            'Lastname => ' + document.getElementsByName('lastname')[0].value + '\n',
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