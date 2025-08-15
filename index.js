document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.cards-carousel');
  const scrollAmount = 480 + 24; 

  if (!carousel) return;

  
  const cards = Array.from(carousel.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild);
  });

 
  requestAnimationFrame(() => {
    carousel.scrollLeft = scrollAmount * cards.length;
  });

 
  window.scrollCarousel = function (direction) {
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  
  carousel.addEventListener('scroll', () => {
    const totalCards = cards.length;
    const cardWidth = scrollAmount;

    if (carousel.scrollLeft <= 0) {
      
      carousel.scrollLeft = cardWidth * totalCards;
    } else if (carousel.scrollLeft >= cardWidth * (totalCards * 2)) {

      carousel.scrollLeft = cardWidth * totalCards;
    }
  });
});




const mediaElements = document.querySelectorAll('.hero-images img, .hero-images video');


  window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  mediaElements.forEach((el) => {
    const offset = scrollY * 0.10;
    el.style.transform = `translateY(${offset}px)`;
  });
});


  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.2 
  });

  revealElements.forEach(el => observer.observe(el));

  
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

