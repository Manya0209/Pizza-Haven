document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselContainer = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    let index = 0;

    const updateCarousel = () => {
        const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginRight);
        carouselContainer.style.transform = `translateX(-${index * itemWidth}px)`;
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
    };

    prevButton.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : itemCount - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        index = (index < itemCount - 1) ? index + 1 : 0;
        updateCarousel();
    });

    // Initial update to set the correct position
    updateCarousel();
});
