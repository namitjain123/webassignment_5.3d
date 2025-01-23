// Dynamic Greeting Based on Time
document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('dynamicGreeting');
    const currentHour = new Date().getHours();
    let message = "Welcome to Car Booker!";
  
    if (currentHour >= 0 && currentHour < 12) {
      message = "Good Morning! Start your day with a luxurious ride.";
    } else if (currentHour >= 12 && currentHour < 18) {
      message = "Good Afternoon! Ready for your next adventure?";
    } else if (currentHour >= 18 && currentHour < 24) {
      message = "Good Evening! End your day with a comfortable drive.";
    }
  
    greeting.textContent = message;
  });
  
  // Scroll to Top Button
  const scrollToTopButton = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Alert on "Book Now"
  document.querySelectorAll('.btn-primary').forEach((button) => {
    button.addEventListener('click', (e) => {
      alert('Thank you for choosing Car Booker! Redirecting to booking page...');
    });
  });
  
  