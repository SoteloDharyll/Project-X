const CACHE_NAME = 'arsenal-pwa-v5';
const APP_ROOT = '/Project-X/arsenal/';
const CORE_ASSETS = [APP_ROOT, APP_ROOT + 'index.html', APP_ROOT + 'manifest.webmanifest', APP_ROOT + 'icon.svg', APP_ROOT + 'icon-192.png', APP_ROOT + 'icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok && new URL(request.url).pathname.startsWith(APP_ROOT)) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request).then(cached => cached || (request.mode === 'navigate' ? caches.match(APP_ROOT) : undefined)))
  );
});