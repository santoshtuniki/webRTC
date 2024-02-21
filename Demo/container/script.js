const videoEl = document.querySelector('#my-video');

let stream = null;
let mediaStream = null;

const constraints = {
    audio: true,
    video: true
}

const getMicOrCamera = async () => {
    try {
        // Get video & audio stream
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        changeButtons([
            'green', 'blue', 'blue', 'grey', 'grey', 'grey', 'grey', 'grey'
        ]);
    } catch (error) {
        console.log('User denied access to constraints');
        console.log('getUserMedia error:\n', error)
    }
};

const showMyFeed = () => {
    if (!stream) {
        alert('Stream is loading...');
        return;
    }
    // This will set our stream into our video tag
    videoEl.srcObject = stream;
    changeButtons([
        'green', 'green', 'blue', 'blue', 'blue', 'grey', 'grey', 'blue'
    ]);
};

const stopMyFeed = () => {
    if (!stream) {
        alert('Stream is loading...');
        return;
    }
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        // Dissosciates the track with the source
        track.stop();
    });
    changeButtons([
        'blue', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'
    ]);
};


document.querySelector('#share').addEventListener('click', (e) => getMicOrCamera());

document.querySelector('#show-video').addEventListener('click', (e) => showMyFeed());

document.querySelector('#stop-video').addEventListener('click', (e) => stopMyFeed());

document.querySelector('#change-size').addEventListener('click', (e) => changeVideoSize());

document.querySelector('#start-record').addEventListener('click', (e) => startRecording());

document.querySelector('#stop-record').addEventListener('click', (e) => stopRecording());

document.querySelector('#play-record').addEventListener('click', (e) => playRecording());

document.querySelector('#share-screen').addEventListener('click', (e) => shareScreen());

