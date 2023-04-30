import Profile from './assets/images/profile.jpg';
import {skillDasar, skillFrontend, skillBackend} from './assets/data/skill';
import {project} from './assets/data/project';
import faviconApple from './assets/favicon/apple-touch-icon.png';
import favicon32 from './assets/favicon/favicon-32x32.png';
import favicon16 from './assets/favicon/favicon-16x16.png';

// Add logo favicon
document.querySelector('link[sizes="180x180"]').href = faviconApple;
document.querySelector('link[sizes="32x32"]').href = favicon32;
document.querySelector('link[sizes="16x16"]').href = favicon16;

// Foto Profile di About
document.getElementById('profile').src = Profile;

// Skill Saya
const containerSkillDasar = document.getElementById('skill-dasar');
for (const skill of skillDasar) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.nama}`;
  containerSkillDasar.appendChild(createSkill);
}

// Skill Frontend
const containerSkillFrontend = document.getElementById('skill-frontend');
for (const skill of skillFrontend) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.nama}`;
  containerSkillFrontend.appendChild(createSkill);
}

// Skill Backend
const containerSkillBackend = document.getElementById('skill-backend');
for (const skill of skillBackend) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.nama}`;
  containerSkillBackend.appendChild(createSkill);
}

// Post Project
const containerProject = document.getElementById('post');
let j = 1;
project.forEach(function(project, i) {
  const createProject = document.createElement('a');
  let tags = '';
  for (const item of project.tags) {
    tags += `<span class="bg-main-500 py-1 md:py-1.5 px-4 md:px-6">${item}</span>`;
  };
  createProject.href = project.url;
  createProject.target = '_blank';
  createProject.classList = (i % 2 === 0) ? 'left-bg md:border-e-2 border-main-500' : 'right-bg md:border-s-2 border-main-500';
  createProject.innerHTML = `
  <article data-aos="zoom-in-${(i % 2 === 0) ? 'right' : 'left'}" data-aos-delay="${j * 100}" class="flex flex-col ${(i % 2 === 0) ? 'md:me-4 lg:me-8 xl:flex-row xl:pe-6' : 'xl:flex-row-reverse md:ms-4 lg:ms-8 xl:ps-6'} text-left items-stretch xl:gap-5 content-box border dark:border-gray-600 dark:hover:border-main-300 rounded dark:shadow-main-500 bg-primary dark:bg-secondary-com">
    <div class="xl:basis-1/3 h-60 md:h-96 xl:h-auto flex justify-center items-center slide-img" id="postimg${i}">
      <a href="${project.url}" target="_blank">Live demo</a>
    </div>
    <div class="basis-2/3 font-medium xl:my-4 p-6 xl:p-0">
      <div class="text-lg md:text-xl font-semibold tracking-widest leading-tight">${project.title}</div>
      <div class="uppercase text-xs tracking-widest text-secondary-font my-4 flex flex-wrap gap-1 md:gap-3"><a href="${project.repo}" class="bg-main-gray hover:bg-main-500 py-1 md:py-1.5 px-4 md:px-6" target="_blank">REPO (GITHUB)</a>${tags}</div>
      <p class="leading-5 md:leading-7 text-primary-desc dark:text-secondary-desc text-justify mb-4 elipsis">${project.desc}</p>
      <p class="text-main-gray text-xs uppercase tracking-widest">${project.date}</p>
    </div>
  </article>
  `;
  j = j + 2;
  containerProject.appendChild(createProject);
  const img = document.getElementById(`postimg${i}`);
  img.style = `background: url('${project.img}') no-repeat center; background-size: cover;`;
  img.addEventListener('mouseover', function() {
    img.style = `background: url('${project.imgHover}') no-repeat center; background-size: cover;`;
  });
  img.addEventListener('mouseout', function() {
    img.style = `background: url('${project.img}') no-repeat center; background-size: cover;`;
  });
});

// Splash screen
const intro = document.getElementById('intro');
const logoParts = document.querySelectorAll('.logo');
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    logoParts.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (i + 1) * 400);
    });
    setTimeout(() => {
      logoParts.forEach((span, i) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (i + 1) * 50);
      });
    }, 2000);
    setTimeout(() => {
      intro.style.top = '-100vh';
    }, 2300);
  });
});

// When the user scrolls the page, execute scroll indicator
window.onscroll = function() {
  scrollIndicator();
};

/** Function to indicate scroll progress */
function scrollIndicator() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('myBar').style.width = scrolled + '%';
}
