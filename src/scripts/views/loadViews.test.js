import LoadMessages from './loadMessages';
import LoadSkills from './loadSkills';
import LoadProjects from './loadProjects';
import LoadGuestbooks from './loadGuestbooks';
import MESSAGES from '../data/dataMessages';
import ApiFetch from '../data/apiFetch';
import InputValidator from '../utils/inputValidator';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getSkills: jest.fn(),
    getProjects: jest.fn(),
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
jest.mock('flowbite', () => ({
  Popover: jest.fn(),
}));

const flushPromises = () => Promise.resolve();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoadMessages', () => {
  it('renders messages to DOM', () => {
    const headline = document.createElement('h1');
    const profile = document.createElement('p');

    LoadMessages.init({headline, profile});

    expect(headline.innerText).toBe(MESSAGES.HEADLINE);
    expect(profile.innerText).toBe(MESSAGES.PROFILE);
  });
});

describe('LoadSkills', () => {
  it('renders skills and popovers', async () => {
    ApiFetch.getSkills.mockResolvedValueOnce({
      data: [{id: 1, name: 'JS', icon: 'fa-js', cert_link: 'link', cert_img: 'img', cert_desc: 'desc'}],
    });

    const containers = {
      basic: document.createElement('div'),
      frontend: document.createElement('div'),
      backend: document.createElement('div'),
    };
    const popover = document.createElement('div');
    Object.values(containers).forEach((el) => document.body.appendChild(el));
    document.body.appendChild(popover);

    await LoadSkills.init({...containers, popover});
    await flushPromises();

    expect(containers.basic.innerHTML).toContain('JS');
    expect(popover.innerHTML).toContain('popover-target-1');
  });
});

describe('LoadProjects', () => {
  it('renders projects list', async () => {
    ApiFetch.getProjects.mockResolvedValueOnce({
      data: [{
        id: 1,
        title: 'Project One',
        img: 'img',
        img_hover: 'img2',
        tags: ['tag'],
        desc: 'desc',
        updated_at: '2024-01-01',
      }],
      totalPages: 1,
      limit: 5,
    });

    const container = document.createElement('div');
    document.body.appendChild(container);

    await LoadProjects.init(container);
    await flushPromises();

    expect(container.innerHTML).toContain('Project One');
  });
});

describe('LoadGuestbooks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    ApiFetch.getGuestbooks.mockResolvedValue({data: [{platform: 'github', name: 'Tester', username: 'me', message: 'Hello world message content', updated_at: '2024-01-01'}]});
    ApiFetch.postGuestbook.mockResolvedValue();
    InputValidator.initInput.mockResolvedValue();
    InputValidator.initSubmit.mockResolvedValue({status: true});
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {reload: jest.fn()},
    });
    Object.defineProperty(global, 'location', {
      writable: true,
      value: window.location,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders guestbook items and submits form', async () => {
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

    document.body.appendChild(container);
    document.body.appendChild(form);

    LoadGuestbooks.init({container, form, fields});
    await flushPromises();
    expect(container.innerHTML).toContain('Tester');

    fields.name.value = 'Tester';
    fields.username.value = 'tester';
    fields.platform.value = 'github';
    fields.message.value = 'A message longer than twenty characters';

    form.dispatchEvent(new Event('submit'));
    await flushPromises();
    jest.runAllTimers();

    expect(ApiFetch.postGuestbook).toHaveBeenCalled();
    jest.advanceTimersByTime(6000);
    await flushPromises();
  });
});
