/* Cerebral Staff Dashboard - service worker */
const CACHE = 'ccc-staff-v2';
const ASSETS = [
  './', './index.html', './logo.png', './manifest.webmanifest',
  './icon-192.png', './icon-512.png'
];
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); })
  );
});
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e){
  var req = e.request;
  var u = new URL(req.url);
  // Let Supabase + CDN (cross-origin) and non-GET requests go straight to the network.
  if (u.origin !== location.origin || req.method !== 'GET') return;

  var isDoc = req.mode === 'navigate' || u.pathname.endsWith('/') || u.pathname.endsWith('index.html');
  if (isDoc) {
    // Network-first for the app page so updates always land; fall back to cache offline.
    e.respondWith(
      fetch(req).then(function(resp){
        var cp = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(req, cp); });
        return resp;
      }).catch(function(){
        return caches.match(req).then(function(r){ return r || caches.match('./index.html'); });
      })
    );
    return;
  }
  // Cache-first for static assets (icons, logo, manifest).
  e.respondWith(
    caches.match(req).then(function(r){
      return r || fetch(req).then(function(resp){
        var cp = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(req, cp); });
        return resp;
      });
    })
  );
});
