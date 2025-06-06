/**
 * Сочи сплит - JavaScript
 * Скрипты для интерактивности сайта
 */

document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс для анимации гамбургер-меню
    const header = document.querySelector('.header');
    if (header) {
        // Небольшая задержка для загрузки страницы
        setTimeout(() => {
            header.classList.add('header-loaded');
        }, 500);
    }
    
    // Инициализация всех компонентов
    initThemeSwitch();
    initMobileMenu();
    initScrollAnimations();
    initParticles();
    initRippleEffect();
    initFloatingElements();
    initCatalog();
    initFaqAccordion();
    initProductFilters();
    initContactForm();
    initShowMoreButton();
});

/**
 * Переключение темы (светлая/темная)
 */
function initThemeSwitch() {
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    // Проверка сохраненной темы
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }
    
    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Мобильное меню
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Создаем кнопку закрытия
    const closeButton = document.createElement('div');
    closeButton.className = 'close-menu';
    closeButton.setAttribute('aria-label', 'Закрыть меню');
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('tabindex', '0');
    nav.appendChild(closeButton);
    
    if (hamburger && nav) {
        // Обработчик клика по гамбургеру
        hamburger.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Обработчик нажатия клавиши Enter на гамбургере для доступности
        hamburger.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                toggleMenu();
            }
        });
        
        // Обработчик клика по кнопке закрытия
        closeButton.addEventListener('click', function() {
            closeMenu();
        });
        
        // Обработчик нажатия клавиши Enter на кнопке закрытия для доступности
        closeButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                closeMenu();
            }
        });
        
        // Закрытие меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(event) {
            // Проверяем, что меню открыто и клик был не по меню, не по гамбургеру и не по их дочерним элементам
            if (nav.classList.contains('active') && 
                !event.target.closest('.main-nav') && 
                !event.target.closest('.hamburger')) {
                closeMenu();
            }
        });
        
        // Закрытие меню при нажатии Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Функция для переключения состояния меню
        function toggleMenu() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('no-scroll');
            
            // Устанавливаем фокус на первый элемент меню при открытии для доступности
            if (nav.classList.contains('active')) {
                const firstNavLink = nav.querySelector('.nav-link');
                if (firstNavLink) {
                    setTimeout(() => {
                        firstNavLink.focus();
                    }, 300);
                }
            }
        }
        
        // Функция для закрытия меню
        function closeMenu() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    }
}

/**
 * Анимации при скролле
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .scroll-animation');
    
    // Проверка, поддерживается ли IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback для старых браузеров
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * Создание эффекта частиц
 */
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particlesCount = 30;
    
    // Создаем частицы
    for (let i = 0; i < particlesCount; i++) {
        createParticle(particlesContainer);
    }
}

/**
 * Создание одной частицы
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Случайный размер
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Случайная начальная позиция
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Случайная прозрачность
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Случайный цвет
    const hue = Math.random() * 60 + 180; // Оттенки синего
    particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.8)`;
    
    // Случайное направление движения
    const xMove = Math.random() * 100 - 50;
    const yMove = Math.random() * 100 - 50;
    particle.style.setProperty('--x', `${xMove}px`);
    particle.style.setProperty('--y', `${yMove}px`);
    
    // Случайная длительность анимации
    const duration = Math.random() * 10 + 10;
    particle.style.animation = `particleAnimation ${duration}s infinite ease-in-out`;
    
    // Добавляем частицу в контейнер
    container.appendChild(particle);
}

/**
 * Эффект волны при клике (Ripple Effect)
 */
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Плавающие элементы с разной скоростью
 */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        // Разная скорость и задержка для каждого элемента
        const duration = 5 + (index % 3);
        const delay = index * 0.5;
        
        element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });
}

/**
 * Обработка формы обратной связи
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получение данных формы
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Валидация формы
            let isValid = true;
            const nameInput = contactForm.querySelector('[name="name"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const messageInput = contactForm.querySelector('[name="message"]');
            
            // Проверка имени
            if (!formValues.name || formValues.name.trim() === '') {
                markInvalid(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            // Проверка email
            if (!formValues.email || !isValidEmail(formValues.email)) {
                markInvalid(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            // Проверка сообщения
            if (!formValues.message || formValues.message.trim() === '') {
                markInvalid(messageInput, 'Пожалуйста, введите ваше сообщение');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            // Если форма валидна, отправляем данные
            if (isValid) {
                // Здесь будет код отправки данных на сервер
                // Для демонстрации просто показываем сообщение об успехе
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Спасибо! Ваше сообщение отправлено.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                // Удаление сообщения через 5 секунд
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
}

/**
 * Вспомогательная функция для валидации email
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Вспомогательные функции для валидации формы
 */
function markInvalid(input, message) {
    input.classList.add('is-invalid');
    
    // Удаление предыдущего сообщения об ошибке, если оно есть
    const existingError = input.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Создание нового сообщения об ошибке
    const errorMessage = document.createElement('div');
    errorMessage.className = 'invalid-feedback';
    errorMessage.textContent = message;
    
    // Добавление сообщения после input
    input.parentElement.appendChild(errorMessage);
}

function markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    // Удаление сообщения об ошибке, если оно есть
    const existingError = input.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Фиксированная шапка при скролле
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

/**
 * Инициализация страницы каталога
 */
function initCatalog() {
    // Проверяем, находимся ли мы на странице каталога
    if (document.querySelector('.catalog-section')) {
        // Очищаем сохраненные фильтры при каждой загрузке страницы
        clearSavedFilters();
        
        initFilters();
        initProductHover();
        initPriceRangeFilter();
        initPagination();
    }
}

/**
 * Очистка сохраненных фильтров
 */
function clearSavedFilters() {
    localStorage.removeItem('catalog_filters');
}

/**
 * Инициализация фильтров
 */
function initFilters() {
    const filterBtn = document.querySelector('.filter-btn');
    const resetFilterBtn = document.querySelector('.reset-filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsCountEl = document.querySelector('.products-count strong');
    
    if (!filterBtn) return;
    
    // Загружаем сохраненные фильтры в элементы формы, но не применяем их автоматически
    loadFiltersFromStorage();
    
    // Обновляем счетчик товаров при загрузке - показываем все товары
    updateProductCount(productCards.length);
    
    // Убираем автоматическое применение фильтров при загрузке страницы
    // Это позволит всегда показывать все товары при первой загрузке
    
    // Обработчик нажатия на кнопку применения фильтров
    filterBtn.addEventListener('click', function() {
        // Получаем значения фильтров
        const typeFilter = document.getElementById('type').value;
        const brandFilter = document.getElementById('brand').value;
        const areaFilter = document.getElementById('area').value;
        const priceFilter = document.getElementById('price').value;
        
        // Сохраняем значения фильтров
        saveFiltersToStorage(typeFilter, brandFilter, areaFilter, priceFilter);
        
        // Анимация кнопки
        filterBtn.classList.add('pulse');
        setTimeout(() => {
            filterBtn.classList.remove('pulse');
        }, 500);
        
        // Применяем фильтры
        filterProducts(typeFilter, brandFilter, areaFilter, priceFilter, productCards);
    });
    
    // Обработчик нажатия на кнопку сброса фильтров
    resetFilterBtn.addEventListener('click', function() {
        // Сбрасываем все фильтры
        resetFilters();
        
        // Анимация кнопки
        resetFilterBtn.classList.add('pulse');
        setTimeout(() => {
            resetFilterBtn.classList.remove('pulse');
        }, 500);
        
        // Обновляем счетчик товаров
        updateProductCount(productCards.length);
        
        // Показываем уведомление
        showNotification('Фильтры сброшены', 'success');
    });
    
    // Добавляем обработчик изменения для всех селектов фильтров
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Подсвечиваем кнопку применения фильтров
            filterBtn.classList.add('highlight');
            setTimeout(() => {
                filterBtn.classList.remove('highlight');
            }, 1000);
        });
    });
}

/**
 * Применение фильтров к товарам
 */
function filterProducts(typeFilter, brandFilter, areaFilter, priceFilter, productCards) {
    // Анимация скрытия всех карточек
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        // Реальная фильтрация на основе выбранных параметров
        productCards.forEach((card, index) => {
            // Получаем данные о товаре
            const cardType = getProductType(card);
            const cardBrand = getProductBrand(card);
            const cardArea = getProductArea(card);
            const cardPrice = getProductPrice(card);
            
            // Проверяем соответствие фильтрам
            const matchesType = typeFilter === 'all' || cardType === typeFilter;
            const matchesBrand = brandFilter === 'all' || cardBrand === brandFilter;
            const matchesArea = areaFilter === 'all' || matchesAreaFilter(cardArea, areaFilter);
            const matchesPrice = priceFilter === 'all' || matchesPriceFilter(cardPrice, priceFilter);
            
            // Показываем только карточки, соответствующие всем фильтрам
            const isVisible = matchesType && matchesBrand && matchesArea && matchesPrice;
            
            // Устанавливаем атрибут data-filtered для карточки
            if (isVisible) {
                card.setAttribute('data-filtered', 'true');
            } else {
                card.setAttribute('data-filtered', 'false');
            }
        });
        
        // Проверяем, есть ли видимые товары после фильтрации
        const visibleCards = Array.from(productCards).filter(card => card.getAttribute('data-filtered') === 'true');
        
        // Обновляем счетчик товаров
        updateProductCount(visibleCards.length);
        
        if (visibleCards.length === 0) {
            showNotification('Товары не найдены. Попробуйте изменить параметры фильтра.', 'info');
            // Скрываем пагинацию, если нет товаров
            const paginationContainer = document.querySelector('.pagination');
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
        } else {
            showNotification(`Найдено ${visibleCards.length} товаров`, 'success');
            // Обновляем пагинацию с учетом отфильтрованных товаров
            updatePaginationAfterFilter(visibleCards);
            
            // Добавляем дополнительную проверку через 1 секунду,
            // чтобы убедиться, что карточки действительно видны
            setTimeout(() => {
                const displayedCards = Array.from(visibleCards).filter(card => 
                    window.getComputedStyle(card).display !== 'none' && 
                    window.getComputedStyle(card).opacity !== '0');
                
                // Если нет отображаемых карточек, принудительно показываем их
                if (displayedCards.length === 0 && visibleCards.length > 0) {
                    console.log('Обнаружена проблема с отображением карточек, исправляем...');
                    visibleCards.forEach(card => {
                        card.style.display = '';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            }, 1000);
        }
    }, 500);
}

/**
 * Обновление пагинации после фильтрации
 */
function updatePaginationAfterFilter(visibleCards) {
    const paginationContainer = document.querySelector('.pagination');
    const itemsPerPage = 6; // Количество товаров на странице
    
    if (!paginationContainer) return;
    
    // Очищаем контейнер пагинации
    paginationContainer.innerHTML = '';
    
    // Рассчитываем количество страниц
    const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
    
    // Если страница всего одна, не показываем пагинацию
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        
        // Показываем все отфильтрованные товары сразу
        visibleCards.forEach(card => {
            card.style.display = '';
            // Используем requestAnimationFrame для более надежной анимации
            requestAnimationFrame(() => {
                // Небольшая задержка для срабатывания CSS-перехода
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            });
        });
        
        // Скрываем отфильтрованные товары
        const hiddenCards = Array.from(document.querySelectorAll('.product-card[data-filtered="false"]'));
        hiddenCards.forEach(card => {
            card.style.display = 'none';
        });
        
        return;
    }
    
    // Показываем пагинацию
    paginationContainer.style.display = 'flex';
    
    // Создаем элементы пагинации
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('a');
        pageItem.href = '#';
        pageItem.className = 'pagination-item' + (i === 1 ? ' active' : '');
        pageItem.textContent = i;
        
        // Обработчик клика по номеру страницы
        pageItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех элементов
            const pageItems = document.querySelectorAll('.pagination-item');
            pageItems.forEach(item => item.classList.remove('active'));
            
            // Устанавливаем активный класс для выбранной страницы
            this.classList.add('active');
            
            // Показываем товары для выбранной страницы
            showFilteredProductsForPage(i, itemsPerPage, visibleCards);
        });
        
        paginationContainer.appendChild(pageItem);
    }
    
    // Добавляем элемент "Следующая" для удобства навигации
    const nextPageItem = document.createElement('a');
    nextPageItem.href = '#';
    nextPageItem.className = 'pagination-next';
    nextPageItem.innerHTML = 'Следующая <i class="fas fa-chevron-right"></i>';
    
    // Обработчик клика по "Следующая"
    nextPageItem.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Находим активную страницу
        const activeItem = document.querySelector('.pagination-item.active');
        if (activeItem) {
            const currentPage = parseInt(activeItem.textContent);
            if (currentPage < totalPages) {
                // Находим следующую страницу
                const nextPage = document.querySelector(`.pagination-item:nth-child(${currentPage + 1})`);
                if (nextPage) {
                    // Имитируем клик по следующей странице
                    nextPage.click();
                }
            }
        }
    });
    
    paginationContainer.appendChild(nextPageItem);
    
    // Показываем товары для первой страницы
    showFilteredProductsForPage(1, itemsPerPage, visibleCards);
}

/**
 * Отображение отфильтрованных товаров для конкретной страницы
 */
function showFilteredProductsForPage(page, itemsPerPage, visibleCards) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, visibleCards.length);
    
    // Скрываем все товары сразу
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)'; // Устанавливаем начальное смещение
    });
    
    // Показываем только отфильтрованные товары для текущей страницы без таймаута
    for (let i = startIndex; i < endIndex; i++) {
        const card = visibleCards[i];
        card.style.display = '';
        // Используем requestAnimationFrame вместо setTimeout для более надежной анимации
        requestAnimationFrame(() => {
            // Небольшая задержка для срабатывания CSS-перехода
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        });
    }
    
    // Прокручиваем страницу к началу каталога
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
        window.scrollTo({
            top: catalogSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

/**
 * Сброс всех фильтров к значению "all"
 */
function resetFilters() {
    const filters = ['type', 'brand', 'area', 'price'];
    
    filters.forEach(filter => {
        const selectElement = document.getElementById(filter);
        if (selectElement) {
            selectElement.value = 'all';
        }
    });
    
    // Очищаем сохраненные фильтры
    localStorage.removeItem('catalog_filters');
    
    // Сбрасываем атрибуты фильтрации для всех карточек
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.setAttribute('data-filtered', 'true');
    });
    
    // Обновляем пагинацию
    initPagination();
}

/**
 * Сохранение текущих значений фильтров в localStorage
 */
function saveFiltersToStorage(type, brand, area, price) {
    const filters = {
        type: type,
        brand: brand,
        area: area,
        price: price
    };
    
    localStorage.setItem('catalog_filters', JSON.stringify(filters));
}

/**
 * Загрузка сохраненных значений фильтров из localStorage
 */
function loadFiltersFromStorage() {
    const savedFilters = localStorage.getItem('catalog_filters');
    
    if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        
        // Устанавливаем значения фильтров
        Object.keys(filters).forEach(key => {
            const selectElement = document.getElementById(key);
            if (selectElement && filters[key]) {
                selectElement.value = filters[key];
            }
        });
    }
}

/**
 * Обновление счетчика найденных товаров
 */
function updateProductCount(count) {
    const productsCountEl = document.querySelector('.products-count strong');
    if (productsCountEl) {
        productsCountEl.textContent = count;
    }
}

/**
 * Получение типа товара из карточки
 */
function getProductType(card) {
    const title = card.querySelector('.product-title').textContent.toLowerCase();
    
    if (title.includes('сплит-система') && title.includes('мульти')) return 'multi';
    if (title.includes('сплит-система')) return 'split';
    if (title.includes('мобильный')) return 'mobile';
    if (title.includes('оконный')) return 'window';
    
    return 'split'; // По умолчанию
}

/**
 * Получение бренда товара из карточки
 */
function getProductBrand(card) {
    const title = card.querySelector('.product-title').textContent.toLowerCase();
    
    if (title.includes('mitsubishi')) return 'mitsubishi';
    if (title.includes('daikin')) return 'daikin';
    if (title.includes('haier')) return 'haier';
    if (title.includes('lg')) return 'lg';
    if (title.includes('samsung')) return 'samsung';
    if (title.includes('ballu')) return 'ballu';
    
    return 'other';
}

/**
 * Получение площади обслуживания из карточки
 */
function getProductArea(card) {
    const specs = card.querySelectorAll('.spec');
    let area = 0;
    
    specs.forEach(spec => {
        if (spec.innerHTML.includes('fa-snowflake')) {
            const areaText = spec.textContent.trim();
            const areaMatch = areaText.match(/(\d+)/);
            if (areaMatch && areaMatch[1]) {
                area = parseInt(areaMatch[1]);
            }
        }
    });
    
    return area;
}

/**
 * Получение цены товара из карточки
 */
function getProductPrice(card) {
    const priceElement = card.querySelector('.price-current');
    if (!priceElement) return 0;
    
    const priceText = priceElement.textContent.trim();
    const priceMatch = priceText.match(/(\d+\s*\d*)/);
    
    if (priceMatch && priceMatch[1]) {
        return parseInt(priceMatch[1].replace(/\s+/g, ''));
    }
    
    return 0;
}

/**
 * Проверка соответствия площади фильтру
 */
function matchesAreaFilter(cardArea, areaFilter) {
    switch(areaFilter) {
        case 'small':
            return cardArea <= 20;
        case 'medium':
            return cardArea > 20 && cardArea <= 40;
        case 'large':
            return cardArea > 40 && cardArea <= 60;
        case 'xlarge':
            return cardArea > 60;
        default:
            return true;
    }
}

/**
 * Проверка соответствия цены фильтру
 */
function matchesPriceFilter(cardPrice, priceFilter) {
    switch(priceFilter) {
        case 'low':
            return cardPrice < 30000;
        case 'medium':
            return cardPrice >= 30000 && cardPrice < 50000;
        case 'high':
            return cardPrice >= 50000 && cardPrice < 80000;
        case 'premium':
            return cardPrice >= 80000;
        default:
            return true;
    }
}

/**
 * Эффекты при наведении на товар
 */
function initProductHover() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const image = card.querySelector('.product-image img');
        const originalSrc = image.src;
        const hoverSrc = originalSrc.replace('.jpg', '-hover.jpg');
        
        // При наведении меняем изображение, если есть hover-версия
        card.addEventListener('mouseenter', function() {
            // Проверяем существование hover-изображения
            const img = new Image();
            img.src = hoverSrc;
            img.onload = function() {
                image.src = hoverSrc;
            };
        });
        
        card.addEventListener('mouseleave', function() {
            image.src = originalSrc;
        });
    });
}

/**
 * Фильтр по диапазону цен
 */
function initPriceRangeFilter() {
    // Здесь будет реализация слайдера для диапазона цен
    // Для полной реализации потребуется дополнительная библиотека или компонент
}

/**
 * Инициализация пагинации
 */
function initPagination() {
    const paginationContainer = document.querySelector('.pagination');
    const productCards = document.querySelectorAll('.product-card');
    const itemsPerPage = 6; // Количество товаров на странице
    
    if (!paginationContainer || !productCards.length) return;
    
    // Очищаем контейнер пагинации
    paginationContainer.innerHTML = '';
    
    // Рассчитываем количество страниц
    const totalPages = Math.ceil(productCards.length / itemsPerPage);
    
    // Если страница всего одна, не показываем пагинацию и отображаем все товары
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        
        // Убеждаемся, что все товары видны
        productCards.forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        return;
    }
    
    // Создаем элементы пагинации
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('a');
        pageItem.href = '#';
        pageItem.className = 'pagination-item' + (i === 1 ? ' active' : '');
        pageItem.textContent = i;
        
        // Обработчик клика по номеру страницы
        pageItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех элементов
            const pageItems = document.querySelectorAll('.pagination-item');
            pageItems.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс текущему элементу
            this.classList.add('active');
            
            // Показываем товары для текущей страницы
            showProductsForPage(i, itemsPerPage, productCards);
        });
        
        paginationContainer.appendChild(pageItem);
    }
    
    // Добавляем кнопку "Следующая"
    if (totalPages > 1) {
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.className = 'pagination-next';
        nextButton.innerHTML = 'Следующая <i class="fas fa-chevron-right"></i>';
        
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим текущую активную страницу
            const activeItem = document.querySelector('.pagination-item.active');
            const currentPage = parseInt(activeItem.textContent);
            
            // Переходим на следующую страницу, если она существует
            if (currentPage < totalPages) {
                const nextPage = currentPage + 1;
                const nextPageItem = document.querySelector(`.pagination-item:nth-child(${nextPage})`);
                
                if (nextPageItem) {
                    nextPageItem.click();
                }
            }
        });
        
        paginationContainer.appendChild(nextButton);
    }
    
    // Показываем товары для первой страницы
    showProductsForPage(1, itemsPerPage, productCards);
}

/**
 * Показать товары для указанной страницы
 */
function showProductsForPage(page, itemsPerPage, productCards) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Скрываем все товары
    productCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (index - startIndex) * 100);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
    
    // Прокручиваем страницу к началу каталога
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection) {
        window.scrollTo({
            top: catalogSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

/**
 * Аккордеон для FAQ
 */
function initFaqAccordion() {
    // Пропускаем инициализацию, если мы на странице installation.html
    if (window.location.pathname.includes('installation.html')) {
        return;
    }
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Переключение активного состояния для текущего вопроса
            this.classList.toggle('active');
            
            // Получение родительского элемента
            const faqItem = this.closest('.faq-item');
            if (faqItem) {
                faqItem.classList.toggle('active');
            }
            
            // Получение ответа, связанного с вопросом
            const answer = this.nextElementSibling;
            
            // Переключение видимости ответа
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Фильтры для продуктов
 */
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resetBtn = document.querySelector('.reset-filter-btn');
    const products = document.querySelectorAll('.product-card');
    
    if (filterBtns.length && products.length) {
        // Обработчик клика по кнопкам фильтра
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Удаление активного класса со всех кнопок
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Добавление активного класса текущей кнопке
                this.classList.add('active');
                
                // Фильтрация продуктов
                products.forEach(product => {
                    if (filterValue === 'all' || product.classList.contains(filterValue)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
        
        // Сброс фильтров
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                products.forEach(product => {
                    product.style.display = 'block';
                });
                
                // Активация кнопки "Все"
                document.querySelector('[data-filter="all"]').classList.add('active');
            });
        }
    }
}

/**
 * Инициализация кнопки "Показать еще"
 */
function initShowMoreButton() {
    const productsGrid = document.querySelector('.products-grid');
    const showMoreButton = document.querySelector('.products-more .btn');
    
    if (!productsGrid || !showMoreButton) return;
    
    const productCards = productsGrid.querySelectorAll('.product-card');
    const cardsPerPage = 6; // Количество карточек на странице
    let currentlyVisible = cardsPerPage;
    
    // Скрыть все карточки, кроме первых cardsPerPage
    productCards.forEach((card, index) => {
        if (index >= cardsPerPage) {
            card.classList.add('hidden');
        }
    });
    
    // Если карточек меньше или равно cardsPerPage, скрыть кнопку "Показать еще"
    if (productCards.length <= cardsPerPage) {
        showMoreButton.classList.add('hidden');
    }
    
    // Обработчик клика на кнопку "Показать еще"
    showMoreButton.addEventListener('click', function() {
        // Показать следующие cardsPerPage карточек
        for (let i = currentlyVisible; i < currentlyVisible + cardsPerPage; i++) {
            if (productCards[i]) {
                productCards[i].classList.remove('hidden');
            }
        }
        
        // Увеличить счетчик видимых карточек
        currentlyVisible += cardsPerPage;
        
        // Если все карточки отображены, скрыть кнопку "Показать еще"
        if (currentlyVisible >= productCards.length) {
            showMoreButton.classList.add('hidden');
        }
    });
} 