fetch('api/photographer.json')
  .then(response => response.json())
  .then(data => {
    renderSlides(data);
    setupCarousel();
  });

function renderSlides(photographers) {
  const slidesContainer = document.querySelector('.carousel__slides');

  for (const photographer of photographers) {
    const slideElement = document.createElement('div');
    slideElement.classList.add('carousel__slide');

    const slideContent = `
      <div class="carousel__slide-content">
        <img class="photographer-photo" src="${photographer.photo}" alt="${photographer.name}">
        <div>
          <h2>${photographer.name}<span class="red-text">.</span></h2>
          <p>${photographer.info}</p>
          <p>${photographer.add_info}</p>
          <div class="card__network">
            <p>Follow ${photographer.name}:</p>
            <div class="card__social">
              <a href="${photographer.facebook}"><img class="social__item" src="img/facebook_body.svg" alt="Facebook icon"></a>
              <a href="${photographer.instagram}"><img class="social__item" src="img/instagram-body.svg" alt="Instagram icon"></a>
              <a href="${photographer.youtube}"><img class="social__item" src="img/youtube_body.svg" alt="YouTube icon"></a>
            </div>
          </div>
        </div>
      </div>
    `;
    slideElement.innerHTML = slideContent;
    slidesContainer.appendChild(slideElement);
  }
}

function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  const prevButton = carousel.querySelector('.carousel__prev-button');
  const nextButton = carousel.querySelector('.carousel__next-button');
  const slides = carousel.querySelectorAll('.carousel__slide');

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    slides[index].style.display = 'block';
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  showSlide(currentIndex);
}
