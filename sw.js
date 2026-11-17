const CACHE_NAME = 'fisiopro-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Fase di installazione: memorizza i file nella cache del browser
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aperta con successo');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fase di recupero: serve i file offline quando manca la connessione
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Restituisce il file dalla cache se esiste, altrimenti lo scarica dalla rete
        return response || fetch(event.request);
      })
  );
});

// Aggiornamento della cache per eventuali future versioni
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
