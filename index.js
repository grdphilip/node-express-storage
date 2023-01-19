"use strict";
require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection
db.on("error", (error) => console.error(error));
db.once("connected", () => console.log("Connected to Database"));
db.on("disconnected", () => console.log("Disconnected"));

const server = express();

/* 
server.METHOD(PATH, HANDLER) 
https://expressjs.com/en/guide/using-middleware.html EXPRESS middleware
https://tddc88-2022.gitlab-pages.liu.se/api/api-v2/ AXELS API
express.static(root, [options])
*/
server.use(express.static("public"));

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

server.use(requestTime);

/* If these aren't included the request body returns undefined */ 
server.use(express.json())
server.use(express.urlencoded({ extended: false}))

const articleRouter = require('./routes/articleRoute');
const usersRouter = require('./routes/userRoute')

server.use('/api/articles', articleRouter);
server.use('/api/users', usersRouter);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
