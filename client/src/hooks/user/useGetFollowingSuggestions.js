import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../App";

const useGetFollowingSuggestions = () => {
  const [loading, setLoading] = useState(false);
  const [usersToFollow, setUsersToFollow] = useState([]);

  useEffect(() => {
    const getFollowingSuggestions = async() => {
        setLoading(true);
        try {
            const response = await axios.get(SERVER_URL + "/user/follow/suggestions", {withCredentials: true});
            if(response.error) throw new Error(response.error);

            setUsersToFollow(response.data);
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    getFollowingSuggestions();
  }, [])

  return {loading, usersToFollow};
}

export default useGetFollowingSuggestions