const { ACCES_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }

  jwt.verify(token, ACCES_TOKEN, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = data;
    next();
  });
};
