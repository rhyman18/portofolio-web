// import ApiFetch from '../data/apiFetch';
import {createSkeletonProject} from '../templates/viewProjects';

const LoadProjects = {
  init(container) {
    this._container = container;

    this._renderProjects();
  },

  _renderProjects() {
    this._container.innerHTML = createSkeletonProject();
  },
};

export default LoadProjects;
