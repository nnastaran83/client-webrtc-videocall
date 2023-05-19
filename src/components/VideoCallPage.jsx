import React from "react";
import DropdownMenu from "./DropdownMenu.jsx";
import {Box, Button, Container, Grid, styled} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {db} from "../firebase";
import "../styles/VideoCallPage.css";
import Root from "./Root.jsx";

import {
    collection,
    doc,
    setDoc,
    onSnapshot,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import {store} from "../store/index.js";
import {useSelector} from "react-redux";

/**
 * Video Calling Page using WebRTC
 * @returns {JSX.Element}
 * @constructor
 */
function VideoCallPage() {
    const webcamButton = useRef(null);
    const webcamVideo = useRef(null);
    const callButton = useRef(null);
    const callInput = useRef(null);
    const answerButton = useRef(null);
    const remoteVideo = useRef(null);
    const hangupButton = useRef(null);
    const [callButtonIsEnabled, setCallButtonIsEnabled] = useState(false);
    const [answerButtonIsEnabled, setAnswerButtonIsEnabled] = useState(false);
    const [webcamButtonIsEnabled, setWebcamButtonIsEnabled] = useState(true);
    const [hangupButtonIsEnabled, setHangupButtonIsEnabled] = useState(false);
    const [callInputValue, setCallInputValue] = useState("");
    const currentUser = useSelector((state) => state.login.user);

    let localStream = null;
    let remoteStream = null;

    // server config
    const servers = {
        iceServers: [
            {
                urls: [
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                ], // free stun server
            },
        ],
        iceCandidatePoolSize: 10,
    };

    const [pc, setPc] = useState(new RTCPeerConnection(servers));

    useEffect(() => {
        console.log("Peer Connection Created");
        startWebCam();
    }, []);

    /**
     * Handles the click event of the webcam button
     * @returns {Promise<void>}
     */
    const startWebCam = async () => {
        // setting local stream to the video from our camera

        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        // Pushing tracks from local stream to peerConnection
        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        // displaying the video data from the stream to the webpage
        webcamVideo.current.srcObject = localStream;

        // initalizing the remote server to the mediastream
        remoteStream = new MediaStream();

        remoteVideo.current.srcObject = remoteStream;

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                console.log("Adding track to remoteStream", track);
                remoteStream.addTrack(track);
            });
            remoteVideo.current.srcObject = remoteStream;
        };

        // enabling and disabling interface based on the current condition
        setCallButtonIsEnabled(true);
        setAnswerButtonIsEnabled(true);
        setWebcamButtonIsEnabled(false);
    };

    /**
     * Handles the click event of the answer button
     * @returns {Promise<void>}
     */
    const handleAnswerButtonClick = async () => {
        const callId = currentUser.uid;

        // getting the data for this particular call
        const callDoc = doc(collection(db, "calls"), callId);
        const answerCandidates = collection(callDoc, "answerCandidates");
        const offerCandidates = collection(callDoc, "offerCandidates");

        // here we listen to the changes and add it to the answerCandidates
        pc.onicecandidate = (event) => {
            event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
        };

        const callData = (await getDoc(callDoc)).data();

        // setting the remote video with offerDescription
        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        // setting the local video as the answer
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answerDescription));

        // answer config
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, {answer});

        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });
        setHangupButtonIsEnabled(true);
    };

    return (
        <Box sx={{height: "100%", width: "100%", maxHeight: "100%", maxWidth: "100%"}}>
            <Container>
                <Box sx={{position: "fixed", top: 0, right: 0}}>
                    <DropdownMenu/>
                </Box>

                <Grid container rowSpacing={1} columnSpacing={1} sx={{maxHeight: "100%"}}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box sx={{width: "100%", height: "100%"}}>

                            <video
                                style={{
                                    aspectRatio: "1/1",
                                    borderRadius: 5,
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    backgroundColor: "#0A0A0A",
                                    transform: "scale(-1, 1)",

                                }}
                                id="webcamVideo"
                                autoPlay
                                playsInline
                                ref={webcamVideo}
                            ></video>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Box sx={{width: "100%", height: "100%"}}>

                            <video
                                style={{
                                    aspectRatio: "1/1",
                                    borderRadius: 5,
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    backgroundColor: "#0A0A0A",


                                }}
                                id="remoteVideo"
                                autoPlay
                                playsInline
                                ref={remoteVideo}
                            ></video>
                        </Box>

                    </Grid>
                </Grid>
                <Grid container style={{position: "sticky", bottom: 0, paddingBottom: "1rem", paddingTop: "1rem"}}>
                    <Grid item xs={4} md={4} lg={4} sx={{textAlign: "right"}}>

                        <Button
                            id="answerButton"
                            onClick={handleAnswerButtonClick}
                            disabled={!answerButtonIsEnabled}
                            ref={answerButton}
                            style={{
                                backgroundColor: `#00DE00`
                            }} variant="contained">JOIN</Button>

                    </Grid>
                    <Grid item xs={4} md={4} lg={4} sx={{textAlign: "center"}}>
                        <Button
                            id="hangupButton"
                            ref={hangupButton}
                            disabled={!hangupButtonIsEnabled}
                            style={{
                                backgroundColor: `#FF0000`,
                            }}
                            variant="contained"
                        >
                            X
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} sx={{textAlign: "left"}}>
                        <Button
                            id="approveButton"
                            disabled={!hangupButtonIsEnabled}
                            style={{
                                backgroundColor: `#715DFF`,
                            }}
                            variant="contained"
                        >
                            App
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>


    );
}


export default VideoCallPage;
