const API_CONFIG = {
  PATH: {
    skills: 'skills/',
    projectThumb: 'projects/thumb/',
    projectHover: 'projects/hover/',
  },
  SELECT: {
    skills: 'id,name,icon,cert_link,cert_img,cert_desc,type,sort',
    projects: 'id,title,url,img,img_hover,tags,desc,repo,updated_at',
    guestbooks: 'id,name,username,platform,message,updated_at',
  },
};

export default API_CONFIG;
