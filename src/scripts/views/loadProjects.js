import CONFIG from '../global/config';
import ApiFetch from '../data/apiFetch';
import {createSkeletonProject, createProject} from '../templates/viewProjects';

const LoadProjects = {
  init(container) {
    this._container = container;

    this._renderProjects();
  },

  async _renderProjects() {
    this._container.innerHTML = createSkeletonProject();

    const apiProjects = await ApiFetch.getProjects();
    if (apiProjects.data.length > 0) {
      this._container.innerHTML = '';
      apiProjects.data.forEach((project, i) => {
        this._container.innerHTML += createProject(project, i);

        this._renderImage(document.querySelector(`#postimg-${i}`), {
          cover: project.img,
          hover: project.img_hover,
        });
      });
    }
  },

  _renderImage(container, image) {
    const cover = `background: url('${CONFIG.BASE_IMG_URL + image.cover}') no-repeat center; background-size: cover;`;
    const hover = `background: url('${CONFIG.BASE_IMG_URL + image.hover}') no-repeat center; background-size: cover;`;

    container.style = cover;
    container.addEventListener('mouseover', () => {
      container.style = hover;
    });
    container.addEventListener('mouseout', () => {
      container.style = cover;
    });
  },
};

export default LoadProjects;
