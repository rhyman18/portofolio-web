import 'regenerator-runtime';
import ScrollIndicator from './utils/scrollIndicator';
import LoadMessages from './views/loadMessages';
import LoadSkills from './views/loadSkills';
import LoadProjects from './views/loadProjects';

window.addEventListener('DOMContentLoaded', () => {
  ScrollIndicator.init(document.querySelector('#myBar'));

  LoadMessages.init({
    headline: document.querySelector('#headline-pesan'),
    profile: document.querySelector('#profile-pesan'),
  });

  LoadSkills.init({
    basic: document.querySelector('#skill-dasar'),
    frontend: document.querySelector('#skill-frontend'),
    backend: document.querySelector('#skill-backend'),
  });

  LoadProjects.init(document.querySelector('#post'));
});
