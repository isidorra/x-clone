import { useAuthContext } from "../../context/AuthContext";
import profileIcon from "../../assets/profile-user.png";
import imageIcon from "../../assets/image.svg";
import { useState } from "react";
import useCreatePost from "../../hooks/post/useCreatePost";
import app from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreatePost = () => {
  const { authUser } = useAuthContext();
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);  
  const { loading, createPost } = useCreatePost();

  const storage = getStorage(app);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let photoURL = null;

    if (photo) {
      const storageRef = ref(storage, `images/${photo.name}`);
      const snapshot = await uploadBytes(storageRef, photo);
      photoURL = await getDownloadURL(snapshot.ref); 
    }

    await createPost(content, photoURL);
    setContent("");
    setPhoto(null);
  };

  const handleImageUpload = (ev) => {
    const file = ev.target.files[0];
    setPhoto(file);
  };

  const triggerFileInput = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className="flex items-start gap-5 py-10 px-5 border-b border-secondary border-opacity-50">
      <img
        src={authUser.profilePhoto ? authUser.profilePhoto : profileIcon}
        className="w-10 md:w-12"
      />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          placeholder="What's happening?"
          className="outline-none bg-primary block md:py-2 md:text-lg"
        />

        <div className="flex items-center justify-between">
          <input 
            id="photo-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            style={{ display: 'none' }} 
          />

          <img src={imageIcon} onClick={triggerFileInput} className="cursor-pointer" />

          <button 
            disabled={loading} 
            className="bg-accent rounded-full py-2 px-4 md:text-lg hover:bg-accent-dark duration-200"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;