"use strict";

const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const express_session = require("express-session");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const passport = require("passport");
dotenv.config();
const authRouter = require("./src/routes/auth").router;
const bookcaseRouter = require("./src/routes/bookcase").router;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie_parser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://port-0-bookcase-in-the-phone-api-luj2cldugpzhe.sel3.cloudtype.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
  })
);
const sessionOption = {
  name: "myBiPSession",
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  proxy: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "BiP_test",
    collectionName: "session",
  }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
  sessionOption.store = connect_mongo.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "BiP",
    collectionName: "session",
  });
}
app.use(express_session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/bookcase", bookcaseRouter);
app.get("/", (req, res) => {
  res.send("hi");
});

exports.app = app;