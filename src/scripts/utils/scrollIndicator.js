const ScrollIndicator = {
  init(element) {
    window.onscroll = () => {
      this._scrollBarProgress(element);
    };
  },

  _scrollBarProgress(element) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    element.style.width = scrolled + '%';
  },
};

export default ScrollIndicator;
