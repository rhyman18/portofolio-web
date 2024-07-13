const Debounce = {
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
