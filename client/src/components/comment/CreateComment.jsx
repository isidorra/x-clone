import { useState } from "react";
import paperplaneIcon from "../../assets/paperplane.svg";
import useCreateComment from "../../hooks/comment/useCreateComment";
import { usePostsContext } from "../../context/PostsContext";
const CreateComment = ({postId}) => {
  const [comment, setComment] = useState("");
  const {loading, createComment} = useCreateComment();
  const {forYouPosts, setForYouPosts, userPosts, setUserPosts, followingPosts, setFollowingPosts} = usePostsContext();
  const handleSubmit = async(ev) => {
    ev.preventDefault();  
    const updatedPost = await createComment(comment, postId);
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
    if (updatedPost) {
      const updatedPosts = followingPosts.map(p =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setFollowingPosts(updatedPosts);
    }

    setComment("");

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center justify-between gap-2">
        <input
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          placeholder="Your comment..."
          className="outline-none bg-primary p-2 w-full"
        />
        <button disabled={loading}>
          <img src={paperplaneIcon} alt="Post comment" />
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
