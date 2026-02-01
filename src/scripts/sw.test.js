/**
 * Minimal service worker tests to ensure lifecycle handlers call CacheHelper.
 */
let CacheHelper;

jest.mock('./utils/cacheHelper', () => {
  const mock = {
    cachingAppShell: jest.fn(() => Promise.resolve()),
    deleteOldCache: jest.fn(() => Promise.resolve()),
    revalidateCache: jest.fn(() => Promise.resolve('cached')),
  };
  return {__esModule: true, ...mock, default: mock};
});

describe('sw.js service worker handlers', () => {
  let originalSelf;
  let listeners;

  beforeEach(async () => {
    jest.resetModules();
    originalSelf = global.self;
    listeners = {};
    Object.defineProperty(global, 'self', {
      value: {
        addEventListener: (event, cb) => {
          listeners[event] = cb;
        },
      },
      writable: true,
      configurable: true,
    });
    CacheHelper = (await import('./utils/cacheHelper')).default;
    await import('./sw.js');
  });

  afterEach(() => {
    global.self = originalSelf;
    jest.clearAllMocks();
  });

  const getHandler = (event) => {
    return listeners[event];
  };

  it('registers install and caches app shell', async () => {
    const handler = getHandler('install');
    expect(typeof handler).toBe('function');
    const waitUntil = jest.fn();
    await handler({waitUntil});
    expect(waitUntil).toHaveBeenCalledWith(expect.any(Promise));
    expect(CacheHelper.cachingAppShell).toHaveBeenCalled();
  });

  it('registers activate and deletes old cache', async () => {
    const handler = getHandler('activate');
    const waitUntil = jest.fn();
    await handler({waitUntil});
    expect(waitUntil).toHaveBeenCalledWith(expect.any(Promise));
    expect(CacheHelper.deleteOldCache).toHaveBeenCalled();
  });

  it('registers fetch and revalidates cache', async () => {
    const handler = getHandler('fetch');
    const respondWith = jest.fn();
    await handler({request: '/asset', respondWith});
    expect(respondWith).toHaveBeenCalledWith(expect.any(Promise));
    expect(CacheHelper.revalidateCache).toHaveBeenCalledWith('/asset');
  });
});
