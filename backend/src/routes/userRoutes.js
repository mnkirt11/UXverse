const express = require("express");

const router = express.Router();

const {
  searchUsers,
  getUserProfile
} = require("../controllers/userController");


// SEARCH USERS
router.get(
  "/search",
  searchUsers
);


// PUBLIC PROFILE
router.get(
  "/:username",
  getUserProfile
);

module.exports = router;