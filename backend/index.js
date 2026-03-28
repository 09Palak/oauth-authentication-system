import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";
import cors from "cors";
import session from "express-session";

const app = express();

// 👉 yahan apna frontend Vercel URL daalo
const CLIENT_URL = "https://your-frontend.vercel.app";

// CORS
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: "mysecretkey", // 👈 direct daal diya
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB (👉 apna connection string daalo)
mongoose
  .connect("mongodb+srv://username:password@cluster.mongodb.net/dbname")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect(`${CLIENT_URL}/profile`)
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect(CLIENT_URL);
  });
});

app.get("/user", (req, res) => res.send(req.user || null));

// Test
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 🔥 PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
