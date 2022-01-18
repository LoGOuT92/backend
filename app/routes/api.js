const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/user-controller");
const PostController = require("../controllers/post-controller");
const CommentsController = require("../controllers/comments-controller");
const PlayerControler = require("../controllers/player-controller");
const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");
const isModeratorMiddleware = require("../middleware/isModerator");
const MatchControler = require("../controllers/matches-controler");
const TrophyController = require("../controllers/trophy-controller");
const TripController = require("../controllers/trip-controller");
const LikesController = require("../controllers/likesComments-controller");

const upload = require("../services/uploader");

router.post("/register", UserController.createUser);
router.get("/users", UserController.getUsers);
router.put("/user/:_id", upload.single("image"), UserController.editUser);
router.delete("/user/:_id", UserController.deleteUser);
router.put("/user/permissions/:_id", UserController.permissionsUser);
router.post("/login", UserController.login);
router.delete("/logout", UserController.logout);
router.post("/refleshToken", UserController.refleshToken);

router.post("/post", upload.single("image"), PostController.createPost);
router.get("/post", PostController.getPost);
router.get("/post/:slug", PostController.getSinglePost);
router.put("/post/:_id", isModeratorMiddleware, PostController.editPost);
router.delete("/post/:_id", PostController.deletePost);

router.post("/likeCount/:_id", LikesController.likesCount);
router.post("/likeReplyCount/:_id", LikesController.likeReplyCount);

router.post("/createPlayer", PlayerControler.createPlayer);
router.put("/editPlayer/:_id", PlayerControler.editPlayer);
router.delete("/deletePlayer/:_id", PlayerControler.deletePlayer);
router.get("/players", PlayerControler.getPlayers);
router.get("/player/:SurName", PlayerControler.getPlayer);

router.post(
  "/post/comments/:slug",
  authMiddleware,
  CommentsController.addComment
);
router.post(
  "/match/comments/:slug",
  authMiddleware,
  CommentsController.addComment
);
router.post(
  "/comments/reply/:_id",
  authMiddleware,
  CommentsController.addReply
);
router.put(
  "/post/comments/:_id",
  authMiddleware,
  CommentsController.editComment
);
router.put(
  "/post/deleteComment/:_id",
  authMiddleware,
  CommentsController.deleteComment
);
router.put(
  "/post/commentsReplyEdit/:_id",
  authMiddleware,
  CommentsController.editReply
);
router.put(
  "/post/commentsReplyDelete/:_id",
  authMiddleware,
  CommentsController.deleteReply
);

router.post(
  "/match/createMatch",
  upload.array("image", 2),
  MatchControler.addMatch
);
router.get("/getThreeMatches", MatchControler.getThreeMatches);
router.get("/getMatch/:_id", MatchControler.getMatch);
router.put("/editMatch/:_id", MatchControler.editMatch);
router.put("/match/addGoal/:_id", MatchControler.addGoal);
router.put("/match/subGoal/:_id", MatchControler.subGoal);

router.post("/createTrophy", TrophyController.createTrophy);
router.get("/trophies", TrophyController.getTrophies);

router.post("/createTrip", TripController.createTrip);
router.get("/getTrips", TripController.getTrip);
router.put("/setActiveTrip/:_id", TripController.setActive);
router.delete("/deleteTrip/:_id", TripController.deleteTrip);

router.post("/addUserToTrip/:_id", TripController.addUserToTrip);

module.exports = router;
