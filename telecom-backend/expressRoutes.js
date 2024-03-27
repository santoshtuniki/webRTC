// All our express stuff happens here (Routes)

const app = require("./server").app;

app.get("/test", (req, res) => {
    res.send("This is a test router");
})