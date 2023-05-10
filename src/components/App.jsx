import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import {Container, styled} from "@mui/material";
import LoginPage from "./LoginPage.jsx";
import Root from "./themed_components/Root.jsx";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../firebase_module";
import VideoCallPage from "./VideoCallPage.jsx";
import {store} from '../store';

/**
 * App Container
 * @returns {JSX.Element}
 * @component
 */
function App() {
    const [page, setPage] = useState(null);
    console.log(store.getState());
    useEffect(() => {
        //TODO: In case we want the user to logout in every reload,  we use this:
        // signOut(auth)

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPage(<VideoCallPage/>);
            } else {
                setPage(<LoginPage/>);
            }
        })
    }, []);
    return (
        <Root>
            <Container>
                {page}
            </Container>
        </Root>

    );

}

export default App;
