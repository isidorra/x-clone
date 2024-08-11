import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { SERVER_URL } from "../../App";
import { usePostsContext } from "../../context/PostsContext";

const useGetFollowingPosts = () => {
    const [loading, setLoading] = useState(false);
    const {setFollowingPosts} = usePostsContext();
  
    useEffect(() => {
      const getFollowingPosts = async() => {
          setLoading(true);
          try{
              const response = await axios.get(SERVER_URL + "/posts/following-posts", {withCredentials: true});
              if(response.error) throw new Error(response.error);
              setFollowingPosts(response.data);
              
          } catch(error) {
              toast.error(error.message);
          } finally {
              setLoading(false);
          }
      }
  
      getFollowingPosts();
    }, [setFollowingPosts]);
  
    return {loading};
}

export default useGetFollowingPosts