import InputValidator from './inputValidator';
import ViewEventFields from '../templates/viewEventFormClass';

jest.useFakeTimers();

const createField = () => {
  const input = document.createElement('input');
  const alert = document.createElement('span');
  alert.classList.add('hidden');
  return {input, alert};
};

const createFields = () => {
  const name = createField();
  const username = createField();
  const message = createField();
  const platform = document.createElement('select');
  const button = document.createElement('button');
  const toastSuccess = document.createElement('div');
  const toastFailed = document.createElement('div');
  return {
    name: name.input,
    username: username.input,
    platform,
    message: message.input,
    button,
    nameAlert: name.alert,
    usernameAlert: username.alert,
    messageAlert: message.alert,
    toastSuccess,
    toastFailed,
  };
};

describe('InputValidator', () => {
  it('validates submit inputs correctly', async () => {
    let result = await InputValidator.initSubmit({name: 'AB', username: 'user', platform: 'twitter', message: 'short'});
    expect(result.status).toBe(false);
    expect(result.message).toBeDefined();

    result = await InputValidator.initSubmit({name: 'Alice', username: 'user', platform: 'twitter', message: 'this is a valid message content'});
    expect(result.status).toBe(true);
  });

  it('adds listeners and toggles classes on input', async () => {
    const fields = createFields();
    await InputValidator.initInput(fields);

    fields.name.value = '12';
    fields.name.dispatchEvent(new Event('input'));
    jest.runAllTimers();
    expect(fields.name.classList.value).toBe(ViewEventFields.errorNameField);
    expect(fields.nameAlert.classList.contains('hidden')).toBe(false);

    fields.name.value = 'Valid Name';
    fields.name.dispatchEvent(new Event('input'));
    jest.runAllTimers();
    expect(fields.name.classList.value).toBe(ViewEventFields.defaultNameField);
    expect(fields.nameAlert.classList.contains('hidden')).toBe(true);
  });
});
