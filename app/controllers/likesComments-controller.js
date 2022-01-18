const Post = require("../db/models/post");
const User = require("../db/models/user");
const Matches = require("../db/models/Matches");

class likesController {
  async likeReplyCount(req, res) {
    const postID = req.params;
    const like = {
      value: req.body.value,
      user: req.body.user,
    };
    let post = {};
    if (req.headers.collections == "post") {
      post = await Post.findOne({ _id: postID })
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
    } else {
      post = await Matches.findOne({ _id: postID })
        .populate({
          path: "comments.user",
          model: User,
        })
        .populate({
          path: "comments.repies.user",
          model: User,
        });
    }
    const comment = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
    const reply = await comment.repies.find((x) => x._id == req.body.repID);
    const found = reply.likes.find((x) => x.user == req.body.user);
    if (found && found.value === req.body.value) {
      const tab = reply.likes.filter((x) => x.user != req.body.user);
      reply.likes = [...tab];
    }

    if (found && found.value != req.body.value) {
      const tab = reply.likes.filter((x) => x.user != req.body.user);
      tab.push(like);
      reply.likes = [...tab];
    }
    if (!found) {
      reply.likes.push(like);
    }
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(comment);
  }

  async likesCount(req, res) {
    const postID = req.params;
    const like = {
      value: req.body.value,
      user: req.body.user,
    };
    let post = {};
    if (req.headers.collections == "post") {
      post = await Post.findOne({ _id: postID })
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
    } else {
      post = await Matches.findOne({ _id: postID })
        .populate({
          path: "comments.user",
          model: User,
        })
        .populate({
          path: "comments.repies.user",
          model: User,
        });
    }
    const comment = post.comments.find((x) => x._id == req.body.commentID);
    const found = comment.likes.find((x) => x.user == req.body.user);
    if (found && found.value === req.body.value) {
      const tab = comment.likes.filter((x) => x.user != req.body.user);
      comment.likes = [...tab];
    }
    if (found && found.value != req.body.value) {
      const tab = comment.likes.filter((x) => x.user != req.body.user);
      tab.push(like);
      comment.likes = [...tab];
    }
    if (!found) {
      comment.likes.push(like);
    }
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(post);
  }
}
module.exports = new likesController();
