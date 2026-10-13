// Service worker do Apita! — gerado por build_pwa.py. Guarda o app para abrir sem internet.
const VERSAO = 'apita-7a2ebe2a46';
const ARQUIVOS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(VERSAO).then(c=>c.addAll(ARQUIVOS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSAO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', (e)=>{
  const r = e.request;
  if(r.method !== 'GET') return;
  const url = new URL(r.url);
  if(url.origin !== location.origin) return;
  if(r.mode === 'navigate'){
    // com internet: pega a versao nova e atualiza o cache; sem internet: abre a versao guardada
    e.respondWith(fetch(r).then(res=>{ const copia = res.clone(); caches.open(VERSAO).then(c=>c.put('index.html', copia)); return res; })
      .catch(()=>caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit || fetch(r).then(res=>{ const copia = res.clone(); caches.open(VERSAO).then(c=>c.put(r, copia)); return res; })));
});
