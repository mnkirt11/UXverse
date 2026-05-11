// const express = require("express");

// const router = express.Router();

// const {
//   signup,
//   login
// } = require("../controllers/authController");

// const authMiddleware = require("../middleware/authMiddleware");


// // PUBLIC ROUTES
// router.post("/signup", signup);
// router.post("/login", login);


// // PROTECTED ROUTE
// router.get("/me", authMiddleware, async (req, res) => {
//   res.status(200).json({
//     user: {
//       id: req.user.id,
//       username: req.user.username,
//       email: req.user.email
//     }
//   });
// });

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getMe
} = require(
  "../controllers/authController"
);

const authMiddleware =
  require("../middleware/authMiddleware");


// SIGNUP
router.post(
  "/signup",
  signup
);


// LOGIN
router.post(
  "/login",
  login
);


// GET CURRENT USER
router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;