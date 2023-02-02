import { Request, Response } from "express";
import Users from "../db/user";
import callPassport from "../libs/passport";

const passport = callPassport();

export const login = (req: Request, res: Response) => {
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

export const logout = (req: Request, res: Response) => {
  return req.logout(() => {
    res.status(204).end();
  });
};

export const check = async (req: Request, res: Response) => {
  const { token } = req.query;
  const user = await Users.findOne({ id: token });
  if (!user)
    res.status(401).json({ error: true, message: "Do not exist user" });
  res.status(200).json({
    error: false,
    message: "Successfully checked",
    user,
  });
};

export const reqGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const callbackGoogle = passport.authenticate("google", {
  successRedirect: process.env.REDIRECT_CLIENT_URL,
  failureRedirect: process.env.REDIRECT_CLIENT_URL,
});
