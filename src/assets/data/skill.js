import {baseApi, authApi} from './api';

/**
 * Fetch data skills ke API.
 * @param {string} type
 */
async function skill(type) {
  try {
    const response = await fetch(`${baseApi}/skills/${type}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authApi}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export {skill};
