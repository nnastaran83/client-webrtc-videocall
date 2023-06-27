import React, {useState, useEffect} from "react";
import {Fragment} from "react";
import CloseIcon from "@mui/icons-material/Close";
import Frame from "./components/Frame.jsx";
import {Button, Container, IconButton, Snackbar} from "@mui/material";
import {setEmail, setUser} from "./store/index.js";
import {auth, onMessageListener} from "./firebase/index.jsx";
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import Login from "./components/Login.jsx";
import VideoCallPage from "./components/VideoCallPage.jsx";


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

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
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


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setShow(false);
    };

    const action = (
        <Fragment>
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
        </Fragment>
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


    const userToJson = async (user) => {
        user = await user.toJSON();
        return user;
    };

    return (
        <Frame style={{height: "100%"}}>
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
        </Frame>
    );
}

export default App;
