const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    header: {
        type: String,
        required: [true, "Naglowek nie moze byc pusty!"],
    },
    context:{
        type: String,
        required: [true, "Tresc nie moze byc pusta"]
    },
    image: String,
    author: String,
    slug: String,
    comments: [
        {
            user: {
                type: String,
                ref: 'User'

            },
            parentId2 : { 
                type: mongoose.Types.ObjectId,
                default: mongoose.ObjectId
            },
            content: String,
            repies:[
                { 
                    user: {
                        type: String,
                        ref: 'User'
                    },
                    content: String,
                }
            ]
        }
    ]
    
})


const Post = mongoose.model('Posts',postSchema);

module.exports = Post;
