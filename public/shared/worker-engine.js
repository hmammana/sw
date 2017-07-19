self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(self.CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      var CACHE_WHITELIST = self.CACHE_WHITELIST;
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_WHITELIST.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
