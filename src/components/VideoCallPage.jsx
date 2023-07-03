import React from "react";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Box, Grid, IconButton, Stack} from "@mui/material";
import JoinButton from "./buttons/JoinButton.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VideoContainer from "./VideoContainer.jsx";
import VideoItem from "./VideoItem.jsx";
import DropdownMenu from "./DropdownMenu.jsx";
import {db} from "../firebase";
import {
    collection,
    doc,
    onSnapshot,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import {usePeerConnection} from "../hooks/usePeerConnection.js";


/**
 * Video Calling Page using WebRTC
 * @returns {JSX.Element}
 * @constructor
 */
function VideoCallPage() {
    const localStreamRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const remoteVideo = useRef(null);
    const [joinedCall, setJoinedCall] = useState(false);
    const [pc] = usePeerConnection();
    const sendSignalChannel = useRef(null);
    const currentUser = useSelector((state) => state.login.user);


    useEffect(() => {
        startLocalStream();

    }, [pc]);


    useEffect(() => {
        // Handle page visibility change
        const listener = () => {
            if (document.hidden) {
                console.log("hidden")
                stopStreamedVideo(localStreamRef.current);
            } else {
                console.log("shown")
                startLocalStream();
            }
        };
        if (!joinedCall) {
            document.addEventListener("visibilitychange", listener);
        }


        // cleanup
        return () => document.removeEventListener("visibilitychange", listener);
    }, [localStream, joinedCall]);


    /**
     * Open the webcam
     * @param constraints
     * @returns {Promise<MediaStream>}
     */
    const openMediaDevices = async (constraints) => {
        return await navigator.mediaDevices.getUserMedia(constraints);
    };


    /**
     * Start the local video stream
     * @returns {Promise<void>}
     */
    const startLocalStream = async () => {
        // stop the previous stream before starting a new one
        stopStreamedVideo(localStreamRef.current);

        // start the new stream
        try {
            localStreamRef.current.srcObject = await openMediaDevices({
                'video': true,
                'audio': true
            });
            console.log('Got MediaStream:', localStreamRef.current.srcObject);
            // Pushing tracks from local stream to peerConnection
            localStreamRef.current.srcObject.getTracks().forEach((track) => {
                pc.current.addTrack(track, localStreamRef.current.srcObject);
            });


        } catch (error) {
            console.error('Error accessing media devices.', error);
        }

        setLocalStream(localStreamRef.current.srcObject);
    };

    const addRemoteStream = async () => {
        // initializing the remote server to the media stream
        const remoteStream = new MediaStream();

        remoteVideo.current.srcObject = remoteStream;

        pc.current.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                console.log("Adding track to remoteStream", track);
                remoteStream.addTrack(track);
            });
            remoteVideo.current.srcObject = remoteStream;
        };
        pc.current.oniceconnectionstatechange = (e) => {
            console.log("ICE connection state change: ", pc.current.iceConnectionState);
            if (pc.current.iceConnectionState === "connected" || pc.current.iceConnectionState === "completed") {
                console.log("connected to ice server");

            } else if (pc.current.iceConnectionState === "disconnected" || pc.current.iceConnectionState === "failed" || pc.current.iceConnectionState === "closed") {
                console.log("disconnected from ice server");
            }
        };
    }

    /**
     * Stop video stream
     * @param videoElem
     */
    const stopStreamedVideo = (videoElem) => {
        if (videoElem.srcObject) {
            console.log(videoElem.srcObject)
            const stream = videoElem.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            videoElem.srcObject = null;
        }
        setLocalStream(null);

    };

    /**
     * Handles the click event of the answer button
     * @returns {Promise<void>}
     */
    const answerCall = async () => {
        //TODO: If there is no incoming call, it will not be possible to answer the call
        await addRemoteStream();
        const callId = currentUser.uid;
        // getting the data for this particular call
        const callDoc = doc(db, "calls", callId);
        const answerCandidates = collection(callDoc, "answerCandidates");
        const offerCandidates = collection(callDoc, "offerCandidates");


        // here we listen to the changes and add it to the answerCandidates
        pc.current.onicecandidate = (event) => {
            event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
        };


        pc.current.ondatachannel = (event) => {
            sendSignalChannel.current = event.channel;
            sendSignalChannel.current.onmessage = (event) => {
                console.log("Received message:", event.data);
            }
        }
        const callData = (await getDoc(callDoc)).data();

        //Extract the offer from the caller.
        const offer = callData.offer;
        //Creat a RTCSessionDescription and set it as the remote description.
        await pc.current.setRemoteDescription(offer);

        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // let data = change.doc.data();
                    //  pc.current.addIceCandidate(new RTCIceCandidate(data));
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.current.addIceCandidate(candidate);

                }
            });

        });

        // Create the answer
        const answerDescription = await pc.current.createAnswer();

        //Set the answer as the local description, and update the database.
        await pc.current.setLocalDescription(answerDescription);

        // answer config
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, {answer});
        setJoinedCall(true);
    };

    /**
     * send a approval or denial message to the caller
     * @param msg
     */
    const sendSignalMessage = (msg) => {
        if (sendSignalChannel.current) {
            try {
                sendSignalChannel.current.send(msg);
            } catch (error) {
                console.log(error);
            }
        }

    };


    /**
     * Hang up the video call
     */
    const hangupCall = () => {
        //TODO: complete this function
        setJoinedCall(false);

    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                maxHeight: "100%",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Grid
                container
                sx={{
                    height: "100%",
                    maxHeight: "100%",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <VideoContainer>
                        <VideoItem
                            component={"video"}
                            sx={{
                                transform: "scale(-1, 1)",
                            }}
                            id="webcamVideo"
                            autoPlay
                            playsInline
                            ref={localStreamRef}
                        ></VideoItem>
                    </VideoContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign: "center"}}>
                    <VideoContainer>
                        <VideoItem
                            component={"video"}
                            id="remoteVideo"
                            autoPlay
                            playsInline
                            ref={remoteVideo}
                        ></VideoItem>
                    </VideoContainer>
                </Grid>
            </Grid>

            <Stack
                spacing={3}
                sx={{position: "absolute", bottom: 0, right: 0, padding: "1rem"}}
            >

                <IconButton onClick={() => sendSignalMessage("Access approved!")} sx={{color: "#1fe600"}}>
                    <ThumbUpIcon fontSize="large"/>
                </IconButton>

                <IconButton onClick={() => sendSignalMessage("Access denied!")} sx={{color: "#FF0000"}}>
                    <ThumbDownIcon fontSize="large"/>
                </IconButton>

                <JoinButton
                    id="hangupButton"
                    bgcolor={joinedCall ? "#FF0000" : "#00FF00"}
                    hovercolor={joinedCall ? "#930000" : "#009900"}
                    onClick={joinedCall ? hangupCall : answerCall}
                    variant="contained"
                >
                    {joinedCall ? "X" : "JOIN"}
                </JoinButton>
            </Stack>

            <DropdownMenu handlePreSignOut={() => stopStreamedVideo(localStreamRef.current)}/>
        </Box>
    );
};

export default VideoCallPage;
