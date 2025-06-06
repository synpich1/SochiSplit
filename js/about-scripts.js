/**
 * Сочи сплит - Скрипты для страницы "О нас"
 * Скрипты для интерактивных элементов на странице о компании
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчиков достижений
    initAchievementCounters();
    
    // Инициализация слайдера отзывов
    initTestimonialsSlider();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

/**
 * Инициализация счетчиков достижений
 */
function initAchievementCounters() {
    const counters = document.querySelectorAll('.achievement-counter');
    const speed = 200; // Скорость анимации (меньше значение = быстрее)
    
    // Функция для запуска счетчиков при прокрутке до секции
    function startCountersOnScroll() {
        const achievementsSection = document.querySelector('.achievements-section');
        if (!achievementsSection) return;
        
        const sectionPosition = achievementsSection.getBoundingClientRect();
        const screenPosition = window.innerHeight;
        
        if (sectionPosition.top < screenPosition && sectionPosition.bottom > 0) {
            // Секция видна на экране, запускаем счетчики
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(() => startCountersOnScroll(), 1);
                } else {
                    counter.innerText = target;
                }
            });
            
            // Удаляем обработчик после запуска счетчиков
            window.removeEventListener('scroll', startCountersOnScroll);
        }
    }
    
    // Добавляем обработчик прокрутки
    window.addEventListener('scroll', startCountersOnScroll);
    
    // Проверяем положение при загрузке страницы
    startCountersOnScroll();
}

/**
 * Инициализация слайдера отзывов
 */
function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    // Функция для показа определенного слайда
    function showSlide(index) {
        // Скрываем все слайды
        testimonials.forEach(item => {
            item.classList.remove('active');
        });
        
        // Убираем активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем текущий слайд и активируем соответствующую точку
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Обновляем текущий индекс
        currentSlide = index;
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentSlide - 1;
            if (index < 0) {
                index = testimonials.length - 1;
            }
            showSlide(index);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = currentSlide + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            showSlide(index);
        });
    }
    
    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Автоматическое переключение слайдов
    let slideInterval = setInterval(() => {
        let index = currentSlide + 1;
        if (index >= testimonials.length) {
            index = 0;
        }
        showSlide(index);
    }, 5000);
    
    // Останавливаем автоматическое переключение при наведении мыши
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                let index = currentSlide + 1;
                if (index >= testimonials.length) {
                    index = 0;
                }
                showSlide(index);
            }, 5000);
        });
    }
}

/**
 * Инициализация анимаций при скролле
 */
function initScrollAnimations() {
    // Получаем все элементы с классами анимаций
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .fade-in-left, .fade-in-right');
    
    // Функция для проверки видимости элемента в области просмотра
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight - 100 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для добавления класса 'animate' к видимым элементам
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }
    
    // Проверяем при прокрутке страницы
    window.addEventListener('scroll', checkAnimations);
    
    // Проверяем при загрузке страницы
    checkAnimations();
    
    // Добавляем эффект волны для кнопок
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
} 