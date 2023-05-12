import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { Container, styled } from "@mui/material";
import Login from "./Login.jsx";
import Root from "./themed_components/Root.jsx";
import VideoCallPage from "./VideoCallPage.jsx";
import { auth } from "../firebase_module";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setEmail, setUser, store } from "../store";

/**
 * App Container
 * @returns {JSX.Element}
 * @component
 */
function App() {
  const [page, setPage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setEmail(user.email));
        userToJson(user).then((currentUser) => {
          dispatch(setUser(currentUser));
        });

        setPage(<VideoCallPage />);
      } else {
        setPage(<Login />);
      }
    });
  }, []);

  const userToJson = async (user) => {
    user = await user.toJSON();
    return user;
  };

  return (
    <Root>
      <Container sx={{ maxWidth: "100vw", maxHeight: "100vh" }}>
        {page}
      </Container>
    </Root>
  );
}

export default App;
