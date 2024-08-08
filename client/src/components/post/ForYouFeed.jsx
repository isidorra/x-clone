import useGetAllPosts from "../../hooks/useGetAllPosts";
import Post from "./Post";

const ForYouFeed = () => {
  const { loading, posts } = useGetAllPosts();
  return <div>
    {loading && <p>Loading....</p>}
    {!loading && posts &&
        <div>
            {posts.map((post) => 
                <Post key={post._id} post={post}/>
            )}
        </div>}
  </div>;
};

export default ForYouFeed;
