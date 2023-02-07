"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connect = () => {
    const mongooseOptions = {
        dbName: "BiP",
    };
    if (process.env.NODE_ENV !== "production") {
        mongooseOptions.dbName = "BiP_test";
        mongoose_1.default.set("debug", true);
    }
    mongoose_1.default.connect(process.env.MONGO_URI, mongooseOptions, (err) => {
        if (err) {
            console.log("몽고디비 연결 에러", err);
        }
        else {
            console.log("몽고디비 연결 성공");
        }
    });
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connection.on("error", (err) => {
        console.log("몽고디비 연결 에러", err);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
        connect();
    });
};
exports.default = connect;
