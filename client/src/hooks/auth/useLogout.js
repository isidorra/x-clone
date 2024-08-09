import { useState } from "react"
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from "../../App";
import { useAuthContext } from "../../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async() => {
        setLoading(true);
        try {
            const response = await axios.post(SERVER_URL + "/auth/logout",{}, {withCredentials: true});
            if(response.error) throw new Error(response.error);

            
            localStorage.removeItem("user");
            setAuthUser(null);

        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    return {loading, logout};
}

export default useLogout