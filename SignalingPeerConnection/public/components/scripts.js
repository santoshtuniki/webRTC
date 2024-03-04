const userName = 'Sai-' + Math.floor(Math.random() * 100000);
const password = 'x';
document.querySelector("#user-name").innerHTML = userName;

const socket = io("https://localhost:3000", {
    auth: {
        userName, password
    }
});

const localVideoEl = document.querySelector("#local-video");
const remoteVideoEl = document.querySelector("#remote-video");

let localStream;
let remoteStream;
let peerConnection;
let didIOffer = false;

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

const fetchUserMedia = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            localVideoEl.srcObject = stream;
            localStream = stream;
            resolve();
        } catch (error) {
            console.log(error);
            reject();
        }
    })
};

const createPeerConnection = (offerObj) => {
    return new Promise(async (resolve, reject) => {
        peerConnection = await new RTCPeerConnection(peerConfiguration);

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        // create iceCandidates
        peerConnection.addEventListener("icecandidate", (e) => {
            if (e.candidate) {
                socket.emit('sendIceToSignalingServer', {
                    iceCandidate: e.candidate,
                    iceUserName: userName,
                    didIOffer
                })
            }
        })

        if (offerObj) {
            // should be stable, as no setDesc has been run yet.
            console.log(peerConnection.signalingState);

            // won't be true when called from call();
            await peerConnection.setRemoteDescription(offerObj.offer);

            // should be have-remote-offer, as CLENT2 has set remoteDesc on offer.
            console.log(peerConnection.signalingState);
        }
        resolve()
    })
};

const call = async (e) => {
    await fetchUserMedia();

    // peerConnection is all set with STUN servers sent over 
    await createPeerConnection();

    // create offer time
    try {
        console.log('create offer');
        // create SDP from CALLER
        const offer = await peerConnection.createOffer();
        console.log('Offer:\n',offer);

        // Triggers iceCandidate event
        peerConnection.setLocalDescription(offer);
        didIOffer = true;

        // send offer to signaling server
        socket.emit("newOffer", offer);
    } catch (error) {
        console.log(error);
    }
};


const answerOffer = async (offerObj) => {
    await fetchUserMedia();
    await createPeerConnection(offerObj);

    // create SDP from ANSWERER
    const answer = await peerConnection.createAnswer({});

    // This is CLIENT2 & CLIENT2 uses the answer as localDesc
    peerConnection.setLocalDescription(answer);

    console.log('offerObj:\n',offerObj);
    console.log('Answer:\n',answer);

    // should be have-local-pranswer, as CLENT2 has set localDesc to it's answer (but it won't be).
    console.log(peerConnection.signalingState);
};


document.querySelector("#call").addEventListener("click", call);