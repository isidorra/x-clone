import {useState, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SERVER_URL } from '../../App';
import { usePostsContext } from '../../context/PostsContext';

const useGetUserPosts = (id) => {
  const [loading, setLoading] = useState(false);
  const {setUserPosts} = usePostsContext();

  useEffect(() => {
    const getUserPosts = async() => {
        setLoading(true);
        try {
            const response = await axios.get(SERVER_URL + "/posts/user-posts/" + id, {withCredentials: true});
            if(response.error) throw new Error(response.error);

            setUserPosts(response.data.posts);
        } catch(error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    getUserPosts();
  }, [id, setUserPosts]);

  return {loading};
}

export default useGetUserPosts