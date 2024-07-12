import 'regenerator-runtime';
import ShowError from './utils/showError';
import swRegister from './utils/swRegister';
import ScrollIndicator from './utils/scrollIndicator';
import LoadMessages from './views/loadMessages';
import LoadSkills from './views/loadSkills';
import LoadProjects from './views/loadProjects';
import LoadGuestbooks from './views/loadGuestbooks';

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

  LoadGuestbooks.init({
    container: document.querySelector('#guestbook'),
    form: document.querySelector('#inputGuest'),
    fields: {
      name: document.querySelector('#name'),
      username: document.querySelector('#username'),
      platform: document.querySelector('#platform'),
      message: document.querySelector('#message'),
      button: document.querySelector('#send'),
    },
  });

  const initSwRegister = async () => {
    try {
      await swRegister();
    } catch (error) {
      ShowError.init({
        containerAlert: document.querySelector('#alert-body'),
        bodyAlert: document.querySelector('#alert-msg'),
        messageAlert: `${error}. However, this will not impact your user experience. Please disregard this message.`,
        alertPriority: 1,
      });
    }
  };

  initSwRegister();
});
