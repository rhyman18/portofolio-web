import ShowError from '../utils/showError';
import GLOBAL_ELEMENT from '../global/globalElement';
import {createSkeletonSkill, createSkill, createPopover} from '../templates/viewSkills';

const LoadSkills = {
  async init({basic, frontend, backend, popover, apiFetch}) {
    this._skillContainers = {basic, frontend, backend};
    this._skillPopover = popover;
    this._apiFetch = apiFetch || null;

    await this._renderAllSkills();
  },

  async _renderAllSkills() {
    try {
      const ApiFetch = await this._getApiFetch();
      await Promise.all(Object.entries(this._skillContainers)
          .map(([section, container]) => this._renderSkill(ApiFetch, section, container)));
      this._addPopoverEvents();
    } catch (error) {
      this._handleError(error);
    }
  },

  async _renderSkill(ApiFetch, section, container) {
    try {
      container.innerHTML = createSkeletonSkill();
      const apiData = await ApiFetch.getSkills(section);
      const skillsHTML = apiData?.data?.map(createSkill).join('') || createSkeletonSkill();
      container.innerHTML = skillsHTML;
      this._renderPopover(apiData?.data);
    } catch (error) {
      this._handleError(error);
    }
  },

  _renderPopover(skills = []) {
    const popoverHTML = skills
        .filter((skill) => skill.cert_link)
        .map(createPopover)
        .join('');
    this._skillPopover.insertAdjacentHTML('beforeend', popoverHTML);
  },

  _addPopoverEvents() {
    import('flowbite').then(({Popover}) => {
      document.querySelectorAll('[data-popover-target]').forEach((element) => {
        const popoverId = element.getAttribute('data-popover-target');
        const popoverBody = document.getElementById(popoverId);
        if (!popoverBody) return;

        const options = {
          placement: 'top',
          triggerType: 'hover',
          offset: 10,
        };

        const instanceOptions = {
          id: popoverId,
          override: true,
        };

        new Popover(popoverBody, element, options, instanceOptions);
      });
    }).catch(() => {});
  },

  _handleError(error) {
    const errorMessage = `${error}. Please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`;
    this._showError(errorMessage);
  },

  _showError(message) {
    ShowError.init({
      containerAlert: GLOBAL_ELEMENT.AlertBody,
      bodyAlert: GLOBAL_ELEMENT.AlertMessage,
      messageAlert: message,
      alertPriority: 2,
    });
  },

  async _getApiFetch() {
    if (this._apiFetch) return this._apiFetch;
    const module = await import('../data/apiFetch');
    this._apiFetch = module.default || module;
    return this._apiFetch;
  },
};

export default LoadSkills;
