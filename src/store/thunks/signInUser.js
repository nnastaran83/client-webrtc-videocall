import {createAsyncThunk} from "@reduxjs/toolkit";
import {auth} from "../../firebase_module";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

/**
 * Sign in the user
 */
const signInUser = createAsyncThunk("auth/signInWithEmailAndPassword", async ({email, password}, {rejectWithValue}) => {
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return userCredential.user.toJSON();
        }).catch((error) => {
            return rejectWithValue(error.message);
        });
    }
);


export {signInUser};