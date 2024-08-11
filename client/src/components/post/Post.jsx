import UserLink from "../user/UserLink";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../context/AuthContext";
import useDeletePost from "../../hooks/post/useDeletePost";
import { usePostsContext } from "../../context/PostsContext";
import useFollow from "../../hooks/user/useFollow";
import likeIcon from "../../assets/like.svg";
import likedIcon from "../../assets/liked.svg";
import commentIcon from "../../assets/comment.svg";
import useLike from "../../hooks/post/useLike";
import { useState } from "react";
import CreateComment from "../comment/CreateComment";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const { authUser } = useAuthContext();
  const { loading, deletePost } = useDeletePost();
  const { loadingFollow, follow } = useFollow();
  const {loadingLike, like} = useLike();
  const { forYouPosts, setForYouPosts, userPosts, setUserPosts } = usePostsContext();
  const [commentSection, setCommentSection] = useState(false);


  const handleDelete = (postId) => {
    deletePost(postId, () => {
      setForYouPosts(forYouPosts.filter((p) => p._id !== postId));
      setUserPosts(userPosts.filter((p) => p._id !== postId));
    });
  };

  const handleFollow = async () => {
    await follow(post.author._id);
  };

  const handleLike = async () => {
    const updatedPost = await like(post._id);
    if (updatedPost) {
      const updatedPosts = forYouPosts.map(p =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setForYouPosts(updatedPosts);
    }
    if (updatedPost) {
      const updatedPosts = userPosts.map(p =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setUserPosts(updatedPosts);
    }
  };

  return (
    <div className="p-5 border-b border-secondary border-opacity-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserLink user={post.author} />
          <p>|</p>
          <p className="opacity-50 text-sm">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
        <div>
          {post.author._id !== authUser._id && !authUser.following.includes(post.author._id) && (
            <button
              disabled={loadingFollow}
              onClick={handleFollow}
              className="border border-secondary rounded-full py-2 px-3 mr-auto"
            >
              Follow
            </button>
          )}
          {post.author._id !== authUser._id && authUser.following.includes(post.author._id) && (
            <button
              disabled={loadingFollow}
              onClick={handleFollow}
              className="border border-secondary rounded-full py-2 px-3 mr-auto"
            >
              Unfollow
            </button>
          )}
          {post.author._id === authUser._id && (
            <button
              disabled={loading}
              onClick={() => handleDelete(post._id)}
              className="text-red-500 border border-red-500 border-opacity-50 rounded-full py-2 px-3 mr-auto"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-justify">{post.content}</p>
        <img className="w-full mt-5" alt="Post" />
      </div>

      <div className="flex items-center gap-5 mt-10">
        <div className="flex items-center gap-2 hover:gap-3 duration-200">
          <img onClick={handleLike} disabled={loadingLike} src={post.likes.includes(authUser._id) ? likedIcon : likeIcon} alt="Like"/>
          <p>{post.likes.length}</p>
        </div>

        <div onClick={() => setCommentSection(!commentSection)} className="flex items-center gap-2">
          <img src={commentIcon} alt="Comment"/>
          <p>{post.comments.length}</p>
        </div>
      </div>

      {commentSection &&
        <div className="pl-10 py-10">
          <h2 className="text-xl">Comments</h2>
          <CreateComment postId={post._id}/>
          {post.comments.length === 0 && <p className="opacity-50">Be the first to leave a comment on this post.</p>}
          {post.comments.length > 0 && 
            <div>
              {post.comments.slice().reverse().map((comment) => 
                <Comment key={comment._id} comment={comment}/>
              )}
            </div>
          }

        </div>
      }
    </div>
  );
};

export default Post;
