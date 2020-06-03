// code away!
const express = require("express");

const server = express();

//middleware
server.use(express.json());

server.listen(4000, () => {
    console.log("Server Running on port 4000");
})