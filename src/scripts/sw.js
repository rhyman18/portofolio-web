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
  './contact.75be82d57295a15d4e7e.webp',
  './left-icon.2a90e08c9e3689c73ef8.webp',
  './right-icon.9623c9d49768af9e026e.webp',
  './profile.webp',
  './welcome-bg.f9cad5f3848b8c657103.webp',
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
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
