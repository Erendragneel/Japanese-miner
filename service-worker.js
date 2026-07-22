const CACHE='japanese-miner-v6.1.1';
const ASSETS=['./','./index.html','./styles.css?v=6.1.1','./v5.css?v=6.1.1','./v6.css?v=6.1.1','./game.js?v=6.1.1','./v5.js?v=6.1.1','./v6.js?v=6.1.1','./manifest.webmanifest','./assets/favicon.svg','./assets/avatar/anime-miner-v1.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));});

