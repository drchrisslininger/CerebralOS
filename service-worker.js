/* Cerebral Staff Dashboard - offline app shell */
const CACHE = 'ccc-staff-v1';
const ASSETS = [
  './', './index.html', './logo.png', './manifest.webmanifest',
  './icon-192.png', './icon-512.png'
];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch', function(e){
  var u = new URL(e.request.url);
  // Only handle same-origin GETs; let Supabase + CDN calls go straight to network.
  if (u.origin !== location.origin || e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      return r || fetch(e.request).then(function(resp){
        var cp = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, cp); });
        return resp;
      }).catch(function(){ return caches.match('./index.html'); });
    })
  );
});
