import ShowError from './showError';

describe('ShowError branches', () => {
  it('respects existing higher alert-priority and does not override message', () => {
    const container = document.createElement('div');
    container.setAttribute('alert-priority', '5');
    const body = document.createElement('p');
    body.innerHTML = 'old message';

    ShowError.init({
      containerAlert: container,
      bodyAlert: body,
      messageAlert: 'new message',
      alertPriority: 1,
    });

    expect(body.innerHTML).toBe('old message');
    expect(container.classList.contains('hidden')).toBe(false);
  });
});

