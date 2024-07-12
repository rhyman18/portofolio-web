import CONFIG from '../global/config';
import ApiFetch from '../data/apiFetch';
import ShowError from '../utils/showError';
import {createSkeletonProject, createProject} from '../templates/viewProjects';

const LoadProjects = {
  async init(container) {
    this._container = container;

    await this._renderProjects();
  },

  async _renderProjects() {
    try {
      const apiProjects = await ApiFetch.getProjects();
      const projectsHTML = apiProjects?.data?.map((project, i) => createProject(project, i, CONFIG.BASE_IMG_URL)).join('');
      this._container.innerHTML = projectsHTML || createSkeletonProject();
      this._attachEventListeners(apiProjects?.data);
    } catch (error) {
      this._showError(`${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`);
    }
  },

  _attachEventListeners(projects) {
    projects.forEach((project, i) => {
      const container = document.querySelector(`#postimg-${i}`);
      if (container) {
        container.addEventListener('mouseover', () => {
          container.src = CONFIG.BASE_IMG_URL + project.img_hover;
        });
        container.addEventListener('mouseout', () => {
          container.src = CONFIG.BASE_IMG_URL + project.img;
        });
      }
    });
  },

  _showError(message) {
    ShowError.init({
      containerAlert: document.querySelector('#alert-body'),
      bodyAlert: document.querySelector('#alert-msg'),
      messageAlert: message,
      alertPriority: 3,
    });
  },
};

export default LoadProjects;
