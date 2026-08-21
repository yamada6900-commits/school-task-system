importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);


firebase.initializeApp({

    apiKey:
        "AIzaSyDZPsuZO1FUo3Ojp1MvKE8uO8_5MclVfX4",

    authDomain:
        "school-task-system-7231f.firebaseapp.com",

    projectId:
        "school-task-system-7231f",

    storageBucket:
        "school-task-system-7231f.firebasestorage.app",

    messagingSenderId:
        "188906340182",

    appId:
        "1:188906340182:web:70faaf5b69c0bfaa6260f7",

    measurementId:
        "G-ZR9C7Q3WFG"

});


const messaging =
    firebase.messaging();


messaging.onBackgroundMessage(
    function(payload) {

        console.log(
            "🔔 ได้รับข้อความ:",
            payload
        );


        const notificationTitle =
            payload.notification?.title ||
            "🔔 งานใกล้ถึงกำหนด!";


        const notificationOptions = {

            body:
                payload.notification?.body ||
                "มีงานที่ต้องส่งครับ 💗",

            icon:
                "./icon.png",

            badge:
                "./icon.png",

            vibrate: [
                200,
                100,
                200
            ],

            tag:
                "school-task"

        };


        self.registration
            .showNotification(
                notificationTitle,
                notificationOptions
            );

    }
);
