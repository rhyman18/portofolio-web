import 'regenerator-runtime';
import ScrollIndicator from './utils/scrollIndicator';
import LoadMessages from './views/loadMessages';

window.addEventListener('DOMContentLoaded', () => {
  ScrollIndicator.init(document.querySelector('#myBar'));
  LoadMessages.init(
      document.querySelector('#headline-pesan'),
      document.querySelector('#profile-pesan'),
  );
});
