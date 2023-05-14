import {emptyGuestbook} from '../templates/viewGuestbooks';

const LoadGuestbooks = {
  init(container) {
    this._container = container;

    this._renderGuestbooks();
  },

  _renderGuestbooks() {
    this._container.innerHTML = emptyGuestbook();
  },
};

export default LoadGuestbooks;
