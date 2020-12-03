const CACHE_LIST = [
    '/',
    '/index.html',
    '/main.js',
    '/main.css'
]

const STATIC_CACHE_VERSION = `static-v1-${new Date().getTime()}`

self.addEventListener('install', function(event) {
    console.log("SW Install Event: Is in the process");
    const onSuccessCachesOpen = (cache) => {
        console.log("SW Install Event: Successfully opened the cache and add the cache list");
        return cache.addAll(CACHE_LIST)
    }

    // Works like async/await
    event.waitUntil(
        // caches is a global variable inside the service workers file [readily available]
        caches.open(STATIC_CACHE_VERSION).then(onSuccessCachesOpen)
    )
})


self.addEventListener('activate', (event) => {
    console.log("SW Activate Event: Is in the process")

    // Google Chrome browseer -> console.log -> application -> cache -> cache storage
    const onSuccessCachesKeys = (cacheNames) => {
        // Loop through all the keys stored in cache storage
        return Promise.all(
            cacheNames.map((cache) => {
                if (cache !== STATIC_CACHE) {
                    console.log(`SW Activate Event: Remove the cache: ${cache}`);
                    return caches.delete(cache)
                }
            })
        )
    }

    event.waitUntil(caches.keys().then(onSuccessCachesKeys))
})