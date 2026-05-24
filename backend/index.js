import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import "./config/passport.js";
import cors from "cors";
import session from "express-session";

const app = express();

const CLIENT_URL = "https://oauth-authentication-system.vercel.app";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: "mysecretkey", 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb+srv://palaksharmahp16_db_user:Palak%40123@cluster0.jopyty7.mongodb.net/oauthDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


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

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
