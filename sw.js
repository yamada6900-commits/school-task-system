const CACHE_NAME = "cute-task-v1";

const FILES = [
    "./",
    "./index.html"
];


/* =========================
   INSTALL
========================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(
                    cache =>
                        cache.addAll(FILES)
                )

        );

        self.skipWaiting();

    }
);


/* =========================
   ACTIVATE
========================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(
                    keys =>
                        Promise.all(
                            keys
                                .filter(
                                    key =>
                                        key !== CACHE_NAME
                                )
                                .map(
                                    key =>
                                        caches.delete(key)
                                )
                        )
                )

        );

        self.clients.claim();

    }
);


/* =========================
   FETCH
========================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(
                    response =>
                        response ||
                        fetch(event.request)
                )

        );

    }
);


/* =========================
   PUSH NOTIFICATION
========================= */

self.addEventListener(
    "push",
    event => {

        let data = {

            title:
                "🔔 งานใกล้ถึงกำหนด!",

            body:
                "มีงานที่ต้องส่งนะครับ 💗",

            icon:
                "./icon.png",

            badge:
                "./icon.png"

        };


        if(event.data){

            try{

                data =
                    event.data.json();

            }
            catch(error){

                data.body =
                    event.data.text();

            }

        }


        event.waitUntil(

            self.registration
                .showNotification(
                    data.title,
                    {

                        body:data.body,

                        icon:data.icon,

                        badge:data.badge,

                        vibrate:[
                            200,
                            100,
                            200
                        ],

                        tag:
                            "school-task",

                        renotify:true

                    }
                )

        );

    }
);


/* =========================
   CLICK NOTIFICATION
========================= */

self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();


        event.waitUntil(

            clients
                .matchAll({
                    type:"window",
                    includeUncontrolled:true
                })
                .then(
                    clientList => {

                        for(
                            const client
                            of clientList
                        ){

                            if(
                                "focus"
                                in client
                            ){

                                return client.focus();

                            }

                        }


                        if(
                            clients.openWindow
                        ){

                            return clients.openWindow(
                                "./"
                            );

                        }

                    }
                )

        );

    }
);
