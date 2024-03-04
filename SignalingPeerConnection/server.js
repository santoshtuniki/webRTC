const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("https");
const fs = require("fs");

const app = express();
app.use(express.static(__dirname + '/public'));

// we need key & cert to run https
const key = fs.readFileSync("create-cert-key.pem");
const cert = fs.readFileSync("create-cert.pem");

// create https server
const expressServer = createServer({ key, cert }, app);

// create socket.io server
const io = new Server(expressServer);

/*
    Offers will contain objects {} namely:
        offerUserName
        offer
        offerIceCandidate
        answerUserName
        answer
        answerIceCandidate
*/
const offers = [];

/*
    { socketId, userName }
*/
const connectedSockets = [];

io.on("connection", (socket) => {
    console.log('Socket', socket.id);
    const { userName, password } = socket.handshake.auth;

    if (password !== 'x') {
        socket.disconnect(true);
        return;
    }

    connectedSockets.push({
        socketId: socket.id,
        userName
    })

    // A new client joined. If offers available, emit them out.
    if(offers.length){
        socket.emit("availableOffers", offers);
    }

    socket.on("newOffer", (newOffer) => {
        offers.push({
            offerUserName: userName,
            offer: newOffer,
            offerIceCandidate: [],
            answerUserName: null,
            answer: null,
            answerIceCandidate: []
        })

        // send out all the connected sockets except CALLER
        socket.broadcast.emit("newOfferAwaiting", offers.slice(-1));
    })

    socket.on("sendIceToSignalingServer", (iceObject) => {
        const { iceCandidate, iceUserName, didIOffer } = iceObject;

        if (didIOffer) {
            const offerInOffers = offers.find((o) => o.offerUserName === iceUserName);
            if (offerInOffers) {
                offerInOffers.offerIceCandidate.push(iceCandidate);
            }
        }
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

expressServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})