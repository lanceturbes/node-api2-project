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
// [POST] /api/posts
router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (title && contents) {
      const newPost = await Post.insert({ title, contents });
      res.status(201).json({ id: newPost.id, title, contents });
    } else {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});
// [PUT] /api/posts/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    const post = await Post.findById(id);
    if (post) {
      if (title && contents) {
        await Post.update(id, { title, contents });
        res.status(200).json({ id: Number(id), title, contents });
      } else {
        res.status(400).json({
          message: "Please provide title and contents for the post",
        });
      }
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified",
    });
  }
});
// [DELETE] /api/posts/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const postToDelete = await Post.findById(id);
    if (postToDelete) {
      await Post.remove(id);
      res.status(200).json(postToDelete);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
    });
  }
});

// Exports
module.exports = router;
