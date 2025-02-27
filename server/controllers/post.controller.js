import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import firebaseApp from "../server.js";
import { getStorage, ref, deleteObject } from "firebase/storage";
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

    const populatedPost = await newPost.populate("author", [
      "fullName",
      "profilePhoto",
    ]);

    if (newPost) {
      await newPost.save();
      res.status(201).json({
        _id: newPost._id,
        content: newPost.content,
        photo: newPost.photo,
        author: {
          _id: populatedPost.author._id,
          fullName: populatedPost.author.fullName,
          profilePhoto: populatedPost.author.profilePhoto,
        },
        createdAt: newPost.createdAt,
        likes: newPost.likes,
        comments: newPost.comments,
      });
    }
  } catch (error) {
    console.log("Error in post controller, create function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const storage = getStorage(firebaseApp);
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!post.author.equals(userId)) {
      return res.status(400).json({ error: "You are not the author" });
    }

    if (post.photo) {
      // Extract the path relative to your storage bucket
      const photoPath = post.photo.split('?')[0]; // Remove URL query parameters if present
      const photoRef = ref(storage, photoPath);

      try {
        await deleteObject(photoRef);
        console.log("File deleted successfully");
      } catch (error) {
        console.log("Error deleting file:", error.message);
      }
    }

    await post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(
      "Error in post controller, delete post function: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["fullName", "profilePhoto"])
      .populate({
        path: "comments.author",
        select: ["fullName", "profilePhoto"],
      })
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in post controller, getAll function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const followingPosts = await Post.find({ author: { $in: user.following } })
      .populate("author", ["fullName", "profilePhoto"])
      .populate({
        path: "comments.author",
        select: ["fullName", "profilePhoto"],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(followingPosts);
  } catch (error) {
    console.log("Error in post controller, getAll function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllByAuthorId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ author: userId })
      .populate("author", ["fullName", "profilePhoto"])
      .populate({
        path: "comments.author",
        select: ["fullName", "profilePhoto"],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    console.log(
      "Error in post controller, getAllByUserId function: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const like = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await post.save();
    await updatedPost.populate("author", ["fullName", "profilePhoto"]);
    await updatedPost.populate({
      path: "comments.author",
      select: ["fullName", "profilePhoto"],
    });
    res.status(200).json({
      _id: updatedPost._id,
      content: updatedPost.content,
      photo: updatedPost.photo,
      author: updatedPost.author,
      likes: updatedPost.likes,
      comments: updatedPost.comments,
      createdAt: updatedPost.createdAt,
    });
  } catch (error) {
    console.log("Error in post controller, like function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const comment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const author = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ erorr: "Post not found" });
    }

    post.comments.push({ comment: comment, author: author });
    const updatedPost = await post.save();
    await updatedPost.populate("author", ["fullName", "profilePhoto"]);
    await updatedPost.populate({
      path: "comments.author",
      select: ["fullName", "profilePhoto"],
    });
    res.status(200).json({
      _id: updatedPost._id,
      content: updatedPost.content,
      photo: updatedPost.photo,
      author: updatedPost.author,
      likes: updatedPost.likes,
      comments: updatedPost.comments,
      createdAt: updatedPost.createdAt,
    });
  } catch (error) {
    console.log("Error in post controller, comment function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    const author = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = post.comments.find((c) => c._id.equals(commentId));

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (!comment.author.equals(author)) {
      return res
        .status(403)
        .json({ error: "You are not the author of the comment" });
    }

    post.comments = post.comments.filter((c) => !c._id.equals(commentId));

    const updatedPost = await post.save();
    await updatedPost.populate("author", ["fullName", "profilePhoto"]);
    await updatedPost.populate({
      path: "comments.author",
      select: ["fullName", "profilePhoto"],
    });
    res.status(200).json({
      _id: updatedPost._id,
      content: updatedPost.content,
      photo: updatedPost.photo,
      author: updatedPost.author,
      likes: updatedPost.likes,
      comments: updatedPost.comments,
      createdAt: updatedPost.createdAt,
    });
  } catch (error) {
    console.log(
      "Error in post controller, deleteComment function: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
