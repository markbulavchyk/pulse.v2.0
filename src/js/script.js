const slides = document.querySelector('.slides');
let currentIndex = 0;
let slideWidth = document.querySelector('.slider').offsetWidth;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
const swipeThreshold = 100; // Минимальная дистанция для перемещения к следующему слайду

// Кнопки навигации
document.querySelector('#prev').addEventListener('click', () => moveToSlide(currentIndex - 1));
document.querySelector('#next').addEventListener('click', () => moveToSlide(currentIndex + 1));

// Touch-события для мобильных устройств
slides.addEventListener('touchstart', touchStart);
slides.addEventListener('touchend', touchEnd);
slides.addEventListener('touchmove', touchMove);

// Mouse-события для десктопов (добавлено)
slides.addEventListener('mousedown', dragStart);
slides.addEventListener('mouseup', dragEnd);
slides.addEventListener('mousemove', dragMove);
slides.addEventListener('mouseleave', dragEnd);

// Обновление ширины слайда при изменении размеров окна
window.addEventListener('resize', () => {
    const newSlideWidth = document.querySelector('.slider').offsetWidth;
    if (newSlideWidth !== slideWidth) {
        slideWidth = newSlideWidth;
        moveToSlide(currentIndex); // Корректируем позицию при изменении ширины
    }
});

// Перемещение к слайду по индексу
function moveToSlide(index) {
    if (index < 0) {
        currentIndex = slides.children.length - 1;
    } else if (index >= slides.children.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    currentTranslate = -currentIndex * slideWidth;
    slides.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
}

// Начало touch-события
function touchStart(event) {
    startPos = event.touches[0].clientX;
    isDragging = true;
}

// Перемещение touch-события
function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.touches[0].clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }
}

// Завершение touch-события
function touchEnd() {
    endDrag();
}

// Начало drag-события для мыши
function dragStart(event) {
    startPos = event.clientX;
    isDragging = true;
}

// Перемещение drag-события для мыши
function dragMove(event) {
    if (isDragging) {
        const currentPosition = event.clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
        slides.style.transform = `translateX(${currentTranslate}px)`;
    }
}

// Завершение drag-события для мыши
function dragEnd() {
    if (isDragging) {
        endDrag();
    }
}

// Общая логика завершения перетаскивания
function endDrag() {
    isDragging = false;
    const movedBy = currentTranslate - (-currentIndex * slideWidth);
    
    if (movedBy < -swipeThreshold) {
        moveToSlide(currentIndex + 1);
    } else if (movedBy > swipeThreshold) {
        moveToSlide(currentIndex - 1);
    } else {
        moveToSlide(currentIndex);
    }
}