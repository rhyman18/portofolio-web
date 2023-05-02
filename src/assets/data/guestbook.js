import {baseApi, authApi} from './api';

/**
 * Fetch data skills ke API.
 * @return {Promise}
 */
function guest() {
  return fetch(`${baseApi}/guestbooks`, {
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

export {guest};
