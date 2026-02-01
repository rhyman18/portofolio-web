import LoadProjects from './loadProjects';
import ApiFetch from '../data/apiFetch';
import GLOBAL_ELEMENT from '../global/globalElement';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getProjects: jest.fn(),
  },
}));

describe('LoadProjects additional branches', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="post"></div>
      <div id="post-pagination"></div>
      <div id="alert-body"></div>
      <div id="alert-msg"></div>
    `;
    GLOBAL_ELEMENT.ProjectsPagination = document.getElementById('post-pagination');
    GLOBAL_ELEMENT.AlertBody = document.getElementById('alert-body');
    GLOBAL_ELEMENT.AlertMessage = document.getElementById('alert-msg');
    jest.clearAllMocks();
  });

  it('handles missing pagination container gracefully', async () => {
    const container = document.getElementById('post');
    GLOBAL_ELEMENT.ProjectsPagination = null;
    ApiFetch.getProjects.mockResolvedValue({data: [], totalPages: 1, limit: 5});
    await LoadProjects.init(container);
    expect(container.innerHTML).toBeTruthy();
  });

  it('renders fallback skeleton when API throws', async () => {
    const container = document.getElementById('post');
    ApiFetch.getProjects.mockRejectedValueOnce(new Error('boom'));
    await LoadProjects.init(container);
    expect(container.innerHTML).toContain('role="status"');
  });

  it('keeps pagination empty when totalPages is undefined', async () => {
    const container = document.getElementById('post');
    const pagination = document.getElementById('post-pagination');
    ApiFetch.getProjects.mockResolvedValueOnce({data: [], limit: 5});
    await LoadProjects.init(container);
    expect(pagination.innerHTML).toBe('');
  });

  it('disables next button when on last page', async () => {
    const container = document.getElementById('post');
    const pagination = document.getElementById('post-pagination');
    ApiFetch.getProjects.mockResolvedValue({data: [], totalPages: 2, limit: 5});
    await LoadProjects.init(container);

    LoadProjects._page = 2;
    LoadProjects._paginationContainer = pagination;
    LoadProjects._renderPagination(2);

    const nextBtn = document.getElementById('post-next');
    nextBtn.onclick();
    expect(nextBtn.disabled).toBe(true);
    expect(LoadProjects._page).toBe(2);
  });

  it('retains previous limit value when api omits it', async () => {
    const container = document.getElementById('post');
    LoadProjects._limit = 9;
    ApiFetch.getProjects.mockResolvedValueOnce({data: [], totalPages: 3});
    LoadProjects._container = container;
    await LoadProjects._renderProjects.call(LoadProjects);
    expect(LoadProjects._limit).toBe(9);
  });

  it('skips attaching listeners when image element missing', () => {
    const projects = [{img: 'a', img_hover: 'b'}];
    expect(() => LoadProjects._attachEventListeners(projects)).not.toThrow();
  });
});
