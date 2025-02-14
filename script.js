let search = document.querySelector(".searchOverlay");
let closeSearch = document.querySelector(".closeSearch");
let openSearch = document.querySelector(".search-btn");

openSearch.addEventListener('click', function() {
  search.classList.add('searchOverlayActive')
});
closeSearch.addEventListener('click', function() {
  search.classList.remove('searchOverlayActive')
});

// Тут я робив відкриття-закриття modal фрагменту з типами допомоги
let modal = document.querySelector(".modal");
let modalOpen = document.querySelector(".FAQ");
let modalClose = document.querySelector(".modalClose");

modalOpen.addEventListener('click', function() {
  modal.classList.add('active');
});
modalClose.addEventListener('click', function() {
  modal.classList.remove('active');
});



const input = document.querySelector('.searchInput');
const searchResult = document.querySelector('.searchResult');

input.addEventListener('input', function() {
  let value = this.value.trim().toLowerCase();
  

  if (value === '') {
    searchResult.style.display = 'none';
    return;
  } 
  else {
    searchResult.style.display = 'block';
  }
  
  const searchContainers = document.querySelectorAll('.search');
  searchContainers.forEach(container => {
    container.style.display = 'none';
    let containerHasMatch = false;
    // Отримуємо всі секції (контейнери тем) всередині цього блоку
    const sections = container.querySelectorAll('.searchSection');
    sections.forEach(section => {
      let sectionHasMatch = false;
      // Отримуємо всі підтематики (елементи <li> з класом subtheme) в секції
      const subthemes = section.querySelectorAll('.subtheme');
      subthemes.forEach(subtheme => {
        subtheme.style.display = 'none';
        if (subtheme.textContent.toLowerCase().includes(value)) {
          sectionHasMatch = true;
          subtheme.style.display = 'block';
          container.style.display = 'inline-flex';
        }
      });
      // Встановлюємо видимість секції залежно від збігу
      section.style.display = sectionHasMatch ? 'block' : 'none';

      if (sectionHasMatch) {
        containerHasMatch = true;
      }
    })
  })
})

//Тут починається кнопка повернення до головної сторінки

const background = document.querySelector('.background');
const logo = document.querySelector('.logoHeart');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const navButtonProjects = document.querySelector('.navButtonProjects');
const currentProjectsPage = document.querySelector('.currentProjectsPage');

navButtonProjects.addEventListener('click', function() {
  main.style.display = 'none';
  footer.style.display = 'none';
  background.style.backgroundImage = 'url(blandBackground.png)'
  background.style.setProperty('--before-bg', 'none');
  currentProjectsPage.style.display = 'block';
})

logo.addEventListener('click', function() {
  main.style.display = 'block';
  footer.style.display = 'flex';
  background.style.backgroundImage = 'url(background.png)';
  background.style.setProperty('--before-bg', 'url("heartIsometry.svg")');
  currentProjectsPage.style.display = 'none';
})

const currentProjectsListWar = document.querySelector('#currentProjectsListWar');
const currentProjectsThemes = document.querySelectorAll('.currentProjectsTheme');
const currentProjectsLists = document.querySelectorAll('.currentProjectsList');
currentProjectsThemes[0].querySelector('p').innerHTML = currentProjectsListWar.childElementCount;
currentProjectsThemes.forEach(btn => {
  btn.addEventListener('click', function() {
    //Потрібні змінні
    let targetId = btn.getAttribute('data-target');
    let targetElement = document.getElementById(targetId);
    let targetNumberOfProjects = targetElement.childElementCount;

    //Маніпуляції з кнопкою
    currentProjectsThemes.forEach(theme => {
      theme.classList.remove('currentProjectsThemeActive');
      theme.querySelector('p').innerHTML = '';
    })
    btn.classList.add('currentProjectsThemeActive');
    btn.querySelector('p').innerHTML = targetNumberOfProjects;

    //Маніпуляції зі списком
    currentProjectsLists.forEach(list => {
      list.classList.remove('currentProjectsListActive');
    })
    targetElement.classList.add('currentProjectsListActive');
  })
})

const currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
const buttonShowTypesOfHelp = document.querySelector('.showTypesOfHelp');

buttonShowTypesOfHelp.addEventListener('click', function() {
  if (window.getComputedStyle(currentProjectTypesOfHelp[0]).getPropertyValue('visibility') === 'hidden'){
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = 'visible';
    })
  }
  else{
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = 'hidden';
    })
  }
  this.classList.toggle('showTypesOfHelpActive');
})

const form = document.querySelector('.form');
const formClose = document.querySelector('.formClose');

currentProjectsLists.forEach(list => {
  list.querySelectorAll('.currentProject').forEach(project => {
    project.addEventListener('mouseenter', function() {
      list.querySelector('.currentProjectActive').classList.remove('currentProjectActive');
      project.classList.add('currentProjectActive');
    })
    project.addEventListener('click', function() {
      form.classList.add('formActive');
    })
  })
})

formClose.addEventListener('click', function() {
  form.classList.remove('formActive');
})

