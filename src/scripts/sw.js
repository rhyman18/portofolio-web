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
  './34.a26710958918b38d40b9.bundle.js',
  './236.9e63217adcfc69c4ddd9.bundle.js',
  './511.a59244f883ee4633b14f.bundle.js',
  './823.2469d84116d2dbd8dfda.bundle.js',
  './aos.95a4b5668b2db1e0cd94.bundle.js',
  './index~9f64d895.8bf472d74da9b1630615.bundle.js',
  './index~a51fa3f5.486a6f0eef8c063c1586.bundle.js',
  './index~c630493f.d1a20dc237e352a51512.bundle.js',
  './lazysizes.2a84067584e3d4ab540f.bundle.js',
  './runtime.abb5f87e46f4ec10cac6.bundle.js',
  './shared.42fcf45bacc7b077a53d.bundle.js',
  './style~219730e5.79659079fd6165476ed7.bundle.js',
  './style~f6563343.8b879edde4b8dc749a41.bundle.js',
  './workbox-927b2f12.js',
  './aos.4e5026e8aaa232cd3432.bundle.css',
  './style~219730e5.7a669ef424943ab0891b.bundle.css',
  './style~f6563343.db695c48106a8a13559a.bundle.css',
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
