import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import Users from "../db/users";

config();

export default function callPassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const userInfo = await Users?.findOne({ id });
    done(null, userInfo);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
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

  return passport;
}
