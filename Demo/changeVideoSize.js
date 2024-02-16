const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

const changeVideoSize = () => {
    stream.getTracks().forEach((track) => {
        const capabilities = track.getCapabilities();
        console.log(capabilities);
    })
}

