const express = require("express");
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const errorHandler = require("./middlewares/errorhandler.js");

require("dotenv").config({ path: "./config/.env" });
require("./config/passport.js");

const { app, server } = require("./config/socket.js");

app.use(express.json());


app.use(cors({
    origin: [`${process.env.frontendHostName}`, "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

app.options('*', cors({
    origin: [`${process.env.frontendHostName}`, "http://localhost:3000"],
    credentials: true
}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth/", require("./routes/userRoute"));

app.use(errorHandler);

module.exports = { app, server };