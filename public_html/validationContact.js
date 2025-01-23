function validateForm() {
    // Clear previous error messages and success messages
    clearMessages();

    let isValid = true;

    // Name validation: not empty and max 100 characters
    const name = document.getElementById('name').value;
    if (name.trim() === '' || name.length > 100) {
        showError('nameError', 'Name is required and cannot be more than 100 characters.');
        setInvalid('name');
        isValid = false;
    } else {
        showSuccess('nameError', 'Name is valid!');
        setValid('name');
    }

    // ID validation: must be 10 digits
    const id = document.getElementById('id').value;
    const idRegex = /^\d{10}$/;
    if (!idRegex.test(id)) {
        showError('idError', 'Number must be exactly 10 digits.');
        setInvalid('id');
        isValid = false;
    } else {
        showSuccess('idError', 'Number is valid!');
        setValid('id');
    }

    // Email validation: must contain '@' and follow general email format
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Email must be a valid email address.');
        setInvalid('email');
        isValid = false;
    } else {
        showSuccess('emailError', 'Email is valid!');
        setValid('email');
    }

    // Message validation: must not be empty and must contain '@'
    const message = document.getElementById('message').value;
    if (message.trim() === '' || !message.includes('@')) {
        showError('messageError', 'Message is required and must contain the "@" character.');
        setInvalid('message');
        isValid = false;
    } else {
        showSuccess('messageError', 'Message is valid!');
        setValid('message');
    }

    return isValid;
}

// Function to show error messages
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerText = message;
    element.classList.remove('text-success');
    element.classList.add('text-danger');
}

// Function to show success messages
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerText = message;
    element.classList.remove('text-danger');
    element.classList.add('text-success');
}

// Function to mark the input field as invalid (red border)
function setInvalid(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.remove('is-valid');
    inputElement.classList.add('is-invalid');
}

// Function to mark the input field as valid (green border)
function setValid(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
}

// Function to clear all messages and classes
function clearMessages() {
    const errors = document.querySelectorAll('.form-text');
    errors.forEach(error => error.innerText = '');
    
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

// Reset form function (optional)
function resetForm() {
    clearMessages();
}
