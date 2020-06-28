const staticCacheName= 'site-static-v3';
const assets = [
    '/myFirstTestPage/',
    '/myFirstTestPage/index.html',
    '/myFirstTestPage/dateTimeConvertor.css',
    '/myFirstTestPage/finalDateFunctions.js',
    '/myFirstTestPage/app.js'
];
//install service worker
self.addEventListener('install',evt=>{
    //console.log('Service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log('Caching Shell Assets');
            cache.addAll(assets);
        })
    );
});
//Activate Event
self.addEventListener('activate',evt=>{
    console.log('Service worker has been activated');
    evt.waitUntil(
        //This a
        caches.keys().then(
            keys=>{
                //console.log(keys);
                return Promise.all(keys
                    .filter(key => key!==staticCacheName)
                    .map(key => caches.delete(key))
                )
            }
        )
    );
});

//Fetch Event
self.addEventListener('fetch',evt=>{
    //console.log('Fetch Event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});