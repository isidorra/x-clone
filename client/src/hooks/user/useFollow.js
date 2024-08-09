import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../App";

const useFollow = () => {
  const [loadingFollow, setLoadingFollow] = useState(false);
  const { setAuthUser } = useAuthContext();

  const follow = async (userToFollowId) => {
    setLoadingFollow(true);
    try {
      const response = await axios.post(`${SERVER_URL}/user/follow`,{ userToFollowId },{ withCredentials: true });

      if (response.error) throw new Error(response.error);

      //Update authUser in local storage and state
      const updatedUser = response.data.updatedUser;
      setAuthUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // toast.success("Follow/unfollow action successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  return { loadingFollow, follow };
};

export default useFollow;
