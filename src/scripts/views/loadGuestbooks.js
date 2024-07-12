import ApiFetch from '../data/apiFetch';
import ShowError from '../utils/showError';
import InputValidator from '../utils/inputValidator';
import ViewEventFields from '../templates/viewEventFormClass';
import {emptyGuestbook, createGuestbook} from '../templates/viewGuestbooks';

/**
 * {object} fields input form
 * name: {DOM} name fields
 * username: {DOM} username fields
 * platform: {DOM} platform fields
 * message: {DOM} message fields
 * button: {DOM} button fields
 */
const LoadGuestbooks = {
  init({container, form, fields}) {
    this._container = container;
    this._form = form;
    this._fields = fields;

    this._bindEvents();
    this._renderGuestbooks();
  },

  _bindEvents() {
    this._form.addEventListener('submit', async (e) => {
      e.preventDefault();
      this._renderSubmitButton();

      const input = this._getInputValues();
      const validatedInput = await InputValidator.initSubmit(input);
      if (validatedInput.status !== false) {
        await ApiFetch.postGuestbook(validatedInput);
        location.reload();
      } else {
        this._renderSubmitButtonDefault();
      }
    });
  },

  async _renderGuestbooks() {
    this._container.innerHTML = emptyGuestbook();

    try {
      const apiGuestbooks = await ApiFetch.getGuestbooks();
      if (apiGuestbooks?.data?.length > 0) {
        let html = '';
        apiGuestbooks.data.forEach((guest) => {
          html += createGuestbook(guest, this._createLinkSosmed(guest.platform));
        });
        this._container.innerHTML = html;
      } else {
        throw new Error('An error occurred while loading the guestbook data');
      }
    } catch (error) {
      ShowError.init({
        containerAlert: document.querySelector('#alert-body'),
        bodyAlert: document.querySelector('#alert-msg'),
        messageAlert: `${error}. However, this will not impact your user experience. Please disregard this message.`,
        alertPriority: 2,
      });
    }
  },

  _getInputValues() {
    const {name, username, platform, message} = this._fields;
    return {
      name: name.value,
      username: username.value,
      platform: platform.value,
      message: message.value,
    };
  },

  _renderSubmitButton() {
    this._fields.button.disabled = true;
    this._fields.button.classList = ViewEventFields.errorButtonClass;
    this._fields.button.innerHTML = ViewEventFields.errorButtonInnerHTML;
  },

  _renderSubmitButtonDefault() {
    this._fields.button.disabled = false;
    this._fields.button.classList = ViewEventFields.defaultButtonClass;
    this._fields.button.innerHTML = ViewEventFields.defaultButtonInnerHTML;
  },

  _createLinkSosmed(link) {
    const linkMap = {
      facebook: 'https://web.facebook.com/',
      instagram: 'https://www.instagram.com/',
      twitter: 'https://twitter.com/',
      linkedin: 'https://www.linkedin.com/in/',
      tiktok: 'https://www.tiktok.com/@',
      github: 'https://github.com/',
    };
    return linkMap[link] || '';
  },
};

export default LoadGuestbooks;
