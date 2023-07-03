import React, {useRef} from 'react';

const usePeerConnection = () => {
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
    const pc = useRef(new RTCPeerConnection(servers));
    return [pc];
};

export {usePeerConnection};