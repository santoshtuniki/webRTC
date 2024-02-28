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

io.on("connection", (socket) => {
    console.log('Socket', socket.id);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

expressServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})