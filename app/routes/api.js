const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const PostController = require('../controllers/post-controller');
const CommentsController = require('../controllers/comments-controller');
const authMiddleware = require('../middleware/auth');

router.post('/register',UserController.createUser);
router.post('/login',UserController.login)
router.delete('/logout',UserController.logout);
router.post('/refleshToken',UserController.refleshToken);

router.post('/post',PostController.createPost);
router.get('/post',PostController.getPost);
router.put('/post/:slug',PostController.editPost);
router.delete('/post/:slug',PostController.deletePost);

router.post('/post/comments/:slug',authMiddleware,CommentsController.addComment);
router.put('/post/comments/:slug',authMiddleware,CommentsController.editComment);
//router.put('/post/comments/:slug',authMiddleware,CommentsController.deleteComment);


module.exports = router;