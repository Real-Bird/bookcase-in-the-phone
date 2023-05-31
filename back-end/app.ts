import { config } from "dotenv";
import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";
import passport from "passport";

config();

import authRouter from "./src/routes/auth";
import bookcaseRouter from "./src/routes/bookcase";

declare global {
  namespace Express {
    interface User {
      name: string;
      id: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    passport: { user: string };
  }
}

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const corsOptions = {
  origin: process.env.ALLOW_ORIGIN,
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const sessionOption = {
  name: "myBiPSession",
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  proxy: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "BiP_test",
    collectionName: "session",
    ttl: 30 * 24 * 60 * 60,
  }),
};

if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
  sessionOption.store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "BiP",
    collectionName: "session",
    ttl: 30 * 24 * 60 * 60,
  });
}
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/bookcase", bookcaseRouter);

app.get("/", (req, res) => {
  // res.redirect(process.env.ALLOW_ORIGIN);
  res.send("hi!");
});

export default app;
