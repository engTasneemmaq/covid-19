"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
const signInRouter=require("../src/routes/signInRouter");
const signUpRouter=require("../src/routes/signUpRouter");
const secretRouter=require("../src/routes/secretRouter");
const covidRouter = require("../src/routes/covidRecord");


const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to COVID-19 Application");
});

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(covidRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(secretRouter);

//error catch
app.use(errorHandler);
app.use(notFound);

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};