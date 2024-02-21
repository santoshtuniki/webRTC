const audioInput = document.querySelector('#audio-input');
const audioOutput = document.querySelector('#audio-output');
const videoInput = document.querySelector('#video-input');

const getDevices = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        // console.log(devices);
        devices.forEach((device) => {
            // create option tag
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label;

            if (device.kind === 'audioinput') {
                audioInput.appendChild(option);
            } else if (device.kind === 'audiooutput') {
                audioOutput.appendChild(option);
            } else {
                videoInput.appendChild(option);
            }
        });
    } catch (error) {
        console.log('Error while getting media devices:\n', error);
    }

};

const changeAudioInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio: { deviceId: { exact: deviceId } },
        video: true,
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log('Audio input device changed');
    } catch (error) {
        console.log('Error while changing audio input device:\n', error);
    }
};

const changeAudioOutput = async (e) => {
    const deviceId = e.target.value;
    try {
        await videoEl.setSinkId(deviceId);
        console.log('Audio output device changed');
    } catch (error) {
        console.log('Error while changing audio output device:\n', error);
    }
};

const changeVideoInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } },
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log('Video input device changed');
    } catch (error) {
        console.log('Error while changing video input device:\n', error);
    }
};


// Runs on load
getDevices();