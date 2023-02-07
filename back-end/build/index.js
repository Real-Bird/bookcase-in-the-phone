"use strict";

const dotenv = require("dotenv");
const app = require("./app.js").app;
const connect = require("./src/db/index").connect;
dotenv.config();
const port = process.env.PORT || 8001;
connect();
app.listen(port, () => {
  console.log(port, "번 포트에서 대기 중");
});
