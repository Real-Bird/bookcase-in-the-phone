"use strict";

const router = require("express").Router();
const authCtrl = require("../controller/auth");

router.get("/login/success", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/google", authCtrl.reqGoogle);
router.get(
  "/google/callback",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  authCtrl.callbackGoogle
);
router.get("/check", authCtrl.check);

exports.router = router;
