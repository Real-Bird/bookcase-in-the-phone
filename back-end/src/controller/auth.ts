import { Request, Response } from "express";
import Users from "../db/user";

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
  req.logout(() => {
    res.status(204);
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
