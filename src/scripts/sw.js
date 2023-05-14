import 'regenerator-runtime';
import CacheHelper from './utils/cacheHelper';

const assetsToCache = [
  './',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png',
  './icons/apple-touch-icon.png',
  './icons/android-chrome-512x512.png',
  './icons/android-chrome-192x192.png',
  './contact.png',
  './left-icon.png',
  './right-icon.png',
  './profile.png',
  './welcome-bg.jpg',
  './index.html',
  './favicon.ico',
  './app.bundle.js',
  './site.webmanifest',
  './sw.bundle.js',
  './aos.bundle.js',
  './style.bundle.css',
  './style.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
