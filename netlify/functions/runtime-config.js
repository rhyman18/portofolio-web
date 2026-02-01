/**
 * Netlify Function to expose whitelisted runtime configuration to the client.
 * Values are pulled from environment variables set in Netlify and are NOT
 * baked into the static bundle, preventing secrets-scan failures.
 */
exports.handler = async () => {
  const body = {
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
    SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || '',
    CACHE_NAME: process.env.CACHE_NAME || 'aribudiman-site',
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
};
