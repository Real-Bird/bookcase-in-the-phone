"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const Users = require("../db/user").user;

dotenv.config();

function callPassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const userInfo = await Users?.findOne({ id });
    done(null, userInfo);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, done) => {
        const { sub, name, picture, email } = profile._json;
        Users.findOne({ id: sub }, {}, {}, async (err, user) => {
          if (user) {
            done(null, user);
          } else {
            await Users.create({ id: sub, name, email }).then((newUser) => {
              done(null, newUser);
            });
          }
        });
      }
    )
  );
  return passport;
}
exports.callPassport = callPassport;
