import CacheHelper from './cacheHelper';
import CONFIG from '../global/config';

const createCacheMock = () => {
  const store = new Map();
  const cache = {
    addAll: jest.fn(async (requests) => {
      requests.forEach((r) => store.set(r, {cached: true}));
    }),
    add: jest.fn(async (request) => store.set(request, {cached: true})),
    match: jest.fn(async (request) => store.get(request)),
  };

  const caches = {
    _store: store,
    open: jest.fn(async () => cache),
    keys: jest.fn(async () => ['old-cache', CONFIG.CACHE_NAME]),
    delete: jest.fn(),
    match: jest.fn(async (request) => store.get(request)),
  };
  return {cache, caches, store};
};

describe('CacheHelper', () => {
  const originalCaches = global.caches;
  const originalFetch = global.fetch;

  let cachesMock;

  beforeEach(() => {
    jest.resetModules();
    process.env.CACHE_NAME = 'active-cache';
    CONFIG.CACHE_NAME = 'active-cache';
    const {caches, cache} = createCacheMock();
    cachesMock = caches;
    global.caches = cachesMock;
    global.fetch = jest.fn(async () => ({status: 200, ok: true, url: '/path'}));
    // attach cache reference for assertions
    global.__testCache = cache;
  });

  afterEach(() => {
    global.caches = originalCaches;
    global.fetch = originalFetch;
  });

  it('caches app shell assets', async () => {
    const assets = ['./a', './b'];
    await CacheHelper.cachingAppShell(assets);
    expect(global.__testCache.addAll).toHaveBeenCalledWith(assets);
  });

  it('deletes old caches except active one', async () => {
    await CacheHelper.deleteOldCache();
    expect(cachesMock.delete).toHaveBeenCalledWith('old-cache');
    expect(cachesMock.delete).not.toHaveBeenCalledWith('active-cache');
  });

  it('returns cached response and revalidates', async () => {
    const request = '/api/data';
    global.caches.match.mockResolvedValueOnce({cached: true});
    const response = await CacheHelper.revalidateCache(request);
    expect(response).toEqual({cached: true});
    expect(global.fetch).toHaveBeenCalledWith(request);
  });

  it('fetches and stores when cache miss', async () => {
    const request = '/api/miss';
    global.__testCache.match.mockResolvedValueOnce(undefined);
    const response = await CacheHelper.revalidateCache(request);
    expect(response.status).toBe(200);
    expect(global.__testCache.add).toHaveBeenCalledWith(request);
  });

  it('returns response without caching when status not 200', async () => {
    const request = '/api/error';
    global.fetch = jest.fn(async () => ({status: 500, ok: false}));
    const response = await CacheHelper.revalidateCache(request);
    expect(response.status).toBe(500);
    expect(global.__testCache.add).not.toHaveBeenCalledWith(request);
  });
});
