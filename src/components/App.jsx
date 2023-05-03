import React from 'react';
import '../styles/App.css';
import {Container, styled} from "@mui/material";
import LoginPage from "./LoginPage.jsx";
import Root from "./themed_components/Root.jsx";


function App() {
    return (
        <Root>
            <Container>
                <LoginPage/>
            </Container>
        </Root>

    );

}

export default App;
