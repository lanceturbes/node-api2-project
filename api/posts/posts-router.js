// Imports
const express = require("express");
const Post = require("./posts-model");

// Declare router
const router = express.Router();

// ========== Routes

// [GET] /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

// Exports
module.exports = router;
