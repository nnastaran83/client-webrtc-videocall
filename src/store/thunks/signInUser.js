import {createAsyncThunk} from "@reduxjs/toolkit";
import {auth} from "../../firebase_module";
import {signInWithEmailAndPassword} from "firebase/auth";

/**
 * Sign in the user
 */
const signInUser = createAsyncThunk("firebaseModule/signInUser", async ({email, password}) => {
        const user = signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            // console.log(JSON.stringify(userCredential.user));
            return userCredential.user;

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        return user;

    }
);

export {signInUser};