const Post = require("../db/models/post");
const User = require("../db/models/user");
const fs = require("fs");

class PostController {
  async createPost(req, res) {
    const post = new Post({
      header: req.body.header,
      context: req.body.context,
      author: req.body.author,
      image: req.file.filename,
      slug: Date.now(),
      comments: [],
    });
    try {
      await post.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201).json(post);
  }
  async getPost(req, res) {
    const posts = await Post.find()
      .populate({
        path: "comments.user",
        model: User,
      })
      .populate({
        path: "author",
        model: User,
      });
    res.status(200).json({ posts });
  }
  async getSinglePost(req, res) {
    const { slug } = req.params;
    const post = await Post.findOne({ slug: slug })
      .populate({
        path: "comments.user",
        model: User,
      })
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "comments.repies.user",
        model: User,
      });
    res.status(200).json({ post });
  }

  async editPost(req, res) {
    const post = await Post.findOne(req.params);
    if (req.body.header) {
      post.header = req.body.header;
    }
    if (req.body.context) post.context = req.body.context;
    if (req.body.author) post.author = req.body.author;
    try {
      await post.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    res.status(201);
  }

  async deletePost(req, res) {
    const { _id } = req.params;
    try {
      await Post.findOneAndDelete({ _id: _id });
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new PostController();
