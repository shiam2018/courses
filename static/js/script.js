// Базовый JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена!');
    
    // Получение текущей даты для подвала
    const footer = document.querySelector('footer p');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `&copy; ${year} Мой HTML Проект`;
    }
    
    // Пример интерактивности
    const header = document.querySelector('header h1');
    if (header) {
        header.addEventListener('click', function() {
            alert('Вы нажали на заголовок!');
        });
    }
}); 