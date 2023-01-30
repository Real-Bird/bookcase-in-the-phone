import { Router } from "express";
import callPassport from "../libs/passport";

const router = Router();
const passport = callPassport();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/checked", (req, res) => {
  if (req.user)
    return res
      .status(200)
      .json({ ok: true, data: req.user, message: "Already Logged In" });
  res.status(401).json({ ok: false, data: null, message: "Not logged in" });
});

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

router.get("/logout", (req, res) => {
  req.logout(() => {
    console.log(req.user);
    res.redirect(process.env.SUCCESS_CLIENT_URL);
  });
});

export default router;
