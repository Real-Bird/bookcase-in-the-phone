import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import callPassport from "./src/libs/passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import MongoStore from "connect-mongo";

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
    foo: string;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(
  session({
    name: "myBiPSession",
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "BiP",
      collectionName: "session",
      // touchAfter: 24 * 3600,
    }),
  })
);

callPassport(app);

app.get("/auth", (req, res, next) => {
  console.log(req.session.foo);
  // if (req.session) return res.json({ isLoggedIn: true });
  // res.json({ isLoggedIn: false });
});

app.get("/", (req, res, next) => {
  res.send("h1");
});

export default app;
