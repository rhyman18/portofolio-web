import ViewEventFields from '../templates/viewEventFormClass';

const InputValidator = {
  /**
   * validate input fields
   * @param {object} input
   * @return {object} validation status with error message and callback if status is valid
   */
  async initSubmit(input) {
    this._input = input;

    this._initializeRegex();
    return await this._validateSubmit();
  },

  async initInput(fields) {
    this._fields = fields;

    this._initializeRegex();
    this._addInputListener({
      field: this._fields.name,
      validationMethod: this._validateName,
      errorClass: ViewEventFields.errorNameField,
      defaultClass: ViewEventFields.defaultNameField,
      alertField: this._fields.nameAlert,
    });
    this._addInputListener({
      field: this._fields.username,
      validationMethod: this._validateUsername,
      errorClass: ViewEventFields.errorUsernameField,
      defaultClass: ViewEventFields.defaultUsernameField,
      alertField: this._fields.usernameAlert,
    });
    this._addInputListener({
      field: this._fields.message,
      validationMethod: this._validateMessage,
      errorClass: ViewEventFields.errorMessageField,
      defaultClass: ViewEventFields.defaultMessageField,
      alertField: this._fields.messageAlert,
    });
  },

  _initializeRegex() {
    this._numberCase = /[0-9]/;
    this._specialCase = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
    this._usernameCase = /[ !"#$%&'()*+,\/:;<=>?@[\\\]^`{|}~]/;
  },

  _addInputListener({
    field,
    validationMethod,
    errorClass,
    defaultClass,
    alertField,
  }) {
    field.addEventListener('input', () => {
      const validationResult = validationMethod.call(this, field.value);

      if (!validationResult.status) {
        field.classList = errorClass;
        alertField.innerHTML = validationResult.message || '';
        alertField.classList.remove('hidden');
      } else {
        field.classList = defaultClass;
        alertField.classList.add('hidden');
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
    if (this._numberCase.test(value)) {
      return {status: false, message: 'Name contains a number'};
    } else if (this._specialCase.test(value)) {
      return {status: false, message: 'Name contains a special case'};
    } else if (value.length <= 3) {
      return {status: false, message: 'Name must be at least 3 characters'};
    } else if (value.length >= 32) {
      return {status: false, message: 'Name exceeds 32 characters'};
    }

    return {status: true};
  },

  _validateUsername(value) {
    if (this._usernameCase.test(value)) {
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
