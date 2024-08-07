import Post from "../models/post.model.js";

export const create = async(req, res) => {
    try {
        const {content, photo} = req.body;
        const authorId = req.user._id;
        
        if(!content && !photo) {
            return res.status(400).json({error: "You must post either content or photo, or both"});
        }

        const newPost = new Post({
            content: content, 
            photo: photo, 
            author: authorId
        });

        if(newPost) {
            await newPost.save();
            res.status(201).json({
                _id: newPost._id,
                content: newPost.content, 
                photo: newPost.photo, 
                author: newPost.author,
                createdAt: newPost.createdAt
            });
        }
        
    } catch(error) {
        console.log("Error in post controller, create function: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

