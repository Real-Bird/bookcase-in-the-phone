"use strict";

const Users = require("../db/user").user;
const passport = require("../libs/passport").callPassport();

const login = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};
exports.login = login;
const logout = (req, res) => {
  return req.logout(() => {
    res.status(204).end();
  });
};
exports.logout = logout;
const check = async (req, res) => {
  const { token } = req.query;
  const user = await Users.findOne({ id: token });
  if (!user) {
    return res.status(401).json({ error: true, message: "Do not exist user" });
  }
  return res.status(200).json({
    error: false,
    message: "Successfully checked",
    user,
  });
};
exports.check = check;
exports.reqGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});
exports.callbackGoogle = passport.authenticate("google", {
  successRedirect: process.env.REDIRECT_CLIENT_URL,
  failureRedirect: process.env.REDIRECT_CLIENT_URL,
});
