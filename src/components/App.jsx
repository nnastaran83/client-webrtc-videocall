import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { Container, styled } from "@mui/material";
import LoginPage from "./LoginPage.jsx";
import Root from "./themed_components/Root.jsx";
import VideoCallPage from "./VideoCallPage.jsx";
import useAuthState from "../hooks/useAuthState"; // Import the custom hook

/**
 * App Container
 * @returns {JSX.Element}
 * @component
 */
function App() {
  const [user, setUser] = useAuthState();
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      setPage(<VideoCallPage />);
    } else {
      setPage(<LoginPage />);
    }
  }, [user]);

  return (
    <Root>
      <Container>{page}</Container>
    </Root>
  );
}

export default App;
