import CONFIG from './config';

/** Remote endpoint that returns runtime secrets for the frontend. */
const CONFIG_ENDPOINT = '/.netlify/functions/runtime-config';

/**
 * Fetches runtime configuration (Supabase keys, bucket, cache name) and merges
 * it into the shared CONFIG object.
 *
 * Resolution order:
 * 1) Build-time env vars injected by webpack (local dev/CI).
 * 2) Cached CONFIG values from a prior call.
 * 3) Remote Netlify Function fetch (browser only).
 * 4) Safe defaults on fetch failure.
 *
 * @return {Promise<object>} Populated CONFIG object (same reference each call).
 */
const loadRuntimeConfig = async () => {
  // 1) Build-time env (injected by dotenv-webpack) for local dev
  const env = (typeof process !== 'undefined' && process.env) || {};
  const envUrl = env.SUPABASE_URL;
  const envAnon = env.SUPABASE_ANON_KEY;
  const envBucket = env.SUPABASE_STORAGE_BUCKET;
  const envCache = env.CACHE_NAME;

  if (envUrl && envAnon) {
    CONFIG.SUPABASE_URL = envUrl;
    CONFIG.SUPABASE_ANON_KEY = envAnon;
    CONFIG.SUPABASE_STORAGE_BUCKET = envBucket || CONFIG.SUPABASE_STORAGE_BUCKET;
    CONFIG.CACHE_NAME = envCache || CONFIG.CACHE_NAME;
    return CONFIG;
  }

  // Avoid refetch when values are already present (e.g., tests or previous call)
  if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) return CONFIG;

  // In non-browser test environments, skip remote fetch
  if (typeof fetch === 'undefined') return CONFIG;

  try {
    const response = await fetch(CONFIG_ENDPOINT, {
      headers: {Accept: 'application/json'},
    });

    if (!response.ok) {
      throw new Error('Failed to load runtime configuration');
    }

    const data = await response.json();
    CONFIG.SUPABASE_URL = data.SUPABASE_URL || '';
    CONFIG.SUPABASE_ANON_KEY = data.SUPABASE_ANON_KEY || '';
    CONFIG.SUPABASE_STORAGE_BUCKET = data.SUPABASE_STORAGE_BUCKET || '';
    CONFIG.CACHE_NAME = data.CACHE_NAME || CONFIG.CACHE_NAME || 'aribudiman-site';
  } catch (err) {
    console.warn('Runtime config not loaded; falling back to defaults', err);
  }

  return CONFIG;
};

export default loadRuntimeConfig;
