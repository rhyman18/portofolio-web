import ShowError from './showError';

const createDom = () => {
  const container = document.createElement('div');
  container.classList.add('hidden');
  container.setAttribute('alert-priority', '0');
  const body = document.createElement('p');
  container.appendChild(body);
  return {container, body};
};

describe('ShowError', () => {
  it('shows alert body and message when priority higher', () => {
    const {container, body} = createDom();
    ShowError.init({
      containerAlert: container,
      bodyAlert: body,
      messageAlert: 'Boom',
      alertPriority: 2,
    });

    expect(container.classList.contains('hidden')).toBe(false);
    expect(body.innerHTML).toBe('Boom');
    expect(container.getAttribute('alert-priority')).toBe('2');
  });

  it('does not override message when lower priority', () => {
    const {container, body} = createDom();
    container.setAttribute('alert-priority', '5');
    body.innerHTML = 'Existing';

    ShowError.init({
      containerAlert: container,
      bodyAlert: body,
      messageAlert: 'New',
      alertPriority: 1,
    });

    expect(body.innerHTML).toBe('Existing');
  });

  it('uses default priority when not provided', () => {
    const {container, body} = createDom();
    ShowError.init({
      containerAlert: container,
      bodyAlert: body,
      messageAlert: 'Hi',
    });
    expect(container.getAttribute('alert-priority')).toBe('0');
    expect(container.classList.contains('hidden')).toBe(false);
    // same priority means message is not overridden
    expect(body.innerHTML).toBe('');
  });
});
