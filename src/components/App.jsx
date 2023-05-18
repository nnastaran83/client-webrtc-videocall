import React, {useState, useEffect} from "react";
import "../styles/App.css";
import {Button, Container, IconButton, Snackbar, styled} from "@mui/material";
import Login from "./Login.jsx";
import Root from "./Root.jsx";
import VideoCallPage from "./VideoCallPage.jsx";
import {auth, onMessageListener} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setEmail, setUser, store, setMessage} from "../store";
import CloseIcon from "@mui/icons-material/Close";

/**
 * App Container
 * @returns {JSX.Element}
 * @component
 */
function App() {
    const [page, setPage] = useState(null);
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: "", body: ""});
    const [isTokenFound, setTokenFound] = useState(false);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setShow(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );
    onMessageListener()
        .then((payload) => {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            console.log("mimim", payload);
        })
        .catch((err) => console.log("failed: ", err));

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setEmail(user.email));
                userToJson(user).then((currentUser) => {
                    dispatch(setUser(currentUser));
                });

                setPage(<VideoCallPage/>);
            } else {
                setPage(<Login/>);
            }
        });
    }, []);

    const userToJson = async (user) => {
        user = await user.toJSON();
        return user;
    };

    return (
        <Root>
            <Snackbar
                open={show}
                autoHideDuration={6000}
                onClose={() => setShow(false)}
                message={notification.title}
                action={action}
            />
            {console.log(store.getState())}
            <Container sx={{maxWidth: "100%", maxHeight: "100%"}}>
                {page}
            </Container>
        </Root>
    );
}

export default App;
