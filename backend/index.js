import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";
import cors from "cors";
import session from "express-session";


const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
(req, res) => res.redirect("http://localhost:3000/profile")
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }),
(req, res) => res.redirect("http://localhost:3000/profile")
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.redirect("http://localhost:3000/");
  });
});

app.get("/user", (req, res) => res.send(req.user));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
