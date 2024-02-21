
const shareScreen = async () => {
    const options = {
        video: true,
        audio: false,
        surfaceSwitching: 'include',  // include (or) exclude
    }

    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
    } catch (error) {
        console.log('Error while sharing the screen:\n', error);
    }

    // we don't handle all button paths.
    changeButtons([
        'green', 'green', 'blue', 'blue', 'green', 'green', 'green', 'green'
    ]);
}