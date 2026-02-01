import 'regenerator-runtime';
import CacheHelper from './utils/cacheHelper';

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

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
