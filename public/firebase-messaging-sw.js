// Scripts for firebase and firebase messaging
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAQ5zZXG0NS864OeXcRWib0zWzMFIxoaVs",
    authDomain: "smartpro-e44ec.firebaseapp.com",
    projectId: "smartpro-e44ec",
    storageBucket: "smartpro-e44ec.appspot.com",
    messagingSenderId: "992154298820",
    appId: "1:992154298820:web:0eb08f07044ac8d3719c91",
    measurementId: "G-DMSN2VRVZ8"
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener(
    "notificationclick",
    (event) => {
        if (event.action === "accept") {
            console.log("Accept was clicked");
            event.waitUntil(
                clients
                    .matchAll({
                        type: "window",
                    })
                    .then((clientList) => {
                        for (const client of clientList) {
                            if (client.url === "/" && "focus" in client) return client.focus();
                        }
                        if (clients.openWindow) return clients.openWindow("/");
                    })
            );
        } else if (event.action === "decline") {
            event.notification.close();

        }
    },
    false
);
messaging.onBackgroundMessage((payload) => {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = "Smart";
    const notificationOptions = {
        body: "Incoming Video Call.",
        icon: "./logo192.svg",
        actions: [
            {
                action: "accept",
                title: "Accept"

            },
            {
                action: "decline",
                title: "Decline"
            }
        ]
    };


    self.registration.showNotification(notificationTitle, notificationOptions);
});
