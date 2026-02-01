/**
 * Static configuration for Supabase table names, storage paths, and queries.
 */
const API_CONFIG = {
  TABLE: {
    skills: 'skills',
    projects: 'projects',
    guestbooks: 'guestbooks',
  },
  IMG_PATH: {
    skills: 'skills/',
    projectThumb: 'projects/thumb/',
    projectHover: 'projects/hover/',
  },
  SELECT: {
    skills: 'id,name,icon,cert_link,cert_img,cert_desc,type,sort',
    projects: 'id,title,url,img,img_hover,tags,desc,repo,updated_at',
    guestbooks: 'id,name,username,platform,message,updated_at',
  },
  PAGINATION: {
    projects: 5,
  },
};

export default API_CONFIG;
