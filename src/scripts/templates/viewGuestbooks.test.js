import {createGuestbook, emptyGuestbook} from './viewGuestbooks';

describe('viewGuestbooks templates', () => {
  it('renders empty guestbook text', () => {
    expect(emptyGuestbook()).toMatch(/Belum ada/);
  });

  it('renders guestbook entry with formatted fields', () => {
    const guest = {
      platform: 'github',
      name: 'Tester',
      message: 'Hello world from test suite',
      username: 'tester',
      updated_at: '2023-01-01T00:00:00Z',
    };
    const html = createGuestbook(guest, 'https://github.com/');
    expect(html).toContain('Tester');
    expect(html).toContain('@tester');
    expect(html).toContain('data-icon="github"');
  });
});
