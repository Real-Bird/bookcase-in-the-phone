import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import { config } from "dotenv";
import Users from "../db/users";

config();

export default function callPassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Users?.findOne({ id });
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        const { sub, name, picture, email } = profile._json;
        Users.findOne({ id: sub }, {}, {}, async (err, user) => {
          if (user) {
            done(null, user);
          } else {
            await Users.create({ id: sub, name, email }).then((newUser) => {
              done(null, newUser);
            });
          }
        });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/about",
    }),
    (req, res, next) => {
      req.session.foo = "foo";
      req.session.save(() => res.redirect("http://localhost:3000"));
    }
  );
}
