const CACHE='japanese-miner-v6.1.3';
const ASSETS=['./','./index.html','./styles.css?v=6.1.3','./v5.css?v=6.1.3','./v6.css?v=6.1.3','./game.js?v=6.1.3','./v5.js?v=6.1.3','./v6.js?v=6.1.3','./manifest.webmanifest','./assets/favicon.svg','./assets/avatar/anime-miner-v1.png','./assets/avatar/masks/skin.png','./assets/avatar/masks/hair.png','./assets/avatar/masks/jacket.png','./assets/avatar/masks/pants.png','./assets/avatar/masks/gloves.png','./assets/avatar/masks/shoes.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));});

