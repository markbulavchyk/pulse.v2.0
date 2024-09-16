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

// TABS
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все табы и контент
    const tabs = document.querySelectorAll('.catalog__tab');
    const contents = document.querySelectorAll('.catalog__content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach(t => t.classList.remove('catalog__tab_active'));
            contents.forEach(c => c.classList.remove('catalog__content_active'));

            // Добавляем активный класс к выбранному табу и соответствующему контенту
            tab.classList.add('catalog__tab_active');
            contents[index].classList.add('catalog__content_active');
        });
    });
});

// кнопка подробнее / назад
function toggleSlide(selector) {
    // Получаем все элементы, соответствующие селектору
    const items = document.querySelectorAll(selector);

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Получаем все элементы контента и списка
            const contentItems = document.querySelectorAll('.catalog-item__content');
            const listItems = document.querySelectorAll('.catalog-item__list');

            // Переключаем активные классы для соответствующих элементов
            contentItems[index].classList.toggle('catalog-item__content_active');
            listItems[index].classList.toggle('catalog-item__list_active');
        });
    });
}

// Инициализация функции для всех кнопок
toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');