const CACHE_LIST = [
    "/",
    "/index.html",
    "https://unpkg.com/react@16.8.4/umd/react.production.min.js",
    "https://unpkg.com/react-dom@16.8.4/umd/react-dom.production.min.js",
    "https://unpkg.com/axios/dist/axios.min.js",
    "components/index.js"
];

const STATIC_CACHE_VERSION = `static-v1-${new Date().getTime()}`


self.addEventListener('install', function(event) {
    console.log(caches)
    console.log("SW Install Event: Is in the process");
    const onSuccessCachesOpen = (cache) => {
        console.log(cache)
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

    // Google Chrome browseer -> console -> application -> cache -> cache storage
    const onSuccessCachesKeys = (cacheNames) => {
        // List of cachenames generated by STATIC_CACHE_VERSION
        console.log(cacheNames)
        // Loop through all the keys stored in cache storage
        return Promise.all(
            cacheNames.map((cache) => {
                if (cache !== STATIC_CACHE_VERSION) {
                    console.log(`SW Activate Event: Remove the cache: ${cache}`);
                    return caches.delete(cache)
                }
            })
        )
    }

    event.waitUntil(caches.keys().then(onSuccessCachesKeys))
})

self.addEventListener('fetch', (event) => {
    const FALLBACK_URL = CACHE_LIST[0];
    console.log("SW Fetch Event: Is in the process");

    const onSuccessFetch = response => {
        if (CACHE_LIST.includes(new URL(event.request.url).pathname)) return response
            const onSuccessDynamicCacheOpen = cache => {
            cache.put(event.request.url, response.clone())
            return response
        }

        return caches
        .open(STATIC_CACHE_VERSION)
        .then(onSuccessDynamicCacheOpen)
        .catch(() => caches.match(FALLBACK_URL))
    }

    const onErrorFetch = () => {
        const onSuccessCacheMatch = response => {
            if (response) return response
            else return caches.match(FALLBACK_URL)
        }

        return caches.match(event.request).then(onSuccessCacheMatch)
    }

    event.respondWith(
        fetch(event.request)
        .then(onSuccessFetch)
        .catch(onErrorFetch)
    )
})