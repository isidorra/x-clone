import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import {SERVER_URL} from "../../App";

const useGetUserInfo = (id) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async() => {
        setLoading(true);
        try {
            const response = await axios.get(SERVER_URL + "/user/" + id, {withCredentials: true});
            if(response.error) throw new Error(response.error);

            setUserInfo(response.data);
            console.log(response.data);
        } catch(error) {    
            toast.error(error.message);
        } finally { 
            setLoading(false);
        }
    }

    getUserInfo();
  },[id] )

  return {loading, userInfo};


}

export default useGetUserInfo