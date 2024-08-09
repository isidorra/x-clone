import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../App";
import toast from "react-hot-toast";

const useLike = () => {
  const [loading, setLoading] = useState(false);

  const like = async(postId) => {
    setLoading(true);
    try {
        const response = await axios.put(SERVER_URL + "/posts/like", {postId}, {withCredentials: true});
        if(response.error) throw new Error(response.error);

        return response.data;
    } catch(error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }

  return {loading, like};
}

export default useLike