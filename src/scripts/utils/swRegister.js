import * as WorkboxWindow from 'workbox-window';

/**
 * Registers the compiled service worker bundle using Workbox.
 * Gracefully throws when the browser lacks service-worker support.
 * @throws {Error} When service workers are unsupported or registration fails.
 * @return {Promise<void>}
 */
const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker not supported in the browser');
  }

  const wb = new WorkboxWindow.Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.log('Service worker registered');
  } catch (error) {
    console.log('Failed to register service worker', error);
    throw new Error('Service worker registration failed');
  }
};

export default swRegister;
