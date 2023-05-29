import React from "react";
import DropdownMenu from "./DropdownMenu.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {useEffect, useRef, useState} from "react";
import {db} from "../firebase";
import "../styles/VideoCallPage.css";
import {store} from "../store";

import {
    collection,
    doc,
    onSnapshot,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import {useSelector} from "react-redux";
import {styled} from "@mui/material";

const VideoContainer = styled(Box)(({theme}) => ({
    width: "100%",
    textAlign: "center",

    [theme.breakpoints.up('md')]: {
        height: "100%",
        maxHeight: "100%",
    },
    [theme.breakpoints.down('md')]: {
        height: "49vh",
        maxHeight: "49vh",
    },
}));

const VideoItem = styled(Box)(({theme}) => ({
    objectFit: "cover",
    borderRadius: 5,
    width: "100%",
    height: "100vh",
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "#0A0A0A",
}));

/**
 * Video Calling Page using WebRTC
 * @returns {JSX.Element}
 * @constructor
 */
function VideoCallPage() {
    const webcamVideo = useRef(null);
    const answerButton = useRef(null);
    const remoteVideo = useRef(null);
    const hangupButton = useRef(null);
    const [answerButtonIsEnabled, setAnswerButtonIsEnabled] = useState(false);
    const [hangupButtonIsEnabled, setHangupButtonIsEnabled] = useState(false);
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
     * Handles the click event of the hangup button
     */
    const stopWebCam = () => {
        let localStream = webcamVideo.current.srcObject;
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        webcamVideo.current.srcObject = null;

    }

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
        setAnswerButtonIsEnabled(true);
    };

    /**
     * Handles the click event of the answer button
     * @returns {Promise<void>}
     */
    const handleAnswerButtonClick = async () => {
        startWebCam();


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
        <Box sx={{
            height: "100%",
            width: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>


            <Grid container rowSpacing={1} columnSpacing={1} sx={{
                height: "100%",
                maxHeight: "100%",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0

            }}>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <VideoContainer>
                        <VideoItem component={"video"}
                                   sx={{
                                       transform: "scale(-1, 1)",
                                   }}
                                   id="webcamVideo"
                                   autoPlay
                                   playsInline
                                   ref={webcamVideo}
                        ></VideoItem>
                    </VideoContainer>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <VideoContainer>
                        <VideoItem component={"video"}
                                   id="remoteVideo"
                                   autoPlay
                                   playsInline
                                   ref={remoteVideo}
                        ></VideoItem>
                    </VideoContainer>

                </Grid>
            </Grid>

            <Grid container
                  sx={{position: "absolute", bottom: 0, paddingBottom: "1rem", paddingTop: "1rem"}}>
                <Grid item xs={6} md={6} lg={6} sx={{textAlign: "center"}}>

                    <Button
                        id="answerButton"
                        onClick={handleAnswerButtonClick}
                        ref={answerButton}
                        style={{
                            backgroundColor: `#00DE00`,
                        }} variant="contained">JOIN</Button>

                </Grid>
                <Grid item xs={6} md={6} lg={6} sx={{textAlign: "center"}}>
                    <Button
                        id="hangupButton"
                        onClick={stopWebCam}
                        ref={hangupButton}
                        style={{
                            backgroundColor: `#FF0000`,
                        }}
                        variant="contained"
                    >
                        X
                    </Button>
                </Grid>

            </Grid>

            <Box sx={{position: "fixed", top: 0, right: 0}}>
                <DropdownMenu handlePreSignOut={stopWebCam}/>
            </Box>
        </Box>


    );
}


export default VideoCallPage;
