import ApiFetch from '../data/apiFetch';
import InputValidator from '../utils/inputValidator';
import GLOBAL_ELEMENT from '../global/globalElement';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getGuestbooks: jest.fn(),
    postGuestbook: jest.fn(),
  },
}));

jest.mock('../utils/inputValidator', () => ({
  __esModule: true,
  default: {
    initInput: jest.fn(),
    initSubmit: jest.fn(),
  },
}));

const buildDom = () => {
  const container = document.createElement('div');
  const form = document.createElement('form');
  const fields = {
    name: document.createElement('input'),
    username: document.createElement('input'),
    platform: document.createElement('select'),
    message: document.createElement('textarea'),
    button: document.createElement('button'),
    nameAlert: document.createElement('div'),
    usernameAlert: document.createElement('div'),
    messageAlert: document.createElement('div'),
    toastSuccess: document.createElement('div'),
    toastFailed: document.createElement('div'),
  };
  Object.values(fields).forEach((el) => {
    if (el.classList) el.classList.add('hidden');
  });
  document.body.append(container, form);
  return {container, form, fields};
};

describe('LoadGuestbooks branches', () => {
  let LoadGuestbooks;
  const originalLocation = window.location;
  const flush = async () => {
    await Promise.resolve();
    await Promise.resolve();
  };

  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...originalLocation,
        reload: jest.fn(),
      },
    });
    document.body.innerHTML = `
      <div id="alert-body"></div>
      <div id="alert-msg"></div>
    `;
    GLOBAL_ELEMENT.AlertBody = document.getElementById('alert-body');
    GLOBAL_ELEMENT.AlertMessage = document.getElementById('alert-msg');
    LoadGuestbooks = require('./loadGuestbooks').default;
  });

  afterEach(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'location', {configurable: true, value: originalLocation});
    jest.clearAllMocks();
  });

  it('shows error when fetching guestbooks fails', async () => {
    const {container, form, fields} = buildDom();
    ApiFetch.getGuestbooks.mockRejectedValueOnce(new Error('fail'));

    await LoadGuestbooks.init({container, form, fields});
    jest.runAllTimers();

    expect(container.innerHTML).toContain('Belum ada pengunjung');
  });

  it('handles invalid submit and shows failed toast', async () => {
    const {container, form, fields} = buildDom();
    ApiFetch.getGuestbooks.mockResolvedValue({data: []});
    InputValidator.initSubmit.mockResolvedValueOnce({status: false, message: 'invalid'});
    InputValidator.initInput.mockResolvedValueOnce();

    await LoadGuestbooks.init({container, form, fields});
    await LoadGuestbooks._handleSubmit(new Event('submit'));
    await flush();
    jest.advanceTimersByTime(1000);

    expect(fields.toastFailed.classList.contains('hidden')).toBe(false);
  });

  it('shows success toast and triggers reload on submit success', async () => {
    const {container, form, fields} = buildDom();
    ApiFetch.getGuestbooks.mockResolvedValue({data: []});
    InputValidator.initSubmit.mockResolvedValue({status: true});
    InputValidator.initInput.mockResolvedValue();
    ApiFetch.postGuestbook.mockResolvedValue();
    const mockLocation = {reload: jest.fn()};
    Object.defineProperty(window, 'location', {configurable: true, value: mockLocation});
    Object.defineProperty(global, 'location', {configurable: true, value: mockLocation});

    await LoadGuestbooks.init({container, form, fields});
    await LoadGuestbooks._handleSubmit(new Event('submit'));
    await flush();
    jest.advanceTimersByTime(6000);
    await flush();

    expect(window.location.reload).toHaveBeenCalled();
  });

  it('toast opacity class toggles while showing/hiding', async () => {
    const {container, form, fields} = buildDom();
    ApiFetch.getGuestbooks.mockResolvedValue({data: []});
    InputValidator.initSubmit.mockResolvedValue({status: false});
    InputValidator.initInput.mockResolvedValue();

    await LoadGuestbooks.init({container, form, fields});
    await LoadGuestbooks._handleSubmit(new Event('submit'));
    await flush();
    jest.advanceTimersByTime(400); // after opacity timer
    expect(fields.toastFailed.classList.contains('opacity-100')).toBe(true);

    jest.advanceTimersByTime(3000);
    jest.advanceTimersByTime(6000);
    expect(fields.toastFailed.classList.contains('opacity-100')).toBe(false);
    expect(fields.toastFailed.classList.contains('hidden')).toBe(true);
    expect(fields.toastFailed.classList.contains('flex')).toBe(false);
  });

  it('renders pagination and navigates pages', async () => {
    const {container, form, fields} = buildDom();
    const pagination = document.createElement('div');
    pagination.id = 'guestbook-pagination';
    document.body.appendChild(pagination);

    ApiFetch.getGuestbooks.mockImplementation(({page, limit}) => Promise.resolve({
      data: [{platform: 'github', name: `Tester ${page}`, username: 'me', message: 'Hello world message content', updated_at: '2024-01-01'}],
      totalPages: 3,
      limit: limit || 2,
      page,
    }));
    InputValidator.initInput.mockResolvedValue();

    await LoadGuestbooks.init({container, form, fields, pagination});
    await flush();

    expect(pagination.innerHTML).toContain('Page 1 / 3');

    const nextBtn = pagination.querySelector('#guest-next');
    nextBtn.click();
    await flush();
    expect(ApiFetch.getGuestbooks).toHaveBeenLastCalledWith({page: 2, limit: 2});

    const prevBtn = pagination.querySelector('#guest-prev');
    prevBtn.click();
    await flush();
    expect(ApiFetch.getGuestbooks).toHaveBeenLastCalledWith({page: 1, limit: 2});
  });

  it('createLinkSosmed returns empty string for unknown platform', () => {
    const mod = require('./loadGuestbooks').default;
    expect(mod._createLinkSosmed('unknown')).toBe('');
  });

  it('handles submit error and resets button/ toast after timeouts', async () => {
    const {container, form, fields} = buildDom();
    ApiFetch.getGuestbooks.mockResolvedValue({data: []});
    InputValidator.initInput.mockResolvedValue();
    InputValidator.initSubmit.mockImplementation(() => {
      throw new Error('boom');
    });
    ApiFetch.postGuestbook.mockResolvedValue();

    await LoadGuestbooks.init({container, form, fields});
    await LoadGuestbooks._handleSubmit(new Event('submit'));
    await flush();

    // after 3s button should reset
    jest.advanceTimersByTime(3000);
    expect(fields.button.disabled).toBe(false);

    // after 6s failed toast hides again
    jest.advanceTimersByTime(3000);
    expect(fields.toastFailed.classList.contains('hidden')).toBe(true);
    expect(fields.toastFailed.classList.contains('flex')).toBe(false);
    expect(fields.toastFailed.classList.contains('opacity-100')).toBe(false);
  });

  it('defaults toast arguments to success true', () => {
    const {fields} = buildDom();
    const mod = require('./loadGuestbooks').default;
    mod._fields = fields;
    mod._renderToast();
    expect(fields.toastSuccess.classList.contains('hidden')).toBe(false);
  });

  it('ignores toast update when status is unknown', () => {
    const {fields} = buildDom();
    const mod = require('./loadGuestbooks').default;
    mod._fields = fields;
    mod._renderToast('other', true);
    expect(fields.toastSuccess.classList.contains('hidden')).toBe(true);
    expect(fields.toastFailed.classList.contains('hidden')).toBe(true);
  });

  it('returns cached api fetch without import', async () => {
    const mod = require('./loadGuestbooks').default;
    const sentinel = {};
    mod._apiFetch = sentinel;
    const result = await mod._getApiFetch();
    expect(result).toBe(sentinel);
  });

  it('falls back to module export when default is missing', async () => {
    jest.resetModules();
    jest.doMock('../data/apiFetch', () => ({__esModule: true, default: undefined, getGuestbooks: jest.fn(), postGuestbook: jest.fn()}));
    await jest.isolateModulesAsync(async () => {
      const mod = require('./loadGuestbooks').default;
      mod._apiFetch = null;
      const result = await mod._getApiFetch();
      expect(result.getGuestbooks).toBeDefined();
    });
  });
});
