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
    if (offers.length) {
        socket.emit("availableOffers", offers);
    }

    socket.on("newAnswer", (offerObj, ackFunction) => {
        // console.log(offerObj);

        // emit answer to CLIENT1 via socketId
        const socketToAnswer = connectedSockets.find((s) => s.userName === offerObj.offerUserName);
        if (!socketToAnswer) {
            console.log('No matching socket');
            return;
        }

        // CLIENT1 socket.id found
        const socketIdToAnswer = socketToAnswer.socketId;

        // find offer we want to emit
        const offerToUpdate = offers.find((offer) => offer.offerUserName === offerObj.offerUserName);
        if (!offerToUpdate) {
            console.log('No offer found');
            return;
        }

        // send back to the answerer ice candidates we collected.
        ackFunction(offerToUpdate.offerIceCandidate);

        offerToUpdate.answer = offerObj.answer;
        offerToUpdate.answerUserName = userName;
        socket.to(socketIdToAnswer).emit("answerResponse", offerToUpdate);
    })

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
            // This ICE is sent from the offerer. Send it to the answerer.
            const offerInOffers = offers.find((o) => o.offerUserName === iceUserName);
            if (offerInOffers) {
                offerInOffers.offerIceCandidate.push(iceCandidate);
                // 1. when answerer answers, all the ice candidates are sent
                // 2. Any candidates that come after the offer is answered, will be passed through
                if (offerInOffers.answerUserName) {
                    // pass it through
                    const socketToSendTo = connectedSockets.find((s) => s.userName === offerObj.answerUserName);
                    if (socketToSendTo) {
                        socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
                    } else {
                        console.log('Ice candidate received, but could not find the answerer.');
                    }
                }
            }
        } else {
            const offerInOffers = offers.find((offer) => offer.answerUserName === iceUserName);

            // This ICE is sent from the answerer. Send it to the offerer.
            const socketToSendTo = connectedSockets.find((s) => s.userName === offerInOffers.offerUserName);
            if (socketToSendTo) {
                socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
            } else {
                console.log('Ice candidate received, but could not find the offerer.');
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