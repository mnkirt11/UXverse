const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  updateProfile
} = require("../controllers/profileController");


// STORAGE
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );
  }
});


const upload = multer({
  storage
});


// UPDATE PROFILE
router.put(
  "/update",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

module.exports = router;