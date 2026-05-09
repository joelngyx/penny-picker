const CACHE_NAME = 'pennypincher-shell-v1';
const OFFLINE_URL = '/index.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/css/main.4b71303a.css',
  '/static/js/main.3ff30c1b.js',
  '/static/js/488.ec5538db.chunk.js',
  '/static/media/running-tab-icon.65572abda52f14d44eb47622e8739a26.svg',
  '/static/media/budget-icon.cb89cad2b187afd4bbce803a1b001a6f.svg',
  '/static/media/edit.08de13dd341302d136f0.svg',
  '/logo-updated-192.png',
  '/logo-updated-512.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(OFFLINE_URL, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse;
        });

      return cachedResponse || networkFetch;
    })
  );
});
