import CONFIG from '../global/config';
import API_ENDPOINT from '../global/apiEndpoint';

/**
* Fetch API configured endpoints
*/
class ApiFetch {
  /**
  * get API skills with each section
  * @param {string} section
  * @return {Promise} response api
  */
  static async getSkills(section) {
    const response = await fetch(API_ENDPOINT.SKILLS(section), {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${CONFIG.AUTH}`,
      },
    });
    const results = response.json();
    return results;
  }
};

export default ApiFetch;
