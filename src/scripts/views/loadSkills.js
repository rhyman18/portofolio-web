import ApiFetch from '../data/apiFetch';
import ShowError from '../utils/showError';
import GLOBAL_ELEMENT from '../global/globalElement';
import {createSkeletonSkill, createSkill} from '../templates/viewSkills';
import {createPopper} from '@popperjs/core';

const LoadSkills = {
  init({basic, frontend, backend}) {
    this._skillBasic = basic;
    this._skillFrontend = frontend;
    this._skillBackend = backend;

    this._renderAllSkills();
  },

  async _renderAllSkills() {
    await Promise.all([
      this._renderSkill('basic', this._skillBasic),
      this._renderSkill('frontend', this._skillFrontend),
      this._renderSkill('backend', this._skillBackend),
    ]);
    this._addTooltipEvents();
  },

  async _renderSkill(section, container) {
    container.innerHTML = createSkeletonSkill();
    try {
      const apiBasic = await ApiFetch.getSkills(section);
      const skillsHTML = apiBasic?.data?.map((skill) => createSkill(skill)).join('');
      container.innerHTML = skillsHTML || createSkeletonSkill();
    } catch (error) {
      this._showError(`${error}. please <a onclick="window.location.reload()" class="font-semibold underline hover:no-underline cursor-pointer">reload</a> the page.`);
    }
  },

  _addTooltipEvents() {
    const skillElements = document.querySelectorAll('[data-tooltip-target]');
    skillElements.forEach((element) => {
      const tooltipId = element.getAttribute('data-tooltip-target');
      const tooltip = document.getElementById(tooltipId);
      if (!tooltip) return;

      const popperInstance = createPopper(element, tooltip, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 22],
            },
          },
        ],
      });

      const showTooltip = () => {
        tooltip.classList.remove('invisible', 'opacity-0');
        tooltip.classList.add('visible', 'opacity-100');
        popperInstance.update();
      };

      const hideTooltip = () => {
        tooltip.classList.remove('visible', 'opacity-100');
        tooltip.classList.add('invisible', 'opacity-0');
      };

      element.addEventListener('mouseenter', showTooltip);
      element.addEventListener('mouseleave', hideTooltip);

      element.addEventListener('remove', () => {
        element.removeEventListener('mouseenter', showTooltip);
        element.removeEventListener('mouseleave', hideTooltip);
      });
    });
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
