const startRecording = () => {
    // An array to hold the blobs on playBack
    const recordedBlobs = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {

    }
    mediaRecorder.start()
};

const stopRecording = () => {

};

const playRecording = () => {

};