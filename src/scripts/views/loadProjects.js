import CONFIG from '../global/config';
import ApiFetch from '../data/apiFetch';
import {createSkeletonProject, createProject} from '../templates/viewProjects';

const LoadProjects = {
  async init(container) {
    this._container = container;

    await this._renderProjects();
  },

  async _renderProjects() {
    this._container.innerHTML = createSkeletonProject();

    const apiProjects = await ApiFetch.getProjects();
    if (apiProjects.data.length > 0) {
      let projectsHTML = '';
      apiProjects.data.forEach((project, i) => {
        projectsHTML += createProject(project, i);
      });

      this._container.innerHTML = projectsHTML;
      this._attachEventListeners(apiProjects.data);
    }
  },

  _attachEventListeners(projects) {
    projects.forEach((project, i) => {
      const container = document.querySelector(`#postimg-${i}`);
      this._renderImage(container, {
        cover: project.img,
        hover: project.img_hover,
      });
    });
  },

  _renderImage(container, image) {
    const coverStyle = `background: url('${CONFIG.BASE_IMG_URL + image.cover}') no-repeat center; background-size: cover;`;
    const hoverStyle = `background: url('${CONFIG.BASE_IMG_URL + image.hover}') no-repeat center;`;

    container.style = coverStyle;
    container.addEventListener('mouseover', () => {
      container.style = hoverStyle;
    });
    container.addEventListener('mouseout', () => {
      container.style = coverStyle;
    });
  },
};

export default LoadProjects;
