import 'regenerator-runtime';
import ShowError from './utils/showError';
import swRegister from './utils/swRegister';
import ScrollIndicator from './utils/scrollIndicator';
import LoadMessages from './views/loadMessages';
import LoadSkills from './views/loadSkills';
import LoadProjects from './views/loadProjects';
import LoadGuestbooks from './views/loadGuestbooks';
import GLOBAL_ELEMENT from './global/globalElement';

window.addEventListener('DOMContentLoaded', () => {
  ScrollIndicator.init(GLOBAL_ELEMENT.MyBar);

  LoadMessages.init({
    headline: GLOBAL_ELEMENT.Headline,
    profile: GLOBAL_ELEMENT.Profile,
  });

  LoadSkills.init({
    basic: GLOBAL_ELEMENT.SkillBasic,
    frontend: GLOBAL_ELEMENT.SkillFrontend,
    backend: GLOBAL_ELEMENT.SkillBackend,
    tooltip: GLOBAL_ELEMENT.SkillTooltip,
  });

  LoadProjects.init(GLOBAL_ELEMENT.Projects);

  LoadGuestbooks.init({
    container: GLOBAL_ELEMENT.GuestbookContainer,
    form: GLOBAL_ELEMENT.GuestbookForm,
    fields: {
      name: GLOBAL_ELEMENT.InputName,
      username: GLOBAL_ELEMENT.InputUsername,
      platform: GLOBAL_ELEMENT.InputPlatform,
      message: GLOBAL_ELEMENT.InputMessage,
      button: GLOBAL_ELEMENT.InputButton,
      nameAlert: GLOBAL_ELEMENT.InputNameAlert,
      usernameAlert: GLOBAL_ELEMENT.InputUsernameAlert,
      messageAlert: GLOBAL_ELEMENT.InputMessageAlert,
    },
  });

  const initSwRegister = async () => {
    try {
      await swRegister();
    } catch (error) {
      ShowError.init({
        containerAlert: GLOBAL_ELEMENT.AlertBody,
        bodyAlert: GLOBAL_ELEMENT.AlertMessage,
        messageAlert: `${error}. However, this will not impact your user experience. Please disregard this message.`,
        alertPriority: 1,
      });
    }
  };

  initSwRegister();
});
