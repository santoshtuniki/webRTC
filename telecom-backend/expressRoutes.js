// All our express stuff happens here (Routes)

const app = require("./server").app;
const jwt = require('jsonwebtoken');
require("dotenv").config();

app.get("/user-link", (req, res) => {
    // data for end-user's appointment
    const apptData = {
        professionalFullName: "Santosh T",
        apptDate: Date.now()
    };

    // encode this data into a token
    const token = jwt.sign(apptData, process.env.SECRET_KEY);

    res.send(`https://localhost:3000/join-video?token=${token}`);
})

app.get("/validate-link", (req, res) => {
    // get token from url
    const token = req.query.token;

    // decode the token
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    res.send(decodedData);
})