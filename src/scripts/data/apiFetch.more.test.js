import ApiFetch from './apiFetch';
import CONFIG from '../global/config';
import API_CONFIG from '../global/apiConfig';
import {createClient} from '@supabase/supabase-js';

let mockResponses = {};

jest.mock('@supabase/supabase-js', () => {
  let throwSign = false;
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
          const res = mockResponses[table] || {};
          return {error: res.error || null};
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
            if (throwSign) {
              throw new Error('throwing sign');
            }
            const res = mockResponses.storage || {};
            return {data: res.data, error: res.error};
          },
        };
      },
    },
  }));

  createClient.__setResponse = (table, response) => {
    mockResponses[table] = response;
  };
  createClient.__reset = () => {
    mockResponses = {}; mockLastInsert = null; throwSign = false;
  };
  createClient.__setThrowSign = (val) => {
    throwSign = val;
  };
  createClient.__getLastInsert = () => mockLastInsert;

  return {createClient};
});

describe('ApiFetch additional branches', () => {
  const originalLog = console.log;

  beforeEach(() => {
    process.env.SUPABASE_URL = 'https://supabase.test';
    process.env.SUPABASE_ANON_KEY = 'anon';
    process.env.SUPABASE_STORAGE_BUCKET = 'bucket';
    CONFIG.SUPABASE_URL = process.env.SUPABASE_URL;
    CONFIG.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    CONFIG.SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET;
    createClient.__reset();
    ApiFetch._client = null;
    console.log = jest.fn(); // silence expected logs
  });

  afterAll(() => {
    console.log = originalLog;
  });

  it('bypasses signing when storage bucket not set', async () => {
    process.env.SUPABASE_STORAGE_BUCKET = '';
    CONFIG.SUPABASE_STORAGE_BUCKET = '';
    createClient.__setResponse('projects', {data: [{img: 'path/img', img_hover: 'path/hover', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('projects/thumb/path/img');
  });

  it('falls back to original path when signing fails', async () => {
    createClient.__setResponse('projects', {data: [{img: 'path/img', img_hover: 'path/hover', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    mockResponses.storage = {error: new Error('fail')};
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('projects/thumb/path/img');
  });

  it('withPrefix returns absolute url unchanged and prefixes relative', async () => {
    // use project fetch to exercise private #withPrefix
    createClient.__setResponse('projects', {data: [{img: 'http://absolute/img', img_hover: 'rel/hover', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('http://absolute/img');
    expect(result.data[0].img_hover).toBe('projects/hover/rel/hover');
  });

  it('throws user-facing error when fetch fails', async () => {
    createClient.__setResponse('skills', {error: new Error('boom')});
    await expect(ApiFetch.getSkills('basic')).rejects.toThrow('An error occurred while loading the skills data');
  });

  it('throws user-facing error when fetching projects fails', async () => {
    createClient.__setResponse('projects', {error: new Error('projects fail')});
    await expect(ApiFetch.getProjects()).rejects.toThrow('An error occurred while loading the projects data');
  });

  it('throws user-facing error when fetching guestbooks fails', async () => {
    createClient.__setResponse('guestbooks', {error: new Error('guestbooks fail')});
    await expect(ApiFetch.getGuestbooks()).rejects.toThrow('An error occurred while loading the guestbook data');
  });

  it('propagates postGuestbook error', async () => {
    createClient.__setResponse('guestbooks', {error: new Error('insert fail')});
    await expect(ApiFetch.postGuestbook({name: 'n', username: 'u', platform: 'github', message: 'msg long enough'})).rejects.toThrow('An error occurred while posting message');
  });

  it('returns original path when signedUrl throws', async () => {
    createClient.__setResponse('projects', {data: [{img: 'p', img_hover: 'h', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    createClient.__setThrowSign(true);
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('projects/thumb/p');
  });

  it('returns signed url when signing succeeds', async () => {
    createClient.__setResponse('projects', {data: [{img: 'p', img_hover: 'h', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    mockResponses.storage = {data: {signedUrl: 'signed-url'}};
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('signed-url');
  });

  it('withPrefix handles empty and already-prefixed paths', async () => {
    createClient.__setResponse('projects', {data: [{img: '', img_hover: 'projects/thumb/existing', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('');
    expect(result.data[0].img_hover).toBe('projects/hover/projects/thumb/existing');
  });

  it('withPrefix returns path when prefix is empty', async () => {
    const original = API_CONFIG.IMG_PATH.projectThumb;
    API_CONFIG.IMG_PATH.projectThumb = '';
    createClient.__setResponse('projects', {data: [{img: 'relative/path', img_hover: 'h', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('relative/path');
    API_CONFIG.IMG_PATH.projectThumb = original;
  });

  it('adds updated_at when missing on postGuestbook', async () => {
    const payload = {name: 'n', username: 'u', platform: 'github', message: 'a valid long message'};
    await ApiFetch.postGuestbook(payload);
    const insert = createClient.__getLastInsert();
    expect(insert.updated_at).toBeDefined();
  });

  it('withPrefix returns cleanPath when already prefixed', async () => {
    createClient.__setResponse('projects', {data: [{img: 'projects/thumb/img', img_hover: 'projects/hover/img', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    process.env.SUPABASE_STORAGE_BUCKET = '';
    CONFIG.SUPABASE_STORAGE_BUCKET = '';
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('projects/thumb/img');
  });

  it('returns empty string when path missing', async () => {
    createClient.__setResponse('projects', {data: [{img: '', img_hover: '', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('');
  });

  it('falls back to zero total when count and length missing', async () => {
    const strangeData = {
      map: jest.fn(() => []),
      length: undefined,
    };
    createClient.__setResponse('projects', {data: strangeData});
    const result = await ApiFetch.getProjects();
    expect(result.total).toBe(0);
    expect(strangeData.map).toHaveBeenCalled();
  });

  it('handles FormData input without overriding updated_at', async () => {
    const form = new FormData();
    form.append('name', 'n');
    form.append('username', 'u');
    form.append('platform', 'github');
    form.append('message', 'a valid long enough message');
    const existingDate = '2024-01-01T00:00:00.000Z';
    form.append('updated_at', existingDate);

    await ApiFetch.postGuestbook(form);
    const insert = createClient.__getLastInsert();
    expect(insert.updated_at).toBe(existingDate);
  });

  it('uses default prefix values when config missing', async () => {
    const original = API_CONFIG.IMG_PATH.projectThumb;
    API_CONFIG.IMG_PATH.projectThumb = undefined;
    createClient.__setResponse('projects', {data: [{img_hover: 'h', tags: '[]', desc: '', updated_at: '', url: '', repo: ''}]});
    const result = await ApiFetch.getProjects();
    expect(result.data[0].img).toBe('');
    API_CONFIG.IMG_PATH.projectThumb = original;
  });
});
