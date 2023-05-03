import {createAsyncThunk} from "@reduxjs/toolkit";
import {auth, handleSignIn} from "../../firebase_module";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const signInUser = createAsyncThunk("firebaseModule/signInUser", async ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
);

export {signInUser};