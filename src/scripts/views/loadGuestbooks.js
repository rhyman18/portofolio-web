import ApiFetch from '../data/apiFetch';
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

    this._renderGuestbooks();
    this._eventInput();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._renderSubmitButton();
      this._renderInput();
    });
  },

  async _renderGuestbooks() {
    this._container.innerHTML = emptyGuestbook();

    const apiGuestbooks = await ApiFetch.getGuestbooks();
    if (apiGuestbooks.data.length > 0) {
      this._container.innerHTML = '';
      apiGuestbooks.data.forEach((guest) => {
        this._container.innerHTML += createGuestbook(guest, this._createLinkSosmed(guest.platform));
      });
    }
  },

  async _eventInput() {
    await InputValidator.initInput(this._fields);
  },

  async _renderInput() {
    const {name, username, platform, message} = this._fields;
    const input = {
      name: name.value,
      username: username.value,
      platform: platform.value,
      message: message.value,
    };

    const validate = await InputValidator.initSubmit(input);

    if (validate.status !== false) {
      await ApiFetch.postGuestbook(validate);
      location.reload();
    } else {
      this._renderSubmitButtonDefault();
    }
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
    switch (link) {
      case 'facebook':
        return 'https://web.facebook.com/';
      case 'instagram':
        return 'https://www.instagram.com/';
      case 'twitter':
        return 'https://twitter.com/';
      case 'linkedin':
        return 'https://www.linkedin.com/in/';
      case 'tiktok':
        return 'https://www.tiktok.com/@';
      case 'github':
        return 'https://github.com/';
    }
  },
};

export default LoadGuestbooks;
