document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.cards-carousel');
  const scrollAmount = 480 + 24; // tarjeta + gap aproximado

  if (!carousel) return;

  // Clonar tarjetas al principio y al final
  const cards = Array.from(carousel.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });

  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.insertBefore(clone, carousel.firstChild);
  });

  // Esperar al render y posicionar en el "inicio verdadero"
  requestAnimationFrame(() => {
    carousel.scrollLeft = scrollAmount * cards.length;
  });

  // Scroll programado por flechas
  window.scrollCarousel = function (direction) {
    if (!carousel) return;

    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // Reset de posición cuando llegamos al falso final/inicio
  carousel.addEventListener('scroll', () => {
    const totalCards = cards.length;
    const cardWidth = scrollAmount;

    if (carousel.scrollLeft <= 0) {
      // Estamos en el inicio falso → saltamos al real
      carousel.scrollLeft = cardWidth * totalCards;
    } else if (carousel.scrollLeft >= cardWidth * (totalCards * 2)) {
      // Estamos en el final falso → saltamos al real
      carousel.scrollLeft = cardWidth * totalCards;
    }
  });
});


// animacion 

const images = document.querySelectorAll('.hero-images img');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    images.forEach((img) => {
      const offset = scrollY * 0.10; // bajan ligeramente, ajustá 0.03 si querés más o menos
      img.style.transform = `translateY(${offset}px)`;
    });
  });


  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // animación solo una vez
      }
    });
  }, {
    threshold: 0.2 // cuando el 20% del elemento es visible
  });

  revealElements.forEach(el => observer.observe(el));

  
