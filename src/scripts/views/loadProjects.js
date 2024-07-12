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
    this._container.innerHTML = createSkeletonProject();

    try {
      const apiProjects = await ApiFetch.getProjects();
      if (apiProjects?.data?.length > 0) {
        const projectsHTML = apiProjects.data.map((project, i) =>
          createProject(project, i, CONFIG.BASE_IMG_URL),
        ).join('');

        this._container.innerHTML = projectsHTML;
        this._attachEventListeners(apiProjects.data);
      }
    } catch (error) {
      ShowError.init({
        containerAlert: document.querySelector('#alert-body'),
        bodyAlert: document.querySelector('#alert-msg'),
        messageAlert: `${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`,
        alertPriority: 3,
      });
    }
  },

  _attachEventListeners(projects) {
    projects.forEach((project, i) => {
      const container = document.querySelector(`#postimg-${i}`);
      if (container) {
        container.addEventListener('mouseover', () => {
          container.src = CONFIG.BASE_IMG_URL + project.hover;
        });
        container.addEventListener('mouseout', () => {
          container.src = CONFIG.BASE_IMG_URL + project.cover;
        });
      }
    });
  },
};

export default LoadProjects;
