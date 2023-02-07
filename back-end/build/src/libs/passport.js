"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = require("dotenv");
const user_1 = require("../db/user");
(0, dotenv_1.config)();
function callPassport() {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(async (id, done) => {
        const userInfo = await user_1.default?.findOne({ id });
        done(null, userInfo);
    });
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
    }, (accessToken, refreshToken, profile, done) => {
        const { sub, name, picture, email } = profile._json;
        user_1.default.findOne({ id: sub }, {}, {}, async (err, user) => {
            if (user) {
                done(null, user);
            }
            else {
                await user_1.default.create({ id: sub, name, email }).then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    }));
    return passport_1.default;
}
exports.default = callPassport;
