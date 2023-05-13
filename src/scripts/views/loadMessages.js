import MESSAGES from '../data/dataMessages';

const LoadMessages = {
  init(headline, profile) {
    this._headline = headline;
    this._profile = profile;

    this._renderHeadlineMsg();
    this._renderProfileMsg();
  },

  _renderHeadlineMsg() {
    this._headline.innerText = MESSAGES.HEADLINE;
  },

  _renderProfileMsg() {
    this._profile.innerText = MESSAGES.PROFILE;
  },
};

export default LoadMessages;
