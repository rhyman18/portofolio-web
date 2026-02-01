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

  it('falls back to initials when platform icon missing', () => {
    const guest = {
      platform: 'unknown',
      name: 'No Icon',
      message: 'Fallback platform test',
      username: 'noicon',
      updated_at: '2024-05-05T00:00:00Z',
    };

    const html = createGuestbook(guest, 'https://example.com/');

    expect(html).toContain('data-icon="fallback"');
    expect(html).toContain('un'); // first two letters of platform
  });

  it('shows question mark badge when platform is empty', () => {
    const guest = {
      platform: '',
      name: 'Mystery',
      message: 'No platform provided',
      username: 'mystery',
      updated_at: '2024-05-05T00:00:00Z',
    };

    const html = createGuestbook(guest, 'https://example.com/');

    expect(html).toContain('data-icon="fallback"');
    expect(html).toContain('?');
  });
});
