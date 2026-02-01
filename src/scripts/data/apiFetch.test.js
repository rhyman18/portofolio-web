import ApiFetch from './apiFetch';
import CONFIG from '../global/config';
import {createClient} from '@supabase/supabase-js';

let mockResponses = {};
let mockSignedUrl = 'https://signed.test/path';

jest.mock('@supabase/supabase-js', () => {
  let mockLastInsert = null;
  const createClient = jest.fn(() => ({
    from(table) {
      return {
        select() {
          return this;
        },
        eq() {
          return this;
        },
        order() {
          return this;
        },
        range() {
          return this;
        },
        insert(payload) {
          mockLastInsert = payload;
          return {error: null};
        },
        async then(resolve) {
          const res = mockResponses[table] || {};
          return resolve({data: res.data || [], error: res.error, count: res.count});
        },
      };
    },
    storage: {
      from() {
        return {
          async createSignedUrl() {
            return {data: {signedUrl: mockSignedUrl}, error: null};
          },
        };
      },
    },
  }));

  createClient.__setResponse = (table, response) => {
    mockResponses[table] = response;
  };

  createClient.__setSignedUrl = (url) => {
    mockSignedUrl = url;
  };

  createClient.__reset = () => {
    mockResponses = {};
    mockSignedUrl = 'https://signed.test/path';
    mockLastInsert = null;
  };

  createClient.__getLastInsert = () => mockLastInsert;

  return {createClient};
});

describe('ApiFetch', () => {
  const originalLog = console.log;

  beforeEach(() => {
    process.env.SUPABASE_URL = 'https://supabase.test';
    process.env.SUPABASE_ANON_KEY = 'anon';
    process.env.SUPABASE_STORAGE_BUCKET = 'bucket';
    CONFIG.SUPABASE_URL = process.env.SUPABASE_URL;
    CONFIG.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    CONFIG.SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET;
    createClient.__reset();
    // reset cached client inside ApiFetch
    ApiFetch._client = null;
    console.log = jest.fn(); // silence expected error logs
  });

  afterAll(() => {
    console.log = originalLog;
  });

  it('throws when env keys are missing', async () => {
    process.env.SUPABASE_URL = '';
    process.env.SUPABASE_ANON_KEY = '';
    CONFIG.SUPABASE_URL = '';
    CONFIG.SUPABASE_ANON_KEY = '';
    await expect(ApiFetch.getSkills('basic')).rejects.toThrow('An error occurred while loading the skills data');
  });

  it('fetches skills with signed image urls', async () => {
    createClient.__setResponse('skills', {
      data: [{id: 1, name: 'JS', icon: 'fa', cert_img: 'img.png', cert_link: 'http', type: 'basic', sort: 1}],
    });
    const result = await ApiFetch.getSkills('basic');
    expect(result.data[0].cert_img).toBe('https://signed.test/path');
  });

  it('fetches projects with pagination data', async () => {
    createClient.__setResponse('projects', {
      data: [{id: 1, title: 'Test', img: 'img.png', img_hover: 'img2.png', tags: '[]', desc: '', updated_at: '2024', url: '', repo: ''}],
      count: 1,
    });
    const result = await ApiFetch.getProjects({page: 1, limit: 5});
    expect(result.totalPages).toBe(1);
    expect(result.data[0].img).toBe('https://signed.test/path');
    expect(result.data[0].img_hover).toBe('https://signed.test/path');
  });

  it('returns guestbooks data', async () => {
    createClient.__setResponse('guestbooks', {data: [{id: 1, name: 'A'}]});
    const result = await ApiFetch.getGuestbooks();
    expect(result.data).toHaveLength(1);
  });

  it('posts guestbook successfully', async () => {
    await expect(ApiFetch.postGuestbook({name: 'A', username: 'b', platform: 'github', message: 'hello world'})).resolves.not.toThrow();
  });

  it('adds timestamp when posting guestbook without updated_at', async () => {
    await ApiFetch.postGuestbook({name: 'A', username: 'b', platform: 'github', message: 'hello world'});
    const payload = createClient.__getLastInsert();
    expect(payload.updated_at).toBeDefined();
  });
});
