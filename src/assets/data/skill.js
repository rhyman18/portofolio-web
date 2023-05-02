import {baseApi, authApi} from './api';

/**
 * Fetch data skills ke API.
 * @param {string} type
 * @return {Promise}
 */
function skill(type) {
  return fetch(`${baseApi}/skills/${type}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${authApi}`,
    },
  })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return Promise.resolve(result);
      });
};

export {skill};
