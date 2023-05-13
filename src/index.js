
import './assets/components/skill';
import './assets/components/project';
import './assets/components/guestbook';

// When the user scrolls the page, execute scroll indicator
window.onscroll = function() {
  scrollIndicator();
};

/** Function to indicate scroll progress */
function scrollIndicator() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('myBar').style.width = scrolled + '%';
}
