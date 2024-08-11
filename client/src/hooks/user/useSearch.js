import axios from "axios";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { SERVER_URL } from "../../App";

const useSearch = () => {
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/user/search/${searchQuery}`, { withCredentials: true });
      
      if (!response.data || response.data.length === 0) {
        toast.error("No users found");
        return [];
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      return [];
    } finally {
      setLoading(false);
    }
  }, []); 

  return { loading, search };
};

export default useSearch;

