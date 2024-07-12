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
    this._initInputValidation();
  },

  async _renderGuestbooks() {
    try {
      const apiGuestbooks = await ApiFetch.getGuestbooks();
      const html = apiGuestbooks?.data?.map((guest) => createGuestbook(guest, this._createLinkSosmed(guest.platform))).join('');
      this._container.innerHTML = html || emptyGuestbook();
    } catch (error) {
      this._showError(`${error}. However, this will not impact your user experience. Please disregard this message.`);
    }
  },

  async _initInputValidation() {
    await InputValidator.initInput(this._fields);
  },

  _bindEvents() {
    this._form.addEventListener('submit', this._handleSubmit.bind(this));
  },

  async _handleSubmit(e) {
    e.preventDefault();
    this._renderSubmitButton();

    try {
      const input = this._getInputValues();
      const validatedInput = await InputValidator.initSubmit(input);

      if (validatedInput.status) {
        const formData = this._convertInputValues();
        await ApiFetch.postGuestbook(formData);
        location.reload();
      } else {
        this._renderSubmitButtonDefault();
      }
    } catch (error) {
      this._showError(`${error}. Please try again later.`);
      this._renderSubmitButtonDefault();
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

  _convertInputValues() {
    const {name, username, platform, message} = this._fields;
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('username', username.value);
    formData.append('platform', platform.value);
    formData.append('message', message.value);
    return formData;
  },

  _renderSubmitButton() {
    this._setButtonProperties(ViewEventFields.errorButtonClass, ViewEventFields.errorButtonInnerHTML, true);
  },

  _renderSubmitButtonDefault() {
    setTimeout(() => {
      this._setButtonProperties(ViewEventFields.defaultButtonClass, ViewEventFields.defaultButtonInnerHTML, false);
    }, 3000);
  },

  _setButtonProperties(className, innerHTML, disabled) {
    const {button} = this._fields;
    button.disabled = disabled;
    button.classList = className;
    button.innerHTML = innerHTML;
  },

  _showError(message) {
    ShowError.init({
      containerAlert: document.querySelector('#alert-body'),
      bodyAlert: document.querySelector('#alert-msg'),
      messageAlert: message,
      alertPriority: 2,
    });
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
