import {skill} from '/src/assets/data/skill';

// Skill dasar
const containerSkillDasar = document.getElementById('skill-dasar');

const skillDasar = await skill('basic');

if (skillDasar.data.length > 0) {
  document.getElementById('skeleton-box-1').style.display = 'none';
  document.getElementById('skeleton-box-2').style.display = 'none';
  document.getElementById('skeleton-box-3').style.display = 'none';
}

for (const skill of skillDasar.data) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}`;
  containerSkillDasar.appendChild(createSkill);
}

// Skill Frontend
const containerSkillFrontend = document.getElementById('skill-frontend');

const skillFrontend = await skill('frontend');

if (skillFrontend.data.length > 0) {
  document.getElementById('skeleton-box-4').style.display = 'none';
  document.getElementById('skeleton-box-5').style.display = 'none';
  document.getElementById('skeleton-box-6').style.display = 'none';
}

for (const skill of skillFrontend.data) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}`;
  containerSkillFrontend.appendChild(createSkill);
}

// Skill Backend
const containerSkillBackend = document.getElementById('skill-backend');

const skillBackend = await skill('backend');

if (skillBackend.data.length > 0) {
  document.getElementById('skeleton-box-7').style.display = 'none';
  document.getElementById('skeleton-box-8').style.display = 'none';
  document.getElementById('skeleton-box-9').style.display = 'none';
}

for (const skill of skillBackend.data) {
  const createSkill = document.createElement('a');
  createSkill.href = '#';
  createSkill.classList = 'flex flex-col gap-3 w-40 bg-primary border dark:bg-secondary-com dark:border-gray-600 dark:hover:border-main-300 rounded py-8 tracking-widest skill-box dark:shadow-main-500 hover:text-main-500 ease-in-out duration-300';
  createSkill.innerHTML = `<i class="${skill.icon} fa-3x text-main-500"></i>${skill.name}`;
  containerSkillBackend.appendChild(createSkill);
}
