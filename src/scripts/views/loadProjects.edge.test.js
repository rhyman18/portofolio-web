import LoadProjects from './loadProjects';
import ApiFetch from '../data/apiFetch';
import GLOBAL_ELEMENT from '../global/globalElement';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getProjects: jest.fn(),
  },
}));

describe('LoadProjects edge cases', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="post"></div>
      <div id="post-pagination"></div>
      <div id="alert-body" class="hidden"></div>
      <div id="alert-msg"></div>
      <img id="postimg-0" />
    `;
    GLOBAL_ELEMENT.ProjectsPagination = document.getElementById('post-pagination');
    GLOBAL_ELEMENT.AlertBody = document.getElementById('alert-body');
    GLOBAL_ELEMENT.AlertMessage = document.getElementById('alert-msg');
    jest.clearAllMocks();
  });

  it('does nothing when prev clicked on first page', async () => {
    const container = document.getElementById('post');
    ApiFetch.getProjects.mockResolvedValue({
      data: [{id: 1, title: 'p1', img: 'img', img_hover: 'hover', tags: '[]', desc: '', updated_at: ''}],
      totalPages: 2,
      limit: 5,
    });

    await LoadProjects.init(container);
    const prevBtn = document.getElementById('post-prev');
    const originalPage = LoadProjects._page;
    prevBtn.onclick();
    expect(LoadProjects._page).toBe(originalPage);
  });

  it('shows error alert when fetch throws', async () => {
    const container = document.getElementById('post');
    ApiFetch.getProjects.mockRejectedValueOnce(new Error('fetch fail'));
    await LoadProjects.init(container);
    expect(GLOBAL_ELEMENT.AlertBody.classList.contains('hidden')).toBe(false);
  });

  it('keeps pagination empty when totalPages is undefined', async () => {
    const container = document.getElementById('post');
    const pagination = document.getElementById('post-pagination');
    ApiFetch.getProjects.mockResolvedValueOnce({data: [], limit: 5});
    await LoadProjects.init(container);
    expect(pagination.innerHTML).toBe('');
  });

  it('prev and next handlers move page when allowed', async () => {
    const container = document.getElementById('post');
    ApiFetch.getProjects.mockResolvedValue({
      data: [{id: 1, title: 'p1', img: 'img', img_hover: 'hover', tags: '[]', desc: '', updated_at: ''}],
      totalPages: 3,
      limit: 5,
    });

    await LoadProjects.init(container);
    const prevBtn = document.getElementById('post-prev');
    const nextBtn = document.getElementById('post-next');

    nextBtn.onclick();
    expect(LoadProjects._page).toBe(2);

    prevBtn.onclick();
    expect(LoadProjects._page).toBe(1);
  });

  it('hover listeners swap images', async () => {
    const container = document.getElementById('post');
    ApiFetch.getProjects.mockResolvedValue({
      data: [{id: 1, title: 'p1', img: 'img', img_hover: 'hover', tags: '[]', desc: '', updated_at: ''}],
      totalPages: 1,
      limit: 5,
    });

    await LoadProjects.init(container);
    const img = document.getElementById('postimg-0');
    img.dispatchEvent(new Event('mouseover'));
    expect(img.src).toContain('hover');
    img.dispatchEvent(new Event('mouseout'));
    expect(img.src).toContain('img');
  });

  it('attachEventListeners skips when projects undefined', () => {
    const spy = jest.spyOn(document, 'getElementById');
    LoadProjects._attachEventListeners([]);
    expect(spy).not.toHaveBeenCalledWith('postimg-0');
    spy.mockRestore();
  });
});
