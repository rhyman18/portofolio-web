import ApiFetch from '../data/apiFetch';
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

    const apiBasic = await ApiFetch.getSkills(section);
    if (apiBasic.data.length > 0) {
      container.innerHTML = '';
      apiBasic.data.forEach((skill) => {
        container.innerHTML += createSkill(skill);
      });
    }
  },
};

export default LoadSkills;
