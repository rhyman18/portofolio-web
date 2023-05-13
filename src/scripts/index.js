import 'regenerator-runtime';
import ScrollIndicator from './utils/scrollIndicator';

window.addEventListener('DOMContentLoaded', () => {
  ScrollIndicator.init(document.querySelector('#myBar'));
});
