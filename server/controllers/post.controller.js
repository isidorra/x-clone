import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const create = async (req, res) => {
  try {
    const { content, photo } = req.body;
    const authorId = req.user._id;

    if (!content && !photo) {
      return res
        .status(400)
        .json({ error: "You must post either content or photo, or both" });
    }

    const newPost = new Post({
      content: content,
      photo: photo,
      author: authorId,
    });

    if (newPost) {
      await newPost.save();
      res.status(201).json({
        _id: newPost._id,
        content: newPost.content,
        photo: newPost.photo,
        author: newPost.author,
        createdAt: newPost.createdAt,
      });
    }
  } catch (error) {
    console.log("Error in post controller, create function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.author !== userId) {
      return res.status(400).json({ error: "You are not the author" });
    }

    await post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log("Error in post controller, delete function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(error) {
        console.log("Error in post controller, getAll function: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllByAuthorId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ author: userId });
    res.status(200).json({posts});
  } catch (error) {
    console.log("Error in post controller, getAllByUserId function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
