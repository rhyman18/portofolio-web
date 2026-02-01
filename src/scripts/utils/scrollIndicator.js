/**
 * Simple scroll progress bar controller.
 * Call `init` with an element whose width should track page scroll progress.
 */
const ScrollIndicator = {
  _handler: null,
  _pending: false,

  /**
   * Attach a scroll handler that updates the supplied element.
   * @param {HTMLElement} element Bar element whose width will be set in percent.
   * @return {void}
   */
  init(element) {
    if (!element) return;
    const schedule = () => {
      if (this._pending) return;
      this._pending = true;
      requestAnimationFrame(() => {
        this._pending = false;
        this._scrollBarProgress(element);
      });
    };

    this._handler = schedule;
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule, {passive: true});
    schedule(); // initialize once
  },

  /**
   * Remove listeners to avoid leaking when no longer needed.
   * @return {void}
   */
  destroy() {
    if (!this._handler) return;
    window.removeEventListener('scroll', this._handler);
    window.removeEventListener('resize', this._handler);
    this._handler = null;
    this._pending = false;
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
