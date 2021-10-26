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
// [GET] /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
    });
  }
});

// Exports
module.exports = router;
