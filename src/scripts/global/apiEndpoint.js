import CONFIG from './config';

const SUPABASE_URL = (CONFIG.SUPABASE_URL || '').replace(/\/$/, '');
const REST_BASE = SUPABASE_URL ? `${SUPABASE_URL}/rest/v1/` : '';
const SUPABASE_PATH = {
  skills: 'skills/',
  projectThumb: 'projects/thumb/',
  projectHover: 'projects/hover/',
};

const API_ENDPOINT = {
  SKILLS: (section) => `${REST_BASE}skills?select=*&type=eq.${encodeURIComponent(section)}`,
  PROJECTS: `${REST_BASE}projects?select=*`,
  GUESTBOOKS: `${REST_BASE}guestbooks?select=*`,
};

export {SUPABASE_PATH};
export default API_ENDPOINT;
