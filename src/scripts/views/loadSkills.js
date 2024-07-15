import ApiFetch from '../data/apiFetch';
import ShowError from '../utils/showError';
import GLOBAL_ELEMENT from '../global/globalElement';
import {createSkeletonSkill, createSkill, createPopover} from '../templates/viewSkills';
import {Popover} from 'flowbite';

const LoadSkills = {
  init({basic, frontend, backend, popover}) {
    this._skillContainers = {basic, frontend, backend};
    this._skillPopover = popover;

    this._renderAllSkills();
  },

  async _renderAllSkills() {
    try {
      await Promise.all(Object.entries(this._skillContainers).map(([section, container]) => this._renderSkill(section, container)));
      this._addPopoverEvents();
    } catch (error) {
      this._handleError(error);
    }
  },

  async _renderSkill(section, container) {
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
};

export default LoadSkills;
