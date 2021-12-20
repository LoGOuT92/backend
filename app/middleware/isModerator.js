const { ACCES_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user");

module.exports = async function isModeratorMiddleware(req, res, next) {
  const data = req.body;
  const user = await User.findOne({ _id: data.author });
  if (!user.isModerator) {
    res.sendStatus(401);
  }
  next();
};
