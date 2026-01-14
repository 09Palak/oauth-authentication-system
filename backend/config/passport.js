import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        const data = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          photo: profile.photos?.[0]?.value
        };

        let user = await User.findOneAndUpdate(
          { googleId: profile.id },
          data,
          { new: true, upsert: true }
        );

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"]
    },
    async (_, __, profile, done) => {
      try {
        const userData = {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value ?? null,
          photo: profile.photos?.[0]?.value ?? null
        };

        let user = await User.findOneAndUpdate(
          { facebookId: profile.id },
          userData,
          { new: true, upsert: true }
        );

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

