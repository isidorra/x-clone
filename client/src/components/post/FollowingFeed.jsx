import { usePostsContext } from "../../context/PostsContext";
import useGetFollowingPosts from "../../hooks/post/useGetFollowingPosts";
import Post from "./Post.jsx";

const FollowingFeed = () => {
  const {loading} = useGetFollowingPosts();
  const {followingPosts} = usePostsContext();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && followingPosts.length === 0 && <p className="mt-5">You don&apos;t follow anyone for now.</p>}
      {!loading && followingPosts && 
        <div>
          {followingPosts.map((post) => 
            <Post key={post._id} post={post}/>
          )}
        </div>
      }
    </div>
  )
}

export default FollowingFeed