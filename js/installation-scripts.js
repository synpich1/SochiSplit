/**
 * Сочи сплит - Скрипты для страницы монтажа
 * Скрипты для интерактивных элементов на странице монтажа кондиционеров
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация FAQ аккордеона
    initFaqAccordion();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
});

/**
 * Инициализация FAQ аккордеона
 */
function initFaqAccordion() {
    console.log('Инициализация FAQ аккордеона');
    
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
    // Анимация элементов при скролле
    const animateElements = document.querySelectorAll('.slide-up, .fade-in, .scroll-animation');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Анимация шагов монтажа
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        stepObserver.observe(card);
    });
}
