/**
 * Сочи сплит - Скрипты для страницы контактов
 * Скрипты для интерактивных элементов на странице контактов
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация FAQ (вопросы и ответы)
    initFAQ();
    
    // Инициализация карты
    initMap();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

/**
 * Инициализация FAQ (вопросы и ответы)
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionEl = item.querySelector('.faq-question');
        const answerEl = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.faq-toggle i');
        
        // Скрываем все ответы по умолчанию
        answerEl.style.display = 'none';
        
        questionEl.addEventListener('click', function() {
            // Переключаем видимость ответа
            if (answerEl.style.display === 'none') {
                // Закрываем все другие ответы перед открытием текущего
                document.querySelectorAll('.faq-answer').forEach(answer => {
                    answer.style.display = 'none';
                });
                document.querySelectorAll('.faq-toggle i').forEach(icon => {
                    icon.className = 'fas fa-plus';
                });
                
                // Открываем текущий ответ
                answerEl.style.display = 'block';
                toggleIcon.className = 'fas fa-minus';
                
                // Плавное появление
                setTimeout(() => {
                    answerEl.style.opacity = '1';
                    answerEl.style.maxHeight = '500px';
                }, 10);
            } else {
                // Скрываем ответ
                answerEl.style.opacity = '0';
                answerEl.style.maxHeight = '0';
                
                setTimeout(() => {
                    answerEl.style.display = 'none';
                    toggleIcon.className = 'fas fa-plus';
                }, 300);
            }
        });
    });
}

/**
 * Инициализация карты
 */
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Добавляем класс для стилизации до загрузки карты
    mapElement.classList.add('loading');
    
    // Устанавливаем заглушку с сообщением
    mapElement.innerHTML = '<div class="map-placeholder"><p>Загрузка карты...</p><div class="loading-spinner"></div></div>';
    
    // Проверяем, загружен ли API Яндекс.Карт
    if (typeof ymaps !== 'undefined') {
        // Если API уже загружен, инициализируем карту
        initYandexMap();
    } else {
        // Если API не загружен, добавляем скрипт Яндекс.Карт
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
        script.async = true;
        script.defer = true;
        
        script.onload = function() {
            ymaps.ready(initYandexMap);
        };
        
        // Обработка ошибки загрузки
        script.onerror = function() {
            mapElement.innerHTML = '<div class="map-error"><p>Не удалось загрузить карту. Пожалуйста, обновите страницу или свяжитесь с нами по телефону.</p></div>';
            mapElement.classList.remove('loading');
            mapElement.classList.add('error');
        };
        
        document.head.appendChild(script);
    }
    
    // Функция инициализации Яндекс.Карты
    function initYandexMap() {
        // Координаты офиса (примерные)
        const officeCoords = [43.585472, 39.723098]; // Координаты центра Сочи
        
        // Создаем карту
        const map = new ymaps.Map(mapElement, {
            center: officeCoords,
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Создаем метку для офиса
        const officePlacemark = new ymaps.Placemark(officeCoords, {
            hintContent: 'Офис компании Сочи сплит',
            balloonContent: 'Офис компании Сочи сплит<br>г. Сочи, ул. Примерная, д. 123<br>3 этаж, офис 305'
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/map-marker.png', // Путь к изображению маркера
            iconImageSize: [40, 40], // Размер иконки
            iconImageOffset: [-20, -40] // Смещение иконки
        });
        
        // Добавляем метку на карту
        map.geoObjects.add(officePlacemark);
        
        // Устанавливаем отступы, чтобы метка была видна
        map.setBounds(map.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 50
        });
        
        // Удаляем класс загрузки
        mapElement.classList.remove('loading');
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
}

/**
 * Показать уведомление
 */
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Создаем содержимое уведомления
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    // Добавляем иконку в зависимости от типа уведомления
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    // Добавляем содержимое
    content.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-message">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.appendChild(content);
    
    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Настраиваем автоматическое скрытие уведомления
    const timeout = type === 'error' ? 8000 : 5000; // Ошибки показываем дольше
    
    const autoHideTimeout = setTimeout(() => {
        closeNotification();
    }, timeout);
    
    // Обработчик закрытия уведомления
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoHideTimeout);
        closeNotification();
    });
    
    // Функция закрытия уведомления
    function closeNotification() {
        notification.classList.remove('show');
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
} 