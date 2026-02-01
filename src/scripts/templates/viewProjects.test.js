import {createPagination, createProject} from './viewProjects';

describe('viewProjects templates', () => {
  it('builds pagination with page numbers', () => {
    const html = createPagination(2, 5);
    expect(html).toContain('Page 2 / 5');
    expect(html).toContain('post-prev');
    expect(html).toContain('post-next');
  });

  it('omits total pages text when not provided', () => {
    const html = createPagination(3);
    expect(html).toContain('Page 3');
    expect(html).not.toMatch(/Page 3\s*\/\s*\d/);
  });

  it('builds project card with alternating layout', () => {
    const project = {
      title: 'My Project',
      url: 'https://example.com',
      img: '/img.png',
      img_hover: '/img2.png',
      tags: ['js', 'css'],
      desc: 'Description',
      updated_at: '2024-01-01T00:00:00Z',
    };
    const htmlEven = createProject(project, 0);
    const htmlOdd = createProject(project, 1);
    expect(htmlEven).toContain('left-bg');
    expect(htmlOdd).toContain('right-bg');
    expect(htmlEven).toContain('My Project');
    expect(htmlEven).toContain('img-project-zoom');
  });

  it('renders repo link and parses JSON tags', () => {
    const project = {
      title: 'Repo Project',
      url: '',
      repo: 'https://github.com/repo',
      img: '/img.png',
      img_hover: '/img2.png',
      tags: '["tag1","tag2"]',
      desc: 'Description',
      updated_at: '2024-01-01T00:00:00Z',
    };
    const html = createProject(project, 2);
    expect(html).toContain('git');
    expect(html).toContain('tag1');
    expect(html).toContain('tag2');
  });

  it('handles missing tags by falling back to empty array', () => {
    const project = {
      title: 'No Tags',
      url: '',
      img: '/img.png',
      img_hover: '/img2.png',
      tags: '',
      desc: 'Description',
      updated_at: '2024-01-01T00:00:00Z',
    };
    const html = createProject(project, 0);
    expect(html).not.toContain('<span');
  });
});
