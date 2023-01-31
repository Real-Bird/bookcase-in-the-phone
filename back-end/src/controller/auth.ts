import { Request, Response } from "express";

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
