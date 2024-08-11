import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {SERVER_URL} from "../../App";

const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  

  const deleteComment = async(commentId, postId) => {
    setLoading(true);
    try {
        const response = await axios.put(SERVER_URL + "/posts/delete-comment", {commentId, postId}, {withCredentials: true});
        if(response.error) throw new Error(response.error);

        return response.data;
    } catch(error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  return {loading, deleteComment};
}

export default useDeleteComment