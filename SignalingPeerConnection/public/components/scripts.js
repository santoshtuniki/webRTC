const socket = io("https://localhost:3000");

const localVideoEl = document.querySelector("#local-video");
const remoteVideoEl = document.querySelector("#remote-video");

let localStream;
let remoteStream;
let peerConnection;

// STUN servers
let peerConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302'
            ]
        }
    ]
};

const call = async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    localVideoEl.srcObject = stream;
    localStream = stream;

    // peerConnection is all set with STUN servers sent over 
    await createPeerConnection();

    // create offer time
    try {
        console.log('create offer');
        // create SDP
        const offer = await peerConnection.createOffer();
        console.log(offer);

        // Triggers iceCandidate event
        peerConnection.setLocalDescription(offer);
    } catch (error) {
        console.log(error);
    }
};

const createPeerConnection = () => {
    return new Promise(async (resolve, reject) => {
        peerConnection = await new RTCPeerConnection(peerConfiguration);

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        // create iceCandidates
        peerConnection.addEventListener("icecandidate", (e) => {
            console.log('Ice candidate found');
            console.log(e);
        });
        resolve()
    })
}

document.querySelector("#call").addEventListener("click", call);