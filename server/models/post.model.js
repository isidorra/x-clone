import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    content: {
        type: String, 
    }, 
    photo: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            default: []
        }
    ],
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User",
                required: true
            },
            comment: {
                type: String, 
                min: 1,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
            
        }
    ]
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);
export default Post;