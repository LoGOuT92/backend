const Post = require("../db/models/post");
const User = require("../db/models/user");
const Matches = require("../db/models/Matches");

class commentsController {
  async addComment(req, res) {
    let post = {};
    const { slug } = req.params;
    if (req.headers.collections == "post") {
      post = await Post.findOne({ slug: slug });
    } else {
      post = await Matches.findOne({ _id: slug });
    }
    const comment = {
      user: req.body._id,
      content: req.body.content,
      time: req.body.time,
      dateTime: req.body.dateTime,
      likes: [],
    };
    if (req.body.content.length < 2) {
      return res.status(422);
    }
    post.comments.push(comment);
    try {
      await post.save();
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
    let popPost = {};
    if (req.headers.collections == "post") {
      popPost = await Post.findOne({ slug: slug })
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
      popPost = await Matches.findOne({ _id: slug })
        .populate({
          path: "comments.user",
          model: User,
        })
        .populate({
          path: "comments.repies.user",
          model: User,
        });
    }
    res.status(201).json(popPost);
  }
  async addReply(req, res) {
    const postID = req.params;
    let post = {};
    if (req.headers.collections == "post") {
      post = await Post.findOne({ _id: postID });
    } else {
      post = await Matches.findOne({ _id: postID });
    }
    const reply = {
      user: req.body._id,
      content: req.body.content,
      time: req.body.time,
      dateTime: req.body.dateTime,
      likes: [],
    };
    const comment = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
    comment.repies.push(reply);
    try {
      await post.save();
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: err.message });
    }
    let popPost = {};
    if (req.headers.collections == "post") {
      popPost = await Post.findOne({ _id: postID })
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
      popPost = await Matches.findOne({ _id: postID })
        .populate({
          path: "comments.user",
          model: User,
        })
        .populate({
          path: "comments.repies.user",
          model: User,
        });
    }

    const popCom = await popPost.comments.find(
      (x) => x._id == req.body.commentID
    );

    res.status(201).json(popCom);
  }
  async editComment(req, res) {
    const postID = req.params;
    let post = {};
    if (req.headers.collections == "post") {
      post = await Post.findOne({ _id: postID });
    } else {
      post = await Matches.findOne({ _id: postID });
    }
    const comment = post.comments.find((x) => x._id == req.body.commentID);
    if (req.body.value) comment.content = req.body.value;
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(comment);
  }

  async editReply(req, res) {
    const postID = req.params;
    let post = {};
    if (req.headers.collections == "post") {
      post = await Post.findOne({ _id: postID });
    } else {
      post = await Matches.findOne({ _id: postID });
    }
    const commentsArr = post.comments.find((x) => x._id == req.body.commentID);
    const reply = commentsArr.repies.find((x) => x._id == req.body.repID);
    if (req.body.value) reply.content = req.body.value;
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(reply);
  }
  async deleteComment(req, res) {
    const postID = req.params;
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
    const newCommentsArr = post.comments.filter(
      (x) => x._id != req.body.commentID
    );
    post.comments = newCommentsArr;
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(post);
  }
  async deleteReply(req, res) {
    const postID = req.params;
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
    const commentsArr = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
    const replys = commentsArr.repies.filter((x) => x._id != req.body.replyID);
    commentsArr.repies = replys;
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(replys);
  }
}
module.exports = new commentsController();
