// Обработчик для кнопки поиска
document.querySelector('.search-btn').addEventListener('click', function () {
  // Проверяем, существует ли уже динамическое меню поиска
  const existingOverlay = document.getElementById('search-overlay');
  console.log(existingOverlay);
  if (existingOverlay) {
    return; // Если элемент уже существует, ничего не делаем  
  }

  // Создаём div для меню поиска
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay'; // CSS-класс для оформления

  // Создаём контейнер для содержимого меню
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';

  // Создаём поле ввода
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.type = 'text';
  searchInput.placeholder = 'Пошук';

  // Создаём кнопку закрытия
  const closeSearch = document.createElement('button');
  closeSearch.className = 'close-search';
  closeSearch.innerText = '✖';

  // Добавляем обработчик для кнопки закрытия
  closeSearch.addEventListener('click', function () {
    searchOverlay.remove(); // Удаляем меню поиска из DOM
  });

  // Собираем содержимое меню
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(closeSearch);

  // Добавляем контейнер в overlay
  searchOverlay.appendChild(searchContainer);

  // Добавляем overlay в тело документа
  document.body.appendChild(searchOverlay);

  // Устанавливаем фокус на поле ввода
  searchInput.focus();

  // Добавляем обработчик для кнопки закрытия
  closeSearch.addEventListener('click', function () {
  searchOverlay.remove(); // Удаляем меню поиска из DOM
});

});

// Закрытие меню поиска при нажатии клавиши "Escape"
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const searchOverlay = document.getElementById('search-overlay');
    if (searchOverlay) {
      searchOverlay.remove();
    }
  }
});


document.querySelector('.helpNow').addEventListener('click', function () {
  // Создаём div для меню поиска
  const helpOverlay = document.createElement('div');
  helpOverlay.className = 'help-overlay'; // CSS-класс для оформления

  // Создаём контейнер для содержимого меню
  const helpContainers = document.createElement('div');
  helpContainers.className = 'help-containers';

  // Создаём контейнер для содержимого меню
  const helpContainer = document.createElement('div');
  helpContainer.className = 'help-container';

  // Создаём контейнер для содержимого меню
  const helpParagraph = document.createElement('p');
  helpParagraph.className = 'help-paragraph';

  // Создаём кнопку закрытия
  const closeHelp = document.createElement('button');
  closeHelp.className = 'close-help';
  closeHelp.innerText = '✖';

  // Собираем содержимое меню
  helpContainer.appendChild(helpParagraph);
  helpContainer.appendChild(closeHelp);
  
  // Добавляем контейнер в overlay
  helpOverlay.appendChild(helpContainer);
  
  // Добавляем overlay в тело документа
  document.body.appendChild(helpOverlay);
  

  // Добавляем обработчик для кнопки закрытия
  closeSearch.addEventListener('click', function () {
  searchOverlay.remove(); // Удаляем меню поиска из DOM
  });
})