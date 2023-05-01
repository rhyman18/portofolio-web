import { baseApi, authApi } from './api';

/**
 * Fetch data skills ke API.
 * @param {string} type
 */
async function project() {
  try {
    const response = await fetch(`${baseApi}/projects`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authApi}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export { project };
