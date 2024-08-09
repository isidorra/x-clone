import UserLink from "../user/UserLink";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../context/AuthContext";
import useDeletePost from "../../hooks/post/useDeletePost";
import { usePostsContext } from "../../context/PostsContext";


const Post = ({ post }) => {
    const { authUser } = useAuthContext();
    const { loading, deletePost } = useDeletePost();
    const { forYouPosts, setForYouPosts } = usePostsContext();
  
    const handleDelete = (postId) => {
      deletePost(postId, () => {
        setForYouPosts(forYouPosts.filter(p => p._id !== postId));
      });
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
            {post.author._id !== authUser._id && (
              <button className="border border-secondary rounded-full py-2 px-3 mr-auto">
                Follow
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
          <img className="w-full mt-5" />
        </div>
      </div>
    );
  };
  
  export default Post;
