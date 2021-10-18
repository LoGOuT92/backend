const Post = require('../db/models/post');

class PostController{
    async createPost(req,res){
        const post = new Post({
            header: req.body.header,
            context: req.body.context,
            author: req.body.author,
            slug: req.body.header.replace(/\s+/g, '_').toLowerCase(),
            comments:[]
        })
        try {
            await post.save();
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(post);
    }
    async getPost(req,res){
        const posts = await Post.find();
        res.status(200).json({ posts})
    }
    
    async editPost(req,res){
        const post = await Post.findOne(req.params)

        if(req.body.header)post.header = req.body.header;
        if(req.body.context)post.context = req.body.context;
        if(req.body.author)post.author= req.body.author;
        try{
            await post.save()
        }catch(err){
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json(post);
    }

    async deletePost(req,res){
        const {slug} = req.params
        const post = await Post.findOne({slug})
        try{
            await Post.deleteOne(post)
            res.sendStatus(204);
        }catch(e){
            console.log(e);
        }
    }
    

}
module.exports = new PostController();
