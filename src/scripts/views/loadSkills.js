import {createSkeletonSkill} from '../templates/viewSkills';

const LoadSkills = {
  init({basic, frontend, backend}) {
    this._skillBasic = basic;
    this._skillFrontend = frontend;
    this._skillBackend = backend;

    this._renderSkills();
  },

  _renderSkills() {
    this._skillBasic.innerHTML = createSkeletonSkill();
    this._skillFrontend.innerHTML = createSkeletonSkill();
    this._skillBackend.innerHTML = createSkeletonSkill();
  },
};

export default LoadSkills;
