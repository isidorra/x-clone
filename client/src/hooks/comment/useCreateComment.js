import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../App";

const useCreateComment = () => {
  const [loading, setLoading] = useState(false);

  const createComment = async (comment, postId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        SERVER_URL + "/posts/comment",
        { comment, postId },
        { withCredentials: true }
      );
      if (response.error) throw new Error(response.error);

      return response.data;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {loading, createComment};
};

export default useCreateComment;
