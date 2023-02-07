"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const path_1 = require("path");
const express_session_1 = require("express-session");
const cookie_parser_1 = require("cookie-parser");
const cors_1 = require("cors");
const connect_mongo_1 = require("connect-mongo");
const passport_1 = require("passport");
(0, dotenv_1.config)();
const auth_1 = require("./src/routes/auth");
const bookcase_1 = require("./src/routes/bookcase");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://port-0-bookcase-in-the-phone-api-luj2cldugpzhe.sel3.cloudtype.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
}));
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
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: "BiP_test",
        collectionName: "session",
    }),
};
if (process.env.NODE_ENV === "production") {
    sessionOption.proxy = true;
    sessionOption.cookie.secure = true;
    sessionOption.store = connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: "BiP",
        collectionName: "session",
    });
}
app.use((0, express_session_1.default)(sessionOption));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", auth_1.default);
app.use("/bookcase", bookcase_1.default);
app.get("/", (req, res) => {
    res.send("hi");
});
exports.default = app;
