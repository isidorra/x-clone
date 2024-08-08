import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { SERVER_URL } from "../App";
import { usePostsContext } from "../context/PostsContext";

const useGetAllPosts = () => {
  const [loading, setLoading] = useState(false);
  const {setForYouPosts} = usePostsContext();

  useEffect(() => {
    const getAllPosts = async() => {
        setLoading(true);
        try{
            const response = await axios.get(SERVER_URL + "/posts", {withCredentials: true});
            if(response.error) throw new Error(response.error);
            setForYouPosts(response.data);
            
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    getAllPosts();
  }, [setForYouPosts]);

  return {loading};
}

export default useGetAllPosts