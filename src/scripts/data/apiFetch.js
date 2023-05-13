import CONFIG from '../global/config';
import API_ENDPOINT from '../global/apiEndpoint';

/**
* Fetch API configured endpoints
*/
class ApiFetch {
  static #headers = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${CONFIG.AUTH}`,
    },
  };

  /**
  * get API skills with each section
  * @param {string} section
  * @return {Promise} response api
  */
  static async getSkills(section) {
    const response = await fetch(API_ENDPOINT.SKILLS(section), this.#headers);
    const results = response.json();
    return results;
  }

  /**
   * get API projects (all)
   */
  static async getProjects() {
    const response = await fetch(API_ENDPOINT.PROJECTS, this.#headers);
    const results = response.json();
    return results;
  }
};

export default ApiFetch;
