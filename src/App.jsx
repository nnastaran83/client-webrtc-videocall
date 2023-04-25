import React from 'react';
import './App.css';
import {Container} from "@mui/material";
import LoginPage from "./components/LoginPage.jsx";


function App() {

    return (
        <Container maxWidth={"sm"}>
            <LoginPage/>
        </Container>
    );

}

export default App;
