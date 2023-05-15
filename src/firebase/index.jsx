import firebaseConfig from "/src/firebase/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(firebaseApp);

onMessage(messaging, (payload) => {
  console.log("payload", payload);
});

const getMessagingToken = () => {
  getToken(messaging, {
    vapidKey:
      "BEoYSAt84uere2NDQf_nu4DE-3FhTCyJHgqtMWATFfdbrz-nxneYlwKR9SeENhJ1ZBwWCTA1Oq4MVdpjERk-cKs",
  })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

export { db, auth, getMessagingToken };
