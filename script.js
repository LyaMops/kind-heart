let database

async function getDatabase() {
  try {
    let response = await fetch('http://localhost:3000/idinahuj');
    if (!response.ok) {
      throw new Error('Error - there are problems with receiving database!');
    }
    let data = await response.json();
    return data;
  } catch(error) {
    console.error('Error:', error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  database = await getDatabase();
});

setTimeout(() => {
}, 1000);

function parsingProjects(currentPage, currentTheme, currentUrgency) {

  if (projectsDiv.childElementCount > 0) {
    return;
  }

  let filteredDatabase;

  if (currentUrgency === "urgent") {
      filteredDatabase = database.filter(dataItem => dataItem.project_type === currentPage && dataItem.project_division.toLowerCase() === currentTheme && dataItem.urgent === "1")
    }
  else {
    filteredDatabase = database.filter(dataItem => 
      dataItem.project_type === currentPage && dataItem.project_division.toLowerCase() === currentTheme
    )
  }


  let numberOfPassedProjects = 0;
  for (project in filteredDatabase) {
    let amount_needed = filteredDatabase[project].amount_needed;
    let amount_raised = filteredDatabase[project].amount_raised;
    let description = filteredDatabase[project].description;
    let title = filteredDatabase[project].title;
    let urgent = filteredDatabase[project].urgent;
    let project_type = filteredDatabase[project].project_type;
    let project_division = filteredDatabase[project].project_division;
    let financial_help = filteredDatabase[project].financial_help;
    let material_help = filteredDatabase[project].material_help;
    let responsibility = filteredDatabase[project].responsibility;
    let volunteering = filteredDatabase[project].volunteering;
    let picture = filteredDatabase[project].picture;
    let start_date = filteredDatabase[project].start_date;

    // project_type = Project / Archive
    // currentPage = Project / Archive
    // currentTheme = war / ecology / children / education
    // project_division = War / Ecology / Children / Education
    
    let external_div = document.createElement('div');
    let internal_img = document.createElement('img');
    let internal_div_1 = document.createElement('div');
    let internal_div_2 = document.createElement('div');

    external_div.classList.add('currentProject');

    internal_div_1.classList.add('currentProjectMain');
    internal_div_2.classList.add('currentProjectTypesOfHelp');

    let project_date = document.createElement('h5');
    project_date.innerText = start_date;
    project_date.classList.add('currentProjectDate');

    let project_title = document.createElement('h2');
    project_title.innerText = title;
    project_title.classList.add('currentProjectTitle');

    let project_description = document.createElement('p');
    project_description.innerText = description;
    project_description.classList.add('currentProjectDescription');

    if (responsibility === '1') {
      let responsibility_icon = document.createElement('img');
      responsibility_icon.classList.add('helpIcon');
      responsibility_icon.src = './images/hand.svg';
      internal_div_2.appendChild(responsibility_icon);
    }

    if (financial_help === '1') {
      let financial_help_icon = document.createElement('img');
      financial_help_icon.classList.add('helpIcon');
      financial_help_icon.src = './images/wallet.svg';
      internal_div_2.appendChild(financial_help_icon);
    }

    if (material_help === '1') {
      let material_help_icon = document.createElement('img');
      material_help_icon.classList.add('helpIcon');
      material_help_icon.src = './images/clothes.svg';
      internal_div_2.appendChild(material_help_icon);
    }

    if (volunteering === '1') {
      let volunteering_icon = document.createElement('img');
      volunteering_icon.classList.add('helpIcon');
      volunteering_icon.src = './images/donation.svg';
      internal_div_2.appendChild(volunteering_icon);
    }

    if (numberOfPassedProjects === 0) {
      external_div.classList.add('currentProjectActive');
    }

    external_div.append(internal_img, internal_div_1, internal_div_2);

    external_div.addEventListener('mouseenter', function() {
      projectsDiv.querySelector('.currentProjectActive').classList.remove('currentProjectActive');
      external_div.classList.add('currentProjectActive');
    })
    if (currentPage === "Project" && urgency === "urgent") {
      internal_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPhKoZ_IkWmfWKe4fh5CdzCTRlG1xYGGq7A&s";
      internal_img.classList.add('currentProjectImage');
      let project_progress = document.createElement('p');
      project_progress.innerText = `Зібрано ${amount_raised} з ${amount_needed} UAH`;
      project_progress.classList.add('currentProjectProgress');
      
      internal_div_1.append(project_date, project_title, project_description, project_progress);

      external_div.addEventListener('click', function() {
        form.classList.add('formActive');
      })

      projectsDiv.appendChild(external_div);

      numberOfPassedProjects++;  
    }
    else if (currentPage === "Project"){
      if (urgent === "1") {
        internal_img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPhKoZ_IkWmfWKe4fh5CdzCTRlG1xYGGq7A&s";
        internal_img.classList.add('currentProjectImage');
      }
      else {
        internal_img.src = "./images/Kids.png";
        internal_img.classList.add('currentProjectImage');
      }

      if (urgent === '1') {
        let project_urgent = document.createElement('p');
        project_urgent.innerText = `Терміново`;
        project_urgent.classList.add('currentProjectUrgent');
        external_div.appendChild(project_urgent);
      }
      
      let project_progress = document.createElement('p');
      project_progress.innerText = `Зібрано ${amount_raised} з ${amount_needed} UAH`;
      project_progress.classList.add('currentProjectProgress');
      
      internal_div_1.append(project_date, project_title, project_description, project_progress);

      external_div.addEventListener('click', function() {
        form.classList.add('formActive');
      })


      projectsDiv.appendChild(external_div);

      numberOfPassedProjects++;  
    }
    
    else if (currentPage === "Archive") {
      internal_img.src = "https://images.theconversation.com/files/386487/original/file-20210225-19-1vd7g8f.jpg?ixlib=rb-4.1.0&rect=50%2C0%2C6579%2C4466&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip";
      internal_img.classList.add('currentProjectImage');
      internal_div_1.append(project_date, project_title, project_description);

      projectsDiv.appendChild(external_div);

      numberOfPassedProjects++;

    }

  }
  
}

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



const searchInput = document.querySelector('.searchInput');
const searchResult = document.querySelector('.searchResult');

searchInput.addEventListener('input', function() {
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
const navButtonArchives = document.querySelector('.navButtonArchives');
const navButtonUrgentHelp = document.querySelector('.urgentHelp-btn');
const navButtonContacts = document.querySelector('.navButtonContacts')
const contacts = document.querySelector('.contact');
const currentProjectsPage = document.querySelector('.currentProjectsPage');
let currentPage;
let currentTheme = "war";
let urgency = "";
let visibleStatus = false;

function openProjectsList() {
    main.style.display = 'none';
    footer.style.display = 'none';
    currentProjectsPage.style.display = 'block';
    contacts.style.display = 'none';
}

navButtonProjects.addEventListener('click', function() {
  background.style.backgroundImage = 'url(./images/blandBackground.png)'
  background.style.setProperty('--before-bg', 'none');
  Array.from(document.getElementsByClassName('currentProjectsTheme')).forEach(element => {
    element.querySelector('p').style.color = "rgba(230, 53, 84, 1)";})
  openProjectsList();
  currentPage = "Project";
  urgency = "";
  document.querySelectorAll('.currentProject').forEach(project => {
    project.remove();
  })
  parsingProjects(currentPage, currentTheme);
  document.getElementsByClassName('currentProjectsThemeActive')[0].querySelector('p').innerText = projectsDiv.childElementCount;
  let currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
  if (visibleStatus) {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "visible";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#9C5D9A");
    })
  }
  else {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "hidden";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#9C5D9A");
  })
}
});

navButtonArchives.addEventListener('click', function() {
  background.style.backgroundImage = 'url(./images/blandBackground.png)'
  background.style.setProperty('--before-bg', 'none');
  Array.from(document.getElementsByClassName('currentProjectsTheme')).forEach(element => {
    element.querySelector('p').style.color = "rgba(230, 53, 84, 1)";})
  openProjectsList();
  currentPage = "Archive";
  urgency = "";
  document.querySelectorAll('.currentProject').forEach(project => {
    project.remove();
  })
  parsingProjects(currentPage, currentTheme);
  document.getElementsByClassName('currentProjectsThemeActive')[0].querySelector('p').innerText = projectsDiv.childElementCount;
  let currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
  if (visibleStatus) {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "visible";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#9C5D9A");
    })
  }
  else {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "hidden";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#9C5D9A");
  })
}
});

navButtonUrgentHelp.addEventListener('click', function() {
  background.style.backgroundImage = 'url(./images/work-urgent.png)';
  background.style.setProperty('--before-bg', 'none');
  openProjectsList();
  currentPage = "Project";
  urgency = "urgent";
  document.querySelectorAll('.currentProject').forEach(project => {
    project.remove();
  })
  parsingProjects(currentPage, currentTheme, urgency);
  document.getElementsByClassName('currentProjectsThemeActive')[0].querySelector('p').innerText = projectsDiv.childElementCount;
  Array.from(document.getElementsByClassName('currentProjectsTheme')).forEach(element => {
    element.querySelector('p').style.color = "#8492F3";
  })
  let currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
  if (visibleStatus) {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "visible";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#8492F3");
    })
  }
  else {
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = "hidden";
      icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#8492F3");
  })
}
});

logo.addEventListener('click', function() {
  main.style.display = 'block';
  footer.style.display = 'flex';
  background.style.backgroundImage = 'url(./images/background.png)';
  background.style.setProperty('--before-bg', 'url("./images/heartIsometry.svg")');
  currentProjectsPage.style.display = 'none';
  contacts.style.display = 'none';
})

const currentProjectsThemes = document.querySelectorAll('.currentProjectsTheme');
const projectsDiv = document.querySelector('#projects');

currentProjectsThemes.forEach(btn => {
  btn.addEventListener('click', async function() {
    //Потрібні змінні
    document.querySelectorAll('.currentProject').forEach(project => {
      project.remove();
    })
    let targetId = btn.getAttribute('data-target');
    currentTheme = targetId.split('-')[1];

    parsingProjects(currentPage, currentTheme, urgency);
    

    //Маніпуляції з кнопкою
    currentProjectsThemes.forEach(theme => {
      theme.classList.remove('currentProjectsThemeActive');
      theme.querySelector('p').innerText = '';
    })
    btn.classList.add('currentProjectsThemeActive');
    btn.querySelector('p').innerText = projectsDiv.childElementCount;

    //Робимо кнопочки видів допомоги видимими чи ні
    let currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
    if (visibleStatus) {
      currentProjectTypesOfHelp.forEach(icons => {
        icons.style.visibility = "visible";
        if (urgency === "urgent") {
          icons.querySelectorAll("img").forEach(icon => icon.style.backgroundColor = "#8492F3");
        }
      })
    }
    else {  
      currentProjectTypesOfHelp.forEach(icons => {
        icons.style.visibility = "hidden";
    })
  }
})
})


const buttonShowTypesOfHelp = document.querySelector('.showTypesOfHelp');

function showTypesOfHelp() {
  let currentProjectTypesOfHelp = document.querySelectorAll('.currentProjectTypesOfHelp');
  if (visibleStatus){
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = 'hidden';
    })

    visibleStatus = false;
  }
  else{
    currentProjectTypesOfHelp.forEach(icons => {
      icons.style.visibility = 'visible';
    })
    visibleStatus = true;
  }

  buttonShowTypesOfHelp.classList.toggle('showTypesOfHelpActive');
}


buttonShowTypesOfHelp.addEventListener('click', function() {
  showTypesOfHelp();
})

const form = document.querySelector('.form');
const formClose = document.querySelector('.formClose');

formClose.addEventListener('click', function() {
  form.classList.remove('formActive');
})

navButtonContacts.addEventListener('click', function() {
  console.log('pracuje');
  main.style.display = 'none';
  footer.style.display = 'flex';
  background.style.backgroundImage = 'url(./images/blandBackground.png)';
  background.style.setProperty('--before-bg', 'url()');
  currentProjectsPage.style.display = 'none';
  contacts.style.display = 'flex';
})

const contactInputText = document.querySelector('.contactInputText');
const contactInputPhoneNumber = document.querySelector('.contactInputPhoneNumber');

contactInputText.addEventListener('input', function() {
  validateText(this);
})

contactInputPhoneNumber.addEventListener('input', function() {
  validatePhone(this);
})


function isOnlyText(input) {
  return /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/.test(input);
}

function isPhoneNumber(input) {
  return /^\+\d{10,15}$/.test(input);
}

function validateText(input) {
  if (!isOnlyText(input.value)) {
      input.style.borderColor = "red";
  } else {
      input.style.borderColor = "green";
  }
}

function validatePhone(input) {
  if (!isPhoneNumber(input.value)) {
      input.style.borderColor = "red";
  } else {
      input.style.borderColor = "green";
  }
}
