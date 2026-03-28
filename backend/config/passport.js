import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// ✅ Serialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// ✅ Deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// 🔥 GOOGLE STRATEGY (direct values daali hain)
passport.use(
  new GoogleStrategy(
    {
      clientID: "322355776615-jrtppkobq32sscoer5l54g14laa7b8sa.apps.googleusercontent.com",          // 👈 yahan daalo
      clientSecret: "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",  // 👈 yahan daalo
      callbackURL: "https://oauth-authentication-system.onrender.com/auth/google/callback",
    },
    async (_, __, profile, done) => {
      try {
        const data = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          photo: profile.photos?.[0]?.value,
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

