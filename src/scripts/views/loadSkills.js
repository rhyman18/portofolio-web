import ApiFetch from '../data/apiFetch';
import ShowError from '../utils/showError';
import {createSkeletonSkill, createSkill} from '../templates/viewSkills';

const LoadSkills = {
  init({basic, frontend, backend}) {
    this._skillBasic = basic;
    this._skillFrontend = frontend;
    this._skillBackend = backend;

    this._renderAllSkills();
  },

  _renderAllSkills() {
    this._renderSkill('basic', this._skillBasic);
    this._renderSkill('frontend', this._skillFrontend);
    this._renderSkill('backend', this._skillBackend);
  },

  async _renderSkill(section, container) {
    container.innerHTML = createSkeletonSkill();

    try {
      const apiBasic = await ApiFetch.getSkills(section);
      if (apiBasic?.data?.length > 0) {
        const skillsHTML = apiBasic.data.map((skill) => createSkill(skill)).join('');
        container.innerHTML = skillsHTML;
      } else {
        throw new Error('An error occurred while loading the skills data');
      }
    } catch (error) {
      ShowError.init({
        containerAlert: document.querySelector('#alert-body'),
        bodyAlert: document.querySelector('#alert-msg'),
        messageAlert: `${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`,
        alertPriority: 2,
      });
    }
  },
};

export default LoadSkills;
