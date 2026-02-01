/**
 * Simple scroll progress bar controller.
 * Call `init` with an element whose width should track page scroll progress.
 */
const ScrollIndicator = {
  /**
   * Attach a scroll handler that updates the supplied element.
   * @param {HTMLElement} element Bar element whose width will be set in percent.
   * @return {void}
   */
  init(element) {
    window.onscroll = () => {
      this._scrollBarProgress(element);
    };
  },

  /**
   * Compute scroll percentage and apply it to the element width.
   * @param {HTMLElement} element Target progress bar element.
   * @return {void}
   */
  _scrollBarProgress(element) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    element.style.width = scrolled + '%';
  },
};

export default ScrollIndicator;
