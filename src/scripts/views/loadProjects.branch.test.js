import LoadProjects from './loadProjects';
import ApiFetch from '../data/apiFetch';
import GLOBAL_ELEMENT from '../global/globalElement';

jest.mock('../data/apiFetch', () => ({
  __esModule: true,
  default: {
    getProjects: jest.fn(),
  },
  getProjects: jest.fn(),
}));

describe('LoadProjects pagination branches', () => {
  const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <div id="post"></div>
      <div id="post-pagination"></div>
      <div id="alert-body"></div>
      <div id="alert-msg"></div>
    `;
    // re-evaluate globals after DOM setup
    jest.resetModules();
  });

  it('renders without pagination when only one page', async () => {
    const container = document.getElementById('post');
    const pagination = document.getElementById('post-pagination');
    GLOBAL_ELEMENT.ProjectsPagination = pagination;

    ApiFetch.getProjects.mockResolvedValueOnce({
      data: [],
      totalPages: 1,
      limit: 5,
    });

    await LoadProjects.init(container);

    expect(pagination.innerHTML).toBe('');
  });

  it('disables prev on first page and next on last page', async () => {
    const container = document.getElementById('post');
    const pagination = document.getElementById('post-pagination');
    GLOBAL_ELEMENT.ProjectsPagination = pagination;

    ApiFetch.getProjects.mockResolvedValue({
      data: [{id: 1, title: 'p1', img: '', img_hover: '', tags: '[]', desc: '', updated_at: '2024'}],
      totalPages: 2,
      limit: 5,
    });

    await LoadProjects.init(container);

    const prevBtn = document.getElementById('post-prev');
    const nextBtn = document.getElementById('post-next');
    expect(prevBtn.disabled).toBe(true);
    expect(nextBtn.disabled).toBe(false);

    // move to last page
    ApiFetch.getProjects.mockResolvedValueOnce({
      data: [{id: 2, title: 'p2', img: '', img_hover: '', tags: '[]', desc: '', updated_at: '2024'}],
      totalPages: 2,
      limit: 5,
    });
    nextBtn.onclick();
    await flush();
    const updatedNextBtn = document.getElementById('post-next');
    expect(updatedNextBtn.disabled).toBe(true);
  });
});
