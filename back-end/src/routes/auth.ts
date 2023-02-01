import { Router } from "express";
import callPassport from "../libs/passport";
import * as authCtrl from "../controller/auth";

const router = Router();
const passport = callPassport();

router.get("/login/success", authCtrl.login);

router.get("/logout", authCtrl.logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.SUCCESS_CLIENT_URL,
    failureRedirect: process.env.FAILURE_CLIENT_URL,
  })
);

router.get("/check", authCtrl.check);

export default router;
