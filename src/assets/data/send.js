import {baseApi, authApi} from './api';

/**
 * Fetch data skills ke API.
 * @param {object} input
 */
function send(input) {
  fetch(`${baseApi}/guestbooks`, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Authorization': `Bearer ${authApi}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
      .then((result) => {
        location.reload();
      });
};

export {send};
