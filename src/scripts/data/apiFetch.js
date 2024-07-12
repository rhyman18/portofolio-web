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
    try {
      const response = await fetch(API_ENDPOINT.SKILLS(section), this.#headers);
      if (!response.ok) {
        throw new Error('An error occurred while loading the skills data');
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.log('Failed to fetch skills Api', error);
      throw new Error('An error occurred while loading the skills data');
    }
  }

  /**
   * get API projects (all)
   */
  static async getProjects() {
    try {
      const response = await fetch(API_ENDPOINT.PROJECTS, this.#headers);
      if (!response.ok) {
        throw new Error('An error occurred while loading the projects data');
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.log('Failed to fetch projects Api', error);
      throw new Error('An error occurred while loading the projects data');
    }
  }

  /**
   * get API guestbooks (all)
   */
  static async getGuestbooks() {
    try {
      const response = await fetch(API_ENDPOINT.GUESTBOOKS, this.#headers);
      if (!response.ok) {
        throw new Error('An error occurred while loading the guestbook data');
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.log('Failed to fetch guestbooks Api', error);
      throw new Error('An error occurred while loading the guestbook data');
    }
  }

  /**
   * send POST request to API guestbook
   * @param {FormData} input
   */
  static async postGuestbook(input) {
    try {
      const response = await fetch(API_ENDPOINT.GUESTBOOKS, {
        method: 'POST',
        body: input,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${CONFIG.AUTH}`,
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while posting message');
      }
    } catch (error) {
      console.log('Failed to post guestbook Api', error);
      throw new Error('An error occurred while posting message');
    }
  }
};

export default ApiFetch;
