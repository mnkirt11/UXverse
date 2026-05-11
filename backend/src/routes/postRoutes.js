const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const {
  createPost,
  getMyPosts,
  getAllPosts,
  deletePost
} = require("../controllers/postController");


// CREATE POST
router.post(
  "/create",
  authMiddleware,
  upload.single("file"),
  createPost
);

// PUBLIC FEED
router.get(
  "/",
  authMiddleware,
  getAllPosts
);

// GET USER POSTS
router.get(
  "/my-posts",
  authMiddleware,
  getMyPosts
);

router.delete(
  "/:id",
  authMiddleware,
  deletePost
);

module.exports = router;