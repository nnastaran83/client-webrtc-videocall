import React, {useState, useEffect} from "react";
import {Button, Container, IconButton, Snackbar, styled} from "@mui/material";
import Login from "./Login.jsx";
import Root from "./Root.jsx";
import VideoCallPage from "./VideoCallPage.jsx";
import {auth, onMessageListener} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
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
    const email = useSelector((state) => state.login.email);
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);


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
        <Root style={{height: "100%"}}>
            <Snackbar
                open={show}
                autoHideDuration={6000}
                onClose={() => setShow(false)}
                message={notification.title}
                action={action}
            />
            <Container sx={{height: "100%"}}>
                {page}
            </Container>
        </Root>
    );
}

export default App;
