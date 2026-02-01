/**
 * Debounce utility: delays function execution until inactivity for `wait` ms.
 */
const Debounce = {
  /**
   * Create a debounced wrapper around `func`.
   * @param {object} params
   * @param {Function} params.func Function to debounce.
   * @param {number} params.wait Delay in milliseconds.
   * @return {Function} Debounced function retaining `this` and arguments.
   */
  init({func, wait}) {
    let timeout;
    return function(...args) {
      // eslint-disable-next-line no-invalid-this
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },
};

export default Debounce;
