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

  /**
   * get API guestbooks (all)
   */
  static async getGuestbooks() {
    const response = await fetch(API_ENDPOINT.GUESTBOOKS, this.#headers);
    const results = response.json();
    return results;
  }

  /**
   * send POST request to API guestbook
   * @param {object} input
   */
  static async postGuestbook(input) {
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(API_ENDPOINT.GUESTBOOKS, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept': 'application/json',
        'x-api-key': CONFIG.AUTH,
      },
    });
  }
};

export default ApiFetch;
