document.addEventListener("DOMContentLoaded", function() {
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
    const testimonials = [
        {
            name: "Sarah & John",
            text: '"Car Booker made our wedding day even more special. The car was pristine, and the service was impeccable. Highly recommend!"',
            image: "images/toyota.png"
        },
        {
            name: "Michael T.",
            text: '"I rented an SUV for a family road trip. It was comfortable and spacious. I will definitely use Car Booker again!"',
            image: "images/jeep.png"
        },
        {
            name: "David W.",
            text: '"I used Car Booker for my business trip, and the car was exactly what I needed. Clean, stylish, and reliable."',
            image: "images/normalT.png"
        }
    ];

    const testimonialSection = document.getElementById("testimonial-section");

    testimonials.forEach(testimonial => {
        const card = `
            <div class="col-md-4">
                <div class="card testimonial-card mb-4">
                    <img src="${testimonial.image}" class="card-img-top" alt="${testimonial.name}">
                    <div class="card-body">
                        <p class="card-text">${testimonial.text}</p>
                        <footer class="blockquote-footer">${testimonial.name}</footer>
                    </div>
                </div>
            </div>
        `;
        testimonialSection.innerHTML += card;
    });
});

