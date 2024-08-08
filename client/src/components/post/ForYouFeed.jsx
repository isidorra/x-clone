import { usePostsContext } from "../../context/PostsContext";
import useGetAllPosts from "../../hooks/useGetAllPosts";
import Post from "./Post";

const ForYouFeed = () => {
  const { loading} = useGetAllPosts();
  const {forYouPosts} = usePostsContext();
  return <div>
    {loading && <p>Loading....</p>}
    {!loading && forYouPosts &&
        <div>
            {forYouPosts.map((post) => 
                <Post key={post._id} post={post}/>
            )}
        </div>}
  </div>;
};

export default ForYouFeed;
