import { useAuthContext } from "../../context/AuthContext";
import profileIcon from "../../assets/profile-user.png";
import imageIcon from "../../assets/image.svg";
import { useState } from "react";
import useCreatePost from "../../hooks/post/useCreatePost";

const CreatePost = () => {
  const { authUser } = useAuthContext();
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const {loading, createPost} = useCreatePost();

  const handleSubmit = async(ev) => {
    ev.preventDefault(); 
    await createPost(content, photo);
    setContent("");
  }

  return (

      <div className="flex items-start gap-5 py-10 px-5 border-b border-secondary border-opacity-50">
        <img
          src={authUser.profilePhoto ? authUser.profilePhoto : profileIcon}
          className="w-10 md:w-12"
        />
        <form onSubmit={handleSubmit} className="w-full">
          <input
            value={content}
            onChange={ev => setContent(ev.target.value)}
            placeholder="What's happening?"
            className="outline-none bg-primary block md:py-2 md:text-lg"
          />

          <div className="flex items-center justify-between">
            <img src={imageIcon} />
            <button disabled={loading} className="bg-accent rounded-full py-2 px-4 md:text-lg hover:bg-accent-dark duration-200">
              Post
            </button>
          </div>
        </form>
      </div>

  );
};

export default CreatePost;
