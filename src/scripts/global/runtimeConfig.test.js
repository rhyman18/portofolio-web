const originalEnv = {...process.env};
const originalFetch = global.fetch;

const loadModules = async () => {
  jest.resetModules();
  const runtimeModule = await import('./runtimeConfig');
  const configModule = await import('./config');
  return {
    loadRuntimeConfig: runtimeModule.default || runtimeModule,
    CONFIG: configModule.default || configModule,
  };
};

describe('loadRuntimeConfig', () => {
  let warnSpy;

  beforeEach(() => {
    process.env = {...originalEnv};
    global.fetch = originalFetch;
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = {...originalEnv};
    global.fetch = originalFetch;
    warnSpy.mockRestore();
  });

  it('uses environment variables and skips remote fetch', async () => {
    process.env.SUPABASE_URL = 'env-url';
    process.env.SUPABASE_ANON_KEY = 'env-anon';
    process.env.SUPABASE_STORAGE_BUCKET = 'env-bucket';
    process.env.CACHE_NAME = 'env-cache';
    global.fetch = jest.fn();

    const {loadRuntimeConfig, CONFIG} = await loadModules();
    const result = await loadRuntimeConfig();

    expect(result).toBe(CONFIG);
    expect(CONFIG.SUPABASE_URL).toBe('env-url');
    expect(CONFIG.SUPABASE_ANON_KEY).toBe('env-anon');
    expect(CONFIG.SUPABASE_STORAGE_BUCKET).toBe('env-bucket');
    expect(CONFIG.CACHE_NAME).toBe('env-cache');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns cached config without refetching', async () => {
    jest.resetModules();
    const configModule = await import('./config');
    const CONFIG = configModule.default || configModule;
    CONFIG.SUPABASE_URL = 'cached-url';
    CONFIG.SUPABASE_ANON_KEY = 'cached-anon';
    global.fetch = jest.fn();

    const runtimeModule = await import('./runtimeConfig');
    const loadRuntimeConfig = runtimeModule.default || runtimeModule;

    const result = await loadRuntimeConfig();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.SUPABASE_URL).toBe('cached-url');
    expect(result.SUPABASE_ANON_KEY).toBe('cached-anon');
  });

  it('returns defaults when fetch is undefined', async () => {
    delete global.fetch;
    const {loadRuntimeConfig, CONFIG} = await loadModules();

    const result = await loadRuntimeConfig();

    expect(result).toBe(CONFIG);
    expect(result.SUPABASE_URL).toBe('');
    expect(result.SUPABASE_ANON_KEY).toBe('');
    expect(result.CACHE_NAME).toBe('aribudiman-site');
  });

  it('fetches remote config and applies values', async () => {
    const payload = {
      SUPABASE_URL: 'remote-url',
      SUPABASE_ANON_KEY: 'remote-anon',
      SUPABASE_STORAGE_BUCKET: 'remote-bucket',
      CACHE_NAME: 'remote-cache',
    };

    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => payload,
    }));

    const {loadRuntimeConfig, CONFIG} = await loadModules();
    const result = await loadRuntimeConfig();

    expect(global.fetch).toHaveBeenCalledWith(
        '/.netlify/functions/runtime-config',
        {headers: {Accept: 'application/json'}},
    );
    expect(result).toBe(CONFIG);
    expect(result.SUPABASE_URL).toBe(payload.SUPABASE_URL);
    expect(result.SUPABASE_ANON_KEY).toBe(payload.SUPABASE_ANON_KEY);
    expect(result.SUPABASE_STORAGE_BUCKET)
        .toBe(payload.SUPABASE_STORAGE_BUCKET);
    expect(result.CACHE_NAME).toBe(payload.CACHE_NAME);
  });

  it('warns and falls back when fetch fails', async () => {
    global.fetch = jest.fn(async () => ({ok: false}));

    const {loadRuntimeConfig, CONFIG} = await loadModules();
    const result = await loadRuntimeConfig();

    expect(warnSpy).toHaveBeenCalled();
    expect(result).toBe(CONFIG);
    expect(result.SUPABASE_URL).toBe('');
    expect(result.SUPABASE_ANON_KEY).toBe('');
    expect(result.CACHE_NAME).toBe('aribudiman-site');
  });

  it('falls back to default cache name when response omits it', async () => {
    jest.resetModules();
    const configModule = await import('./config');
    const CONFIG = configModule.default || configModule;
    CONFIG.CACHE_NAME = '';

    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({}),
    }));

    const runtimeModule = await import('./runtimeConfig');
    const loadRuntimeConfig = runtimeModule.default || runtimeModule;

    const result = await loadRuntimeConfig();

    expect(result.CACHE_NAME).toBe('aribudiman-site');
    expect(result.SUPABASE_STORAGE_BUCKET).toBe('');
  });

  it('uses defaults for optional env values when missing', async () => {
    process.env.SUPABASE_URL = 'env-url';
    process.env.SUPABASE_ANON_KEY = 'env-anon';
    delete process.env.SUPABASE_STORAGE_BUCKET;
    delete process.env.CACHE_NAME;

    const {loadRuntimeConfig, CONFIG} = await loadModules();
    const result = await loadRuntimeConfig();

    expect(result.SUPABASE_URL).toBe('env-url');
    expect(result.SUPABASE_ANON_KEY).toBe('env-anon');
    expect(result.SUPABASE_STORAGE_BUCKET).toBe('');
    expect(result.CACHE_NAME).toBe('aribudiman-site');
  });
});
