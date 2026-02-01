import ShowError from '../utils/showError';
import GLOBAL_ELEMENT from '../global/globalElement';
import {createSkeletonProject, createProject, createPagination} from '../templates/viewProjects';
import {registerAnimationTargets} from '../utils/scrollAnimation';

const LoadProjects = {
  async init(container, apiFetch) {
    this._container = container;
    this._page = 1;
    this._limit = undefined;
    this._paginationContainer = GLOBAL_ELEMENT.ProjectsPagination || document.getElementById('post-pagination');
    this._apiFetch = apiFetch || null;

    await this._renderProjects();
  },

  _renderPagination(totalPages = 1) {
    if (!this._paginationContainer) {
      this._paginationContainer = document.getElementById('post-pagination');
      if (!this._paginationContainer) return;
    }
    if (!totalPages || totalPages <= 1) {
      this._paginationContainer.innerHTML = '';
      return;
    }

    const isFirst = this._page <= 1;
    const isLast = this._page >= totalPages;

    this._paginationContainer.innerHTML = createPagination(this._page, totalPages);

    const prevBtn = document.getElementById('post-prev');
    const nextBtn = document.getElementById('post-next');
    prevBtn.disabled = isFirst;
    nextBtn.disabled = isLast;

    prevBtn.onclick = () => {
      if (this._page > 1) {
        this._page -= 1;
        this._renderProjects();
        window.location.hash = '#project';
      }
    };
    nextBtn.onclick = () => {
      const atLast = this._page >= totalPages;
      if (atLast) return;
      // Prevent rapid double-clicks from bumping the page past the end
      nextBtn.disabled = true;
      this._page += 1;
      this._renderProjects();
      window.location.hash = '#project';
    };
  },

  async _renderProjects() {
    this._container.innerHTML = createSkeletonProject();
    try {
      const ApiFetch = await this._getApiFetch();
      const apiProjects = await ApiFetch.getProjects({page: this._page});
      this._limit = apiProjects?.limit || this._limit;
      const projectsHTML = apiProjects?.data?.map((project, i) => createProject(project, i)).join('');
      this._container.innerHTML = projectsHTML || createSkeletonProject();
      registerAnimationTargets(this._container.querySelectorAll('.anim-fade-up, .anim-zoom-in, .anim-zoom-in-up, .anim-zoom-in-right'));
      this._attachEventListeners(apiProjects?.data);
      this._renderPagination(apiProjects?.totalPages);
    } catch (error) {
      this._showError(`${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`);
    }
  },

  _attachEventListeners(projects) {
    projects.forEach((project, i) => {
      const container = document.getElementById(`postimg-${i}`);
      if (container) {
        container.addEventListener('mouseover', () => {
          container.src = project.img_hover;
        });
        container.addEventListener('mouseout', () => {
          container.src = project.img;
        });
      }
    });
  },

  _showError(message) {
    ShowError.init({
      containerAlert: GLOBAL_ELEMENT.AlertBody,
      bodyAlert: GLOBAL_ELEMENT.AlertMessage,
      messageAlert: message,
      alertPriority: 3,
    });
  },

  async _getApiFetch() {
    if (this._apiFetch) return this._apiFetch;
    const module = await import('../data/apiFetch');
    this._apiFetch = module.default || module;
    return this._apiFetch;
  },
};

export default LoadProjects;
