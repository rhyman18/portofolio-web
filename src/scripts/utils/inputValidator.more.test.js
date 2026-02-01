import InputValidator from './inputValidator';

describe('InputValidator edge cases', () => {
  it('returns name error when number present', async () => {
    const result = await InputValidator.initSubmit({name: 'A1', username: 'user', message: 'this is a valid message'});
    expect(result.message).toContain('number');
  });

  it('returns username error when too long', async () => {
    const username = 'a'.repeat(33);
    const result = await InputValidator.initSubmit({name: 'Alice', username, message: 'this is a valid message'});
    expect(result.message).toContain('exceeds 32');
  });

  it('returns message error when too short', async () => {
    const result = await InputValidator.initSubmit({name: 'Alice', username: 'alice', message: 'short msg'});
    expect(result.message).toContain('at least 20');
  });

  it('returns message error when too long', async () => {
    const result = await InputValidator.initSubmit({name: 'Alice', username: 'alice', message: 'x'.repeat(501)});
    expect(result.message).toContain('exceeds 500');
  });

  it('rejects name with special characters', async () => {
    const result = await InputValidator.initSubmit({name: 'Al!ce', username: 'alice', message: 'this is a valid message content'});
    expect(result.message).toContain('special case');
  });

  it('rejects overly long name', async () => {
    const longName = 'A'.repeat(33);
    const result = await InputValidator.initSubmit({name: longName, username: 'alice', message: 'this is a valid message content'});
    expect(result.message).toContain('exceeds 32');
  });

  it('rejects username with special characters', async () => {
    const result = await InputValidator.initSubmit({name: 'Alice', username: 'ali#ce', message: 'this is a valid message content'});
    expect(result.message).toContain('special case');
  });

  it('rejects username that is too short', async () => {
    const result = await InputValidator.initSubmit({name: 'Alice', username: 'abc', message: 'this is a valid message content'});
    expect(result.message).toContain('at least 3 characters');
  });

  it('uses empty alert message when validator omits message', () => {
    jest.useFakeTimers();
    const field = document.createElement('input');
    const alertField = document.createElement('div');
    InputValidator._addInputListener.call(InputValidator, {
      field,
      validationMethod: () => ({status: false}),
      errorClass: 'error',
      defaultClass: 'default',
      alertField,
    });

    field.value = 'test';
    field.dispatchEvent(new Event('input'));
    jest.runAllTimers();

    expect(alertField.innerHTML).toBe('');
    jest.useRealTimers();
  });
});
