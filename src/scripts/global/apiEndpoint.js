import CONFIG from './config';

const API_ENDPOINT = {
  SKILLS: (section) => `${CONFIG.BASE_URL}skills/${section}`,
};

export default API_ENDPOINT;
