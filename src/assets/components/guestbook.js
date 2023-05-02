import {guest} from '/src/assets/data/guestbook';
import {send} from '/src/assets/data/send';

// Add guestbook
const containerGuest = document.getElementById('guestbook');

const dataGuest = await guest();

if (dataGuest.data.length > 0) {
  containerGuest.innerHTML = '';
}

dataGuest.data.forEach(function(guest, i) {
  let link = '';
  switch (guest.platform) {
    case 'facebook':
      link = 'https://web.facebook.com/';
      break;
    case 'instagram':
      link = 'https://www.instagram.com/';
      break;
    case 'twitter':
      link = 'https://twitter.com/';
      break;
    case 'linkedin':
      link = 'https://www.linkedin.com/in/';
      break;
    case 'tiktok':
      link = 'https://www.tiktok.com/@';
      break;
    case 'github':
      link = 'https://github.com/';
      break;
  }

  containerGuest.innerHTML += `
  <div class="max-w-md text-start flex flex-col justify-between skill-box bg-primary dark:bg-secondary-nav text-primary-font dark:text-secondary-font rounded-lg cursor-pointer guest-box p-5">
    <div>
      <div class="flex items-center">
        <i class="fa-brands fa-${guest.platform} fa-3x text-main-500"></i>
        <h5 class="text-lg font-semibold uppercase ps-2.5">${guest.name}</h5>
      </div>
      <div class="pt-2.5 ps-5"><q class="elipsis">${guest.message}</q></div>
    </div>
    <div>
      <div class="text-main-500 font-semibold guest-link my-2.5">
        <a href="${link + guest.username}" target="_blank">@${guest.username}</a>
      </div>
      <div class="text-main-gray uppercase tracking-widest text-sm">${guest.updated_at}</div>
    </div>
  </div>
  `;
});

// Post guest ke API
const formGuest = document.getElementById('inputGuest');

formGuest.addEventListener('submit', function(e) {
  e.preventDefault();

  document.getElementById('send').disabled = true;
  document.getElementById('send').classList = 'w-full text-white bg-main-200 hover:bg-main-300 focus:ring-4 focus:outline-none focus:ring-main-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main-200 dark:hover:bg-main-300 dark:focus:ring-main-700';
  document.getElementById('send').innerHTML = `
  <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
  </svg>
  Loading
  `;

  const name = document.getElementById('name');
  const platform = document.getElementById('platform');
  const username = document.getElementById('username');
  const message = document.getElementById('message');

  // fetch to api
  const upload = {
    name: name.value,
    username: username.value,
    platform: platform.value,
    message: message.value,
  };

  // send request
  send(upload);
});
