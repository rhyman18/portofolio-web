import CONFIG from './config';

const API_ENDPOINT = {
  SKILLS: (section) => `${CONFIG.BASE_URL}skills/${section}`,
  PROJECTS: `${CONFIG.BASE_URL}projects`,
  GUESTBOOKS: `${CONFIG.BASE_URL}guestbooks`,
};

export default API_ENDPOINT;
