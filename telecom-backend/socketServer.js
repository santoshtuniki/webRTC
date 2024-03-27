// All our socketServer stuff happens here

const io = require("./server").io;

io.on("connection", (socket) => {
    console.log('Socket connected', socket.id);
})