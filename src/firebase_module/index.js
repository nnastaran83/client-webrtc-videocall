import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


/**
 * Web Firebase configuration
 * For Firebase JS SDK v7.20.0 and later, measurementId is optional
 * @see https://firebase.google.com/docs/web/setup#available-libraries
 * @type {{storageBucket: string, apiKey: string, messagingSenderId: string, appId: string, projectId: string, measurementId: string, authDomain: string}}
 */
const firebaseConfig = {
    apiKey: "AIzaSyBWLr7DrODHLbB2Zvb5o6ANvBAws0MH8_8",
    authDomain: "smart-4e774.firebaseapp.com",
    projectId: "smart-4e774",
    storageBucket: "smart-4e774.appspot.com",
    messagingSenderId: "267084890357",
    appId: "1:267084890357:web:6aa5d0b170c3dcb44f45bc",
    measurementId: "G-KQTK3EWGST",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


// To apply the default browser preference instead of explicitly setting it.
/**
 * Sign up the user
 * @param email
 * @param password
 */
const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

}

/**
 * Sign in the user
 * @param email
 * @param password
 */
const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}


/**
 * sign out the user
 */
const handleSignOut = () => {
    signOut(auth).then(() => {
        // sign
    }).catch((error) => {
        // An error happened.
    });
}

//TODO: complete this function
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
        console.log("user is signed out")
    }
});

export {db, auth, handleSignIn, handleSignUp, handleSignOut};
