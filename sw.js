const CACHE_NAME = "cute-task-v2";

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(
        self.clients.claim()
    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response ||
                    fetch(event.request);

            })

    );

});
