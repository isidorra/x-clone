import { createContext, useContext, useState } from "react";

export const PostsContext = createContext();

export const usePostsContext = () => {
    return useContext(PostsContext);
}

export const PostsContextProvider = ({children}) => {
    const [forYouPosts, setForYouPosts] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([]);

    return (
        <PostsContext.Provider value={{forYouPosts, setForYouPosts, followingPosts, setFollowingPosts}}>
            {children}
        </PostsContext.Provider>
    )
}