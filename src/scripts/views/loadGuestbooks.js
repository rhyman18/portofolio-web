import ApiFetch from '../data/apiFetch';
import {emptyGuestbook, createGuestbook} from '../templates/viewGuestbooks';

const LoadGuestbooks = {
  init(container) {
    this._container = container;

    this._renderGuestbooks();
  },

  async _renderGuestbooks() {
    this._container.innerHTML = emptyGuestbook();

    const apiGuestbooks = await ApiFetch.getGuestbooks();
    if (apiGuestbooks.data.length > 0) {
      this._container.innerHTML = '';
      apiGuestbooks.data.forEach((guest) => {
        this._container.innerHTML += createGuestbook(guest, this._createLinkSosmed(guest.platform));
      });
    }
  },

  _createLinkSosmed(link) {
    switch (link) {
      case 'facebook':
        return 'https://web.facebook.com/';
      case 'instagram':
        return 'https://www.instagram.com/';
      case 'twitter':
        return 'https://twitter.com/';
      case 'linkedin':
        return 'https://www.linkedin.com/in/';
      case 'tiktok':
        return 'https://www.tiktok.com/@';
      case 'github':
        return 'https://github.com/';
    }
  },
};

export default LoadGuestbooks;
