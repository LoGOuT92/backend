const Post = require("../db/models/post");
const User = require("../db/models/user");

class commentsController {
  async addComment(req, res) {
    const post = await Post.findOne(req.params);

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
    const popPost = await Post.findOne(req.params)
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
    res.status(201).json(popPost);
  }
  async addReply(req, res) {
    const postID = req.params;
    const post = await Post.findOne({ _id: postID });
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
    const popPost = await Post.findOne({ _id: postID })
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

    const popCom = await popPost.comments.find(
      (x) => x._id == req.body.commentID
    );

    res.status(201).json(popCom);
  }
  async likeReplyCount(req, res) {
    const postID = req.params;
    const like = {
      value: req.body.value,
      user: req.body.user,
    };
    const post = await Post.findOne({ _id: postID })
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

  async editComment(req, res) {
    const postID = req.params;
    const post = await Post.findOne({ _id: postID });
    const comment = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
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
    const post = await Post.findOne({ _id: postID });
    const commentsArr = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
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
    const post = await Post.findOne({ _id: postID });
    const newCommentsArr = await post.comments.filter(
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
    const post = await Post.findOne({ _id: postID });
    const commentsArr = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
    // console.log(req.body.repID);
    const replys = commentsArr.repies.filter((x) => x._id != req.body.replyID);
    commentsArr.repies = replys;
    try {
      await post.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).json(replys);
  }
  async likesCount(req, res) {
    const postID = req.params;
    const like = {
      value: req.body.value,
      user: req.body.user,
    };
    const post = await Post.findOne({ _id: postID })
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
    const comment = await post.comments.find(
      (x) => x._id == req.body.commentID
    );
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
module.exports = new commentsController();
