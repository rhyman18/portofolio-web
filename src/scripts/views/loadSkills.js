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
    try {
      const apiBasic = await ApiFetch.getSkills(section);
      const skillsHTML = apiBasic?.data?.map((skill) => createSkill(skill)).join('');
      container.innerHTML = skillsHTML || createSkeletonSkill();
    } catch (error) {
      this._showError(`${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`);
    }
  },

  _showError(message) {
    ShowError.init({
      containerAlert: document.querySelector('#alert-body'),
      bodyAlert: document.querySelector('#alert-msg'),
      messageAlert: message,
      alertPriority: 2,
    });
  },
};

export default LoadSkills;
