import {useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../App";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const login = async(email, password) => {
    const validInputs = validateInputs(email, password);
    if(!validInputs) return;

    setLoading(true);
    try {
        const response = await axios.post(SERVER_URL + "/auth/login", {email, password}, {withCredentials: true});
        if(response.error) throw new Error(response.error);

        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthUser(response.data);
    } catch(error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }

  }

  return {loading, login};
}

export default useLogin

const validateInputs = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !password) {
        toast.error("All fields are required.");
        return false;
    }
    if(!emailRegex.test(email)) {
        toast.error("Please, enter the valid email address.");
        return false;
    }
    
    return true;
}