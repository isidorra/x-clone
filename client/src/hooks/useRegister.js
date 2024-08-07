import { useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../App";
import { useAuthContext } from "../context/AuthContext";

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const register = async(fullName, email, password, confirmPassword) => {

        const validInputs = validateInputs(fullName, email, password, confirmPassword);
        if(!validInputs) return;

        setLoading(true);
        try {
            const response = await axios.post(SERVER_URL + "/auth/register", {fullName, email, password, confirmPassword}, {withCredentials: true});
            if(response.error) throw new Error(response.error);

            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthUser(response.data);
            

        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return {loading, register};
  
}

export default useRegister

const validateInputs = (fullName, email, password, confirmPassword) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!fullName || !email || !password || !confirmPassword) {
        toast.error("All fields are required.");
        return false;
    }
    if(!emailRegex.test(email)) {
        toast.error("Please, enter the valid email address.");
        return false;
    }
    if(password !== confirmPassword) {
        toast.error("Passwords must match.");
        return false;
    }
    if(password.length < 7) {
        toast.error("Password must be at least 7 characters long.");
        return false;
    }

    return true;
}