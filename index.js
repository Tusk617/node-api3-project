// code away!
const express = require("express");
const server = require("./server.js");

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

//middleware
server.use(express.json());

//routes & endpoints
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.listen(4000, () => {
    console.log("Server Running on port 4000");
})