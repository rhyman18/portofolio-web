import ViewEventFields from '../templates/viewEventFormClass';

const InputValidator = {
  /**
   * validate input fields
   * @param {object} input
   * @return {object} validation status with error message and callback if status is valid
   */
  async initSubmit(input) {
    this._input = input;
    this._numberCase = /[0-9]/;
    this._specialCase = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    this._usernameCase = /[ !"#$%&'()*+,\/:;<=>?@[\\\]^`{|}~]/;

    return await this._validateSubmit();
  },

  async initInput(fields) {
    this._fields = fields;
    this._numberCase = /[0-9]/;
    this._specialCase = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    this._usernameCase = /[ !"#$%&'()*+,\/:;<=>?@[\\\]^`{|}~]/;

    this._fields.name.addEventListener('input', () => {
      const validateName = this._validateName(this._fields.name.value);

      if (!validateName.status) {
        this._fields.name.classList = ViewEventFields.errorNameField;
      } else {
        this._fields.name.classList = ViewEventFields.defaultNameField;
      }
    });

    this._fields.username.addEventListener('input', () => {
      const validateUsername = this._validateUsername(this._fields.username.value);

      if (!validateUsername.status) {
        this._fields.username.classList = ViewEventFields.errorUsernameField;
      } else {
        this._fields.username.classList = ViewEventFields.defaultUsernameField;
      }
    });

    this._fields.message.addEventListener('input', () => {
      const validateMessage = this._validateMessage(this._fields.message.value);

      if (!validateMessage.status) {
        this._fields.message.classList = ViewEventFields.errorMessageField;
      } else {
        this._fields.message.classList = ViewEventFields.defaultMessageField;
      }
    });
  },

  async _validateSubmit() {
    const validateName = this._validateName(this._input.name);
    const validateUsername = this._validateUsername(this._input.username);
    const validateMessage = this._validateMessage(this._input.message);

    if (!validateName.status) {
      return validateName;
    } else if (!validateUsername.status) {
      return validateUsername;
    } else if (!validateMessage.status) {
      return validateMessage;
    }

    return {status: true};
  },

  _validateName(value) {
    if (value.match(this._numberCase)) {
      return {status: false, message: 'Name contains a number'};
    } else if (value.match(this._specialCase)) {
      return {status: false, message: 'Name contains a special case'};
    } else if (value.length <= 3) {
      return {status: false, message: 'Name must be at least 3 characters'};
    } else if (value.length >= 32) {
      return {status: false, message: 'Name exceeds 32 characters'};
    }

    return {status: true};
  },

  _validateUsername(value) {
    if (value.match(this._usernameCase)) {
      return {status: false, message: 'Username contains a special case'};
    } else if (value.length <= 3) {
      return {status: false, message: 'Username must be at least 3 characters'};
    } else if (value.length >= 32) {
      return {status: false, message: 'Username exceeds 32 characters'};
    }

    return {status: true};
  },

  _validateMessage(value) {
    if (value.length <= 20) {
      return {status: false, message: 'Message must be at least 20 characters'};
    } else if (value.length >= 500) {
      return {status: false, message: 'Message exceeds 500 characters'};
    }

    return {status: true};
  },
};

export default InputValidator;
