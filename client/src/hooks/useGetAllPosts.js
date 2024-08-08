import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { SERVER_URL } from "../App";

const useGetAllPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async() => {
        setLoading(true);
        try{
            const response = await axios.get(SERVER_URL + "/posts", {withCredentials: true});
            if(response.error) throw new Error(response.error);
            setPosts(response.data);
            
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    getAllPosts();
  }, []);

  return {loading, posts};
}

export default useGetAllPosts