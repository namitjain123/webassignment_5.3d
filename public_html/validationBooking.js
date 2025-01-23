// bookingValidation.js

// Validate the booking form
function validateBookingForm(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const carModel = document.getElementById('carModel');
    const pickupLocation = document.getElementById('pickupLocation');
    const dropoffLocation = document.getElementById('dropoffLocation');
    const pickupDate = document.getElementById('pickupDate');
    const dropoffDate = document.getElementById('dropoffDate');
  
    let isValid = true;
  
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
  
    // Validate car model selection
    if (!carModel.value) {
      isValid = false;
      displayError(carModel, 'Please select a car model.');
    }
  
    // Validate pick-up location
    if (!pickupLocation.value.trim()) {
      isValid = false;
      displayError(pickupLocation, 'Please enter a pick-up location.');
    }
  
    // Validate drop-off location
    if (!dropoffLocation.value.trim()) {
      isValid = false;
      displayError(dropoffLocation, 'Please enter a drop-off location.');
    }
  
    // Validate pick-up date
    if (!pickupDate.value) {
      isValid = false;
      displayError(pickupDate, 'Please select a pick-up date.');
    }
  
    // Validate drop-off date
    if (!dropoffDate.value) {
      isValid = false;
      displayError(dropoffDate, 'Please select a drop-off date.');
    }
  
    // Check if drop-off date is after pick-up date
    if (pickupDate.value && dropoffDate.value && new Date(pickupDate.value) >= new Date(dropoffDate.value)) {
      isValid = false;
      displayError(dropoffDate, 'Drop-off date must be after pick-up date.');
    }
  
    // Display success message if the form is valid
    if (isValid) {
      alert('Booking successful!');
    }
  }
  
  // Display error messages
  function displayError(inputElement, message) {
    const errorMessage = document.createElement('small');
    errorMessage.className = 'error-message text-danger';
    errorMessage.textContent = message;
    inputElement.parentNode.appendChild(errorMessage);
  }
  
  // Suggest drop-off location based on pick-up location
  function suggestDropoffLocation() {
    const pickupLocation = document.getElementById('pickupLocation');
    const dropoffLocation = document.getElementById('dropoffLocation');
  
    // Update the drop-off location with the full value of the pick-up location
    if (pickupLocation.value.trim() && !dropoffLocation.value.trim()) {
      dropoffLocation.value = pickupLocation.value;
    }
  }
  
  
  // Check availability of selected car model
  function checkCarAvailability() {
    const carModel = document.getElementById('carModel');
    const pickupDate = document.getElementById('pickupDate');
    const dropoffDate = document.getElementById('dropoffDate');
    const availabilityMessage = document.getElementById('availabilityMessage');
  
    if (carModel.value && pickupDate.value && dropoffDate.value) {
      // Simulate an unavailable car model for specific dates
      if (carModel.value === 'car1' && new Date(pickupDate.value).getDay() === 5) {
        availabilityMessage.textContent = 'Car Model 1 is unavailable on Fridays.';
        availabilityMessage.classList.add('text-danger');
      } else {
        availabilityMessage.textContent = 'Selected car is available!';
        availabilityMessage.classList.remove('text-danger');
        availabilityMessage.classList.add('text-success');
      }
    } else {
      availabilityMessage.textContent = '';
    }
  }
  
  // Update character count for location fields
  function updateCharCount(event) {
    const charCountElement = document.getElementById(`${event.target.id}CharCount`);
    charCountElement.textContent = `${event.target.value.length} characters`;
  }
  
  // Event listeners
  document.querySelector('form').addEventListener('submit', validateBookingForm);
  document.getElementById('pickupLocation').addEventListener('input', suggestDropoffLocation);
  document.getElementById('carModel').addEventListener('change', checkCarAvailability);
  document.getElementById('pickupDate').addEventListener('change', checkCarAvailability);
  document.getElementById('dropoffDate').addEventListener('change', checkCarAvailability);
  document.getElementById('pickupLocation').addEventListener('input', updateCharCount);
  document.getElementById('dropoffLocation').addEventListener('input', updateCharCount);
  