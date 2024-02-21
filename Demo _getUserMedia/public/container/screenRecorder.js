let mediaRecorder;
let recordedBlobs = []; // An array to hold the blobs on playBack

// You could also use mediaStream to record & play
const startRecording = () => {
    if (!stream) {
        alert('No current feed!');
        return;
    }
    mediaRecorder = new MediaRecorder(stream);
    // ondataavailable runs when stream ends or stops or if we ask for it
    mediaRecorder.ondataavailable = (e) => {
        recordedBlobs.push(e.data);
    }
    mediaRecorder.start();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'blue', 'grey', 'blue'
    ]);
};

const stopRecording = () => {
    if (!mediaRecorder) {
        alert('Please record before stopping!');
        return;
    }
    mediaRecorder.stop();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'blue', 'blue'
    ]);
};

const playRecording = () => {
    if (!recordedBlobs?.length) {
        alert('No recordings saved!');
        return;
    }
    const superBuffer = new Blob(recordedBlobs);
    const recordedVideoEl = document.querySelector('#other-video');
    recordedVideoEl.src = window.URL.createObjectURL(superBuffer);
    recordedVideoEl.controls = true;
    recordedVideoEl.play();
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'green', 'blue'
    ]);
};