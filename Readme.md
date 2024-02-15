#### What is WebRTC ?

##### WebRTC (Web Real-Time Communication) is a technology that enables Web applications and sites to capture and optionally stream audio and/or video media, as well as to exchange arbitrary data between browsers without requiring an intermediary. 

##### To share data and perform teleconferencing peer-to-peer, without requiring that the user install plug-ins or any other third-party software.

    Talks between one browser to another.

##### We can break down webRTC into 2 parts:

    1. getUserMedia

            Browser can access Camera, Microphone & Screen

    2. RTC Peer Connection

            Ability to stream

##### Generally, you will access the MediaDevices singleton object using navigator.mediaDevices, like this

    '''
        const constraints = {
            audio: true,
            video: true,
        };

        async function getMedia(constraints) {
            let stream = null;

            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                /* use the stream */
            } catch (err) {
                /* handle the error */
            }
        }
    '''

##### Media constraints include:

    

#####




#### References:

##### [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

##### [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

##### [Udemy](https://www.udemy.com/share/109xoy3@XaqwSTKPHaGE3sODp4cPc--pmaOhLFvrcRPTj0ujhmmT5QK1Tkbts5O4_3JSTR-pTQ==/)
