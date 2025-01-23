// Array of customer reviews
const reviews = [
  {
    name: "John Doe",
    text: "Fantastic experience! The booking process was simple and the car was in perfect condition. Will book again!",
    rating: 5
  },
  {
    name: "Jane Smith",
    text: "I loved the convenience of picking up the car and the amazing customer service. Highly recommend!",
    rating: 5
  },
  {
    name: "Mark Johnson",
    text: "Affordable pricing and excellent selection. The car was exactly as described. Great job, Car Booker!",
    rating: 4
  }
];

// Function to render customer reviews dynamically
function renderCustomerReviews() {
  const reviewsContainer = document.getElementById('customer-reviews');
  reviewsContainer.innerHTML = ''; // Clear existing reviews

  reviews.forEach((review) => {
    const reviewCard = `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="card-text">"${review.text}"</p>
            <h5 class="card-title">${review.name}</h5>
            <p class="card-text"><small class="text-muted">${review.rating} Stars</small></p>
          </div>
        </div>
      </div>
    `;
    reviewsContainer.innerHTML += reviewCard;
  });
}

// Call the function to render reviews once the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderCustomerReviews();
});
