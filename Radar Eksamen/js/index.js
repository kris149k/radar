



// ----------------------- !!!!! ALT JAVASCRIPT ER LAVET MED AI ----------------------- !!!!!






// ----------------------- BURGER MENU -----------------------
let menuIsActive = false

function toggleMenuActive() {
    menuIsActive = !menuIsActive
    const menu = document.getElementById('mobile-menu')
    const burgerMenu = document.getElementById('burger')

    if (menuIsActive) {
        menu.style.height = '100vh'
        burgerMenu.classList.add('is-active')
        document.body.classList.add("overflow-y-hidden")
    } else {
        menu.style.height = '0vh'
        burgerMenu.classList.remove('is-active')
        document.body.classList.remove("overflow-y-hidden")
    }
}



// ----------------------- SLIDER -----------------------

if (document.querySelector('.slider')) {

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

let currentIndex = 0;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationID = 0;
let currentPosition = 0;
let slideInterval;
const AUTO_SLIDE_INTERVAL = 10000; // 10 seconds

// Check if device is mobile or tablet
function isMobileOrTablet() {
    const maxWidth = 768; // Typical tablet breakpoint
    return window.innerWidth <= maxWidth || 'ontouchstart' in window;
}

// Prevent default behavior for mouse and touch events
function preventDefaults(e) {
    if (isMobileOrTablet()) {
        e.preventDefault();
        e.stopPropagation();
    }
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function showSlides(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    currentTranslate = currentIndex * -100;
    prevTranslate = currentTranslate;
    setSliderPosition();
    updateDots();
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}%)`;
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(() => {
        showSlides(currentIndex + 1);
    }, AUTO_SLIDE_INTERVAL);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function arrowSlideRight() {
    showSlides(currentIndex + 1);
}

function arrowSlideLeft() {
    showSlides(currentIndex - 1);
}

// Touch events - only for mobile/tablet
function touchStart(event) {
    if (!isMobileOrTablet()) return;
    
    stopAutoSlide();
    isDragging = true;
    startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = 'grabbing';
}

function touchMove(event) {
    if (!isMobileOrTablet()) return;
    
    if (isDragging) {
        const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        const diff = (currentPosition - startPos) / slider.offsetWidth * 100;
        currentTranslate = prevTranslate + diff;
    }
}

function touchEnd() {
    if (!isMobileOrTablet()) return;
    
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > 20) {
        if (movedBy < 0) {
            currentIndex += 1;
        } else {
            currentIndex -= 1;
        }
    }
    
    if (currentIndex >= slides.length) currentIndex = slides.length - 1;
    if (currentIndex < 0) currentIndex = 0;

    currentTranslate = currentIndex * -100;
    prevTranslate = currentTranslate;
    
    setSliderPosition();
    updateDots();
    startAutoSlide();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function nextSlide() {
    stopAutoSlide();
    showSlides(currentIndex + 1);
    startAutoSlide();
}

function prevSlide() {
    stopAutoSlide();
    showSlides(currentIndex - 1);
    startAutoSlide();
}

// Initialize event listeners based on device type
function initializeEventListeners() {
    if (isMobileOrTablet()) {
        // Mobile/Tablet touch events
        slider.addEventListener('mousedown', touchStart);
        slider.addEventListener('touchstart', touchStart);
        slider.addEventListener('mousemove', touchMove);
        slider.addEventListener('touchmove', touchMove);
        slider.addEventListener('mouseup', touchEnd);
        slider.addEventListener('touchend', touchEnd);
        slider.addEventListener('mouseleave', touchEnd);
        slider.addEventListener('contextmenu', preventDefaults);
    }

    // Desktop-only hover pause
    if (!isMobileOrTablet()) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Common event listeners for all devices
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlides(parseInt(dot.dataset.index));
        startAutoSlide();
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Remove all event listeners
    slider.removeEventListener('mousedown', touchStart);
    slider.removeEventListener('touchstart', touchStart);
    slider.removeEventListener('mousemove', touchMove);
    slider.removeEventListener('touchmove', touchMove);
    slider.removeEventListener('mouseup', touchEnd);
    slider.removeEventListener('touchend', touchEnd);
    slider.removeEventListener('mouseleave', touchEnd);
    slider.removeEventListener('contextmenu', preventDefaults);
    sliderContainer.removeEventListener('mouseenter', stopAutoSlide);
    sliderContainer.removeEventListener('mouseleave', startAutoSlide);

    // Reinitialize event listeners based on new window size
    initializeEventListeners();
});

// Initialize
updateDots();
startAutoSlide();
initializeEventListeners();

}