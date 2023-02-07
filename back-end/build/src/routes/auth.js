"use strict";

const router = require("express").Router();
const authCtrl = require("../controller/auth");

router.get("/login/success", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/google", authCtrl.reqGoogle);
router.get("/google/callback", authCtrl.callbackGoogle);
router.get("/check", authCtrl.check);

exports.router = router;
