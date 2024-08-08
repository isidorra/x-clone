import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "../App";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);

  const deletePost = async (postId, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${SERVER_URL}/posts/${postId}`, { withCredentials: true });
      if (response.error) throw new Error(response.error);

      toast.success("Successfully deleted post");
      onSuccess(); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deletePost };
};

export default useDeletePost;
