import {initializeApp} from "firebase/app";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getToken, onMessage} from "firebase/messaging";
import {getMessaging} from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(firebaseApp);

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

const getMessagingToken = () => {
    getToken(messaging, {
        vapidKey:
        import.meta.env.VITE_APP_FIREBASE_CLOUD_MESSAGING_VAPID_KEY,
    })
        .then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                sendTokenToDB(currentToken)
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
        });
};

const sendTokenToDB = async (currentToken) => {
    const usersDoc = doc(collection(db, "users"), "nnastaran83@gmail.com"); // Main collection in firestore
    const user = {
        name: "Nastaran",
        token: currentToken.toString()
    };

    await setDoc(usersDoc, user);
}
export {db, auth, getMessagingToken};
