// This is where we create express & socket.io server

const fs = require("fs");
const https = require("https");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");

const key = fs.readFileSync("./certs/create-cert-key.pem");
const cert = fs.readFileSync("./certs/create-cert.pem");

const app = express();
app.use(express.static(__dirname + "/public"));

const expressServer = https.createServer({ key, cert }, app);
const io = socketIO(expressServer, {
    cors: [
        'https://localhost:3000',
        'https://localhost:3001',
        'https://localhost:3002'
    ]
});

expressServer.listen(9000, () => {
    console.log('Server is running on port 9000.');
});

module.exports = { io, expressServer, app };