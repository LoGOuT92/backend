const Post = require('../db/models/post')

class commentsController{
    async addComment(req,res){
        const post = await Post.findOne(req.params)
        const comment = {
            user:req.user.username,
            content: req.body.content
        }
        post.comments.push(comment)
        try {
            await post.save();
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(post);
    }
    async editComment(req,res){
        const post = await Post.find()
        console.log(post);
        //const comment = post.comments.filter(comment=> comment._id =='614e79473d9539f51ebe17cc')
        // try{
        //     if(req.body.content)post.comment.content = req.body.content;
        //     await post.save();
        //     res.status(201).json(post);
        // }catch(e){
        //     return res.status(422).json({ message: err.message });
        // }
    }
}
module.exports = new commentsController();