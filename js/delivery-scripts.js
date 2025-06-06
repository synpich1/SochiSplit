/**
 * Сочи сплит - Скрипты для страницы доставки
 * Интерактивные функции для страницы доставки
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация аккордеона для FAQ
    initFaqAccordion();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация валидации формы
    initFormValidation();
});

/**
 * Инициализация аккордеона для FAQ
 */
function initFaqAccordion() {
    console.log('Инициализация FAQ аккордеона на странице доставки');
    
    // Выбираем все элементы с классом faq-question
    const questions = document.querySelectorAll('.faq-question');
    
    if (!questions || questions.length === 0) {
        console.error('Не найдены вопросы FAQ!');
        return;
    }
    
    console.log(`Найдено ${questions.length} вопросов FAQ`);
    
    // Для каждого вопроса добавляем обработчик клика
    questions.forEach((question, index) => {
        question.addEventListener('click', function() {
            console.log(`Клик по вопросу ${index + 1}`);
            
            // Находим родительский элемент faq-item
            const faqItem = this.parentElement;
            if (!faqItem || !faqItem.classList.contains('faq-item')) {
                console.error('Не найден родительский элемент faq-item');
                return;
            }
            
            // Проверяем, открыт ли этот элемент
            const isActive = faqItem.classList.contains('active');
            console.log(`Элемент ${isActive ? 'активен' : 'неактивен'}`);
            
            // Если элемент активен, закрываем его
            if (isActive) {
                faqItem.classList.remove('active');
                console.log('Закрываем элемент');
            } else {
                // Закрываем все другие элементы
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Открываем текущий элемент
                faqItem.classList.add('active');
                console.log('Открываем элемент');
            }
        });
    });
    
    // Убираем автоматическое открытие первого элемента
    // Все элементы будут закрыты при загрузке страницы
}

/**
 * Инициализация анимаций при скролле
 */
function initScrollAnimations() {
    // Элементы, которые будут анимироваться при прокрутке
    const animatedElements = document.querySelectorAll(
        '.delivery-map, .delivery-zones-info, .rates-table, ' +
        '.additional-services, .features-content, .features-image, ' +
        '.process-steps .step, .delivery-form-container'
    );
    
    // Функция для проверки, находится ли элемент в области видимости
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для добавления класса анимации к элементам в области видимости
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Проверяем при загрузке страницы
    checkAnimations();
    
    // Проверяем при прокрутке
    window.addEventListener('scroll', checkAnimations);
}

/**
 * Инициализация валидации формы
 */
function initFormValidation() {
    const form = document.querySelector('.delivery-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Получаем значения полей
            const name = form.querySelector('#name').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            const email = form.querySelector('#email').value.trim();
            
            // Проверяем обязательные поля
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Пожалуйста, введите ваше имя.\n';
                form.querySelector('#name').classList.add('error');
            } else {
                form.querySelector('#name').classList.remove('error');
            }
            
            if (phone === '') {
                isValid = false;
                errorMessage += 'Пожалуйста, введите ваш телефон.\n';
                form.querySelector('#phone').classList.add('error');
            } else {
                form.querySelector('#phone').classList.remove('error');
            }
            
            // Проверяем формат email, если он заполнен
            if (email !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    isValid = false;
                    errorMessage += 'Пожалуйста, введите корректный email.\n';
                    form.querySelector('#email').classList.add('error');
                } else {
                    form.querySelector('#email').classList.remove('error');
                }
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                // Здесь будет код отправки формы
                showSuccessMessage(form);
            } else {
                // Показываем сообщение об ошибке
                alert(errorMessage);
            }
        });
    }
}

/**
 * Показывает сообщение об успешной отправке формы
 */
function showSuccessMessage(form) {
    // Создаем элемент с сообщением об успехе
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Спасибо за ваш запрос!</h3>
        <p>Мы свяжемся с вами в ближайшее время.</p>
    `;
    
    // Скрываем форму и показываем сообщение
    form.style.display = 'none';
    form.parentNode.appendChild(successMessage);
    
    // Через 5 секунд возвращаем форму
    setTimeout(() => {
        successMessage.remove();
        form.style.display = 'block';
        form.reset();
    }, 5000);
}