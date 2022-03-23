// Files to cache
const cacheKey = 'helloworld-pwa-' + Date.now().toString().substring(7);
const appShellFiles = [
    './index.html',
    './helloworld-pwa-v5.css',
    './helloworld-pwa-v1.js',
    './helloworld-pwa.json',
    './dbr-big.png',
    './dbr-bigger.png'
];
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheKey).then(function(cache) {
      return cache.addAll(appShellFiles)
    }).then(function() {
      return self.skipWaiting();
    })
  )
})

self.addEventListener('activate', function(e) {
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheKey) {
        var deletePromise = caches.delete(name);
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  e.waitUntil(
    Promise.all([cacheDeletePromises]
    ).then(() => {
      return self.clients.claim();
    })
  )
})

self.addEventListener('fetch', function(e) {
  console.log('fetch');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url);
    })
  )
})