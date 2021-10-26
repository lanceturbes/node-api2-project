// Imports
const express = require("express");
const postsRouter = require("./posts/posts-router");

// Declare server
const server = express();

// Middleware
server.use(express.json());
server.use("/api/posts", postsRouter);

// Exports
module.exports = server;
