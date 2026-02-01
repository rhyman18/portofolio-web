import CONFIG from './config';

const CONFIG_ENDPOINT = '/.netlify/functions/runtime-config';

/**
 * Fetch runtime configuration from a Netlify Function and populate CONFIG.
 * Falls back to any existing values to support unit tests.
 * @return {Promise<typeof CONFIG>} populated CONFIG object
 */
const loadRuntimeConfig = async () => {
  // Avoid refetch when values are already present (e.g., tests)
  if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) {
    return CONFIG;
  }

  const response = await fetch(CONFIG_ENDPOINT, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load runtime configuration');
  }

  const data = await response.json();
  CONFIG.SUPABASE_URL = data.SUPABASE_URL || '';
  CONFIG.SUPABASE_ANON_KEY = data.SUPABASE_ANON_KEY || '';
  CONFIG.SUPABASE_STORAGE_BUCKET = data.SUPABASE_STORAGE_BUCKET || '';
  CONFIG.CACHE_NAME = data.CACHE_NAME || CONFIG.CACHE_NAME || 'aribudiman-site';

  return CONFIG;
};

export default loadRuntimeConfig;
