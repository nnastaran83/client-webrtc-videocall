// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBWLr7DrODHLbB2Zvb5o6ANvBAws0MH8_8",
  authDomain: "smart-4e774.firebaseapp.com",
  projectId: "smart-4e774",
  storageBucket: "smart-4e774.appspot.com",
  messagingSenderId: "267084890357",
  appId: "1:267084890357:web:73c058772bfe998b4f45bc",
  measurementId: "G-XLLC8D755N",
};
const app = firebase.initializeApp(firebaseConfig);
const messaging = app.messaging();
messaging.onBackgroundMessage((message) => {
  console.log(message);
});
