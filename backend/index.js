import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";
import cors from "cors";
import session from "express-session";

// ✅ __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ load env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ✅ IMPORTANT: Render + Vercel frontend URL
const CLIENT_URL = "https://your-frontend.vercel.app"; // 👈 yahan apna frontend URL daalna

// ✅ CORS fix
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// ✅ session config
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// ✅ passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect(`${CLIENT_URL}/profile`) // 👈 fix
);

app.get("/auth/facebook",
  passport.authenticate("facebook")
);

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect(`${CLIENT_URL}/profile`) // 👈 fix
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect(CLIENT_URL); // 👈 fix
  });
});

app.get("/user", (req, res) => res.send(req.user));

// ✅ IMPORTANT PORT FIX (MOST IMPORTANT 🔥)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
