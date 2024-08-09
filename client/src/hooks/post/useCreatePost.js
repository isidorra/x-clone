import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { SERVER_URL } from "../../App";
import { usePostsContext } from "../../context/PostsContext";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const {forYouPosts, setForYouPosts} = usePostsContext();
  
  const createPost = async(content, photo) => {
    if(!content && !photo) {
        toast.error("You must either post a content or photo, or both");
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post(SERVER_URL + "/posts", {content, photo}, {withCredentials: true});
        if(response.error) throw new Error(response.error);

        toast.success("Successfully created post");
        setForYouPosts([response.data, ...forYouPosts]);
    } catch(error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }

  return {loading, createPost};
}

export default useCreatePost