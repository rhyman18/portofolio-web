import LoadSkills from './loadSkills';
import ApiFetch from '../data/apiFetch';
import GLOBAL_ELEMENT from '../global/globalElement';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getSkills: jest.fn(),
  },
}));

jest.mock('flowbite', () => ({Popover: jest.fn()}));

describe('LoadSkills branches', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="skill-dasar"></div>
      <div id="skill-frontend"></div>
      <div id="skill-backend"></div>
      <div id="popover-container"></div>
      <div id="alert-body"></div>
      <div id="alert-msg"></div>
    `;
    GLOBAL_ELEMENT.SkillBasic = document.getElementById('skill-dasar');
    GLOBAL_ELEMENT.SkillFrontend = document.getElementById('skill-frontend');
    GLOBAL_ELEMENT.SkillBackend = document.getElementById('skill-backend');
    GLOBAL_ELEMENT.SkillPopover = document.getElementById('popover-container');
    GLOBAL_ELEMENT.AlertBody = document.getElementById('alert-body');
    GLOBAL_ELEMENT.AlertMessage = document.getElementById('alert-msg');
    jest.clearAllMocks();
  });

  it('shows skeleton when api returns empty', async () => {
    ApiFetch.getSkills.mockResolvedValue({data: []});
    await LoadSkills.init({
      basic: GLOBAL_ELEMENT.SkillBasic,
      frontend: GLOBAL_ELEMENT.SkillFrontend,
      backend: GLOBAL_ELEMENT.SkillBackend,
      popover: GLOBAL_ELEMENT.SkillPopover,
    });
    expect(GLOBAL_ELEMENT.SkillBasic.innerHTML).toContain('role="status"');
  });

  it('handles fetch error and triggers showError', async () => {
    ApiFetch.getSkills.mockRejectedValue(new Error('fail'));
    await LoadSkills.init({
      basic: GLOBAL_ELEMENT.SkillBasic,
      frontend: GLOBAL_ELEMENT.SkillFrontend,
      backend: GLOBAL_ELEMENT.SkillBackend,
      popover: GLOBAL_ELEMENT.SkillPopover,
    });
    expect(GLOBAL_ELEMENT.AlertBody.classList.contains('hidden')).toBe(false);
  });

  it('skips popover creation when no cert_link and still calls Popover for existing targets', async () => {
    const svg = '<svg><path /></svg>';
    ApiFetch.getSkills.mockResolvedValue({
      data: [{id: 1, name: 'NoCert', icon: svg, cert_link: '', cert_img: '', cert_desc: ''}],
    });
    await LoadSkills.init({
      basic: GLOBAL_ELEMENT.SkillBasic,
      frontend: GLOBAL_ELEMENT.SkillFrontend,
      backend: GLOBAL_ELEMENT.SkillBackend,
      popover: GLOBAL_ELEMENT.SkillPopover,
    });
    expect(GLOBAL_ELEMENT.SkillPopover.innerHTML).toBe('');

    // add an element to trigger popover events and ensure no errors
    const el = document.createElement('div');
    el.setAttribute('data-popover-target', 'non-existent');
    document.body.appendChild(el);
    expect(() => LoadSkills._addPopoverEvents()).not.toThrow();
  });

  it('handles errors thrown inside _renderAllSkills', async () => {
    const original = LoadSkills._renderSkill;
    LoadSkills._renderSkill = jest.fn(() => {
      throw new Error('explode');
    });

    await LoadSkills.init({
      basic: GLOBAL_ELEMENT.SkillBasic,
      frontend: GLOBAL_ELEMENT.SkillFrontend,
      backend: GLOBAL_ELEMENT.SkillBackend,
      popover: GLOBAL_ELEMENT.SkillPopover,
    });

    expect(GLOBAL_ELEMENT.AlertBody.classList.contains('hidden')).toBe(false);
    LoadSkills._renderSkill = original;
  });

  it('returns cached api fetch without re-importing', async () => {
    const sentinel = {};
    LoadSkills._apiFetch = sentinel;
    const result = await LoadSkills._getApiFetch();
    expect(result).toBe(sentinel);
  });

  it('falls back to module export when default is missing', async () => {
    jest.resetModules();
    jest.doMock('../data/apiFetch', () => ({__esModule: true, default: undefined, getSkills: jest.fn()}));
    await jest.isolateModulesAsync(async () => {
      const FreshLoadSkills = require('./loadSkills').default;
      FreshLoadSkills._apiFetch = null;
      const result = await FreshLoadSkills._getApiFetch();
      expect(result.getSkills).toBeDefined();
    });
  });
});
