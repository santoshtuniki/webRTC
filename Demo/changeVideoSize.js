const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

const changeVideoSize = () => {
    stream.getVideoTracks().forEach(track => {
        const height = document.getElementById("vid-height").value;
        const width = document.getElementById("vid-width").value;
        const capabilities = track.getCapabilities();
        console.log(capabilities);
        
        const vConstraints = {
            height: {
                exact: height < capabilities.height.max ? height : capabilities.height.max
            },
            width: {
                exact: width < capabilities.width.max ? width : capabilities.width.max
            },
            // frameRate: 5,
            // aspectRatio: 10  // Ratio of width to height
        };
        track.applyConstraints(vConstraints)
    })
}

