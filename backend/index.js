const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authroute = require("./routes/authroute");
const connectDB = require("./database/db");

const PORT = 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ limit: Infinity, extended: true }));

// Configure session middleware
app.use(
  session({
    secret: "aA@pjahcbjhahfh@%gvhag#$hbdc&jbjH!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api", authroute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
