"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_js_1 = require("./app.js");
const index_1 = require("./src/db/index");
dotenv_1.default.config();
const port = process.env.PORT || 8001;
(0, index_1.default)();
app_js_1.default.listen(port, () => {
    console.log(port, "번 포트에서 대기 중");
});
