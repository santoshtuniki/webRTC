// module imports
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

// css imports
import './videoComponents.css';

// component imports
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";

const MainVideoPage = () => {
    // get query string finder hook
    const [searchParams, setSearchParams] = useSearchParams();
    const [apptInfo, setApptInfo] = useState({});
    const [ showCallInfo, setShowCallInfo] = useState(true);

    const smallFeedEl = useRef(null); //this is a React ref to a dom element, so we can interact with it the React way
    const largeFeedEl = useRef(null);
    // const uuidRef = useRef(null);
    // const streamsRef = useRef(null);

    useEffect(() => {
        // grab token from the query string
        const token = searchParams.get("token");
        // console.log(token);

        const fetchDecodedData = async () => {
            try {
                const response = await axios.post("https://localhost:9000/validate-link", { token });
                // console.log(response.data);
                setApptInfo(response.data);
            } catch (error) {
                console.log('Error decoding token:\n', token);
            }
        };
        fetchDecodedData();
    }, []);

    return (
        <div className="main-video-page">
            <div className="video-chat-wrapper">
                {/* Div to hold our remote video, our local video, and our chat window*/}
                <video id="large-feed" ref={largeFeedEl} autoPlay controls playsInline></video>
                <video id="own-feed" ref={smallFeedEl} autoPlay controls playsInline></video>
                {showCallInfo ? <CallInfo apptInfo={apptInfo} /> : <></>}
                <ChatWindow />
            </div>
            {/* <ActionButtons
                smallFeedEl={smallFeedEl}
                largeFeedEl={largeFeedEl}
            /> */}
        </div>
    )
};

export default MainVideoPage;