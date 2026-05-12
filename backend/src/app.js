const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes =
  require("./routes/profileRoutes");

const app = express();

app.use(cors());

app.use(express.json());


// STATIC UPLOADS
app.use(
  "/uploads",
  express.static("uploads")
);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("UXverse API Running");
});


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/users", userRoutes);

app.use("/api/profile", profileRoutes);

module.exports = app;