import 'regenerator-runtime';
import CacheHelper from './utils/cacheHelper';

/**
 * Service worker entry: pre-caches static assets and responds with cache-first
 * strategy while keeping cache fresh in the background.
 */
/** @type {string[]} */
const assetsToCache = [
  './',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png',
  './icons/apple-touch-icon.png',
  './icons/android-chrome-512x512.png',
  './icons/android-chrome-192x192.png',
  './profile.webp',
  './index.html',
  './favicon.ico',
  './site.webmanifest',
  './sw.bundle.js',
];

/**
 * Install: pre-cache the app shell.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

/**
 * Activate: remove outdated caches.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

/**
 * Fetch: serve cache-first, revalidating in the background.
 */
self.addEventListener('fetch', (event) => {
  const {request} = event;
  try {
    const url = new URL(request.url);
    // Let webpack-served background images bypass the SW cache.
    if (request.destination === 'image' && url.pathname.includes('/images/')) {
      return;
    }
  } catch (err) {
    // If URL parsing fails, fall back to default cache handling.
  }

  event.respondWith(CacheHelper.revalidateCache(request));
});
