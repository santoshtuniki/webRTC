let stream = null;

const constraints = {
    audio: true,
    video: false
}

const getMicOrCamera = async (e) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
        console.log('User denied access to constraints');
    }
}


document.querySelector('#share').addEventListener('click', async (e) => {
    await getMicOrCamera();
})