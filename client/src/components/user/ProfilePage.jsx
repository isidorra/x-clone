import { useParams } from "react-router-dom";
import useGetUserInfo from "../../hooks/user/useGetUserInfo";
import userIcon from "../../assets/profile-user.jpg";
import { useAuthContext } from "../../context/AuthContext";
import { format } from "date-fns";
import calendarIcon from "../../assets/calendar.svg";
import useGetUserPosts from "../../hooks/post/useGetUserPosts";
import Post from "../post/Post";
import { usePostsContext } from "../../context/PostsContext";
import useFollow from "../../hooks/user/useFollow";
const ProfilePage = () => {
  const { id } = useParams();
  const { loading, userInfo } = useGetUserInfo(id);
  const { authUser } = useAuthContext();
  const {loadingPosts} = useGetUserPosts(id);
  const {loadingFollow, follow} = useFollow();
  const {userPosts} = usePostsContext();

  const handleFollow = async () => {
    await follow(userInfo._id);
  };
  return (
    <div className="w-full">
      {loading && <p className="p-5">Loading...</p>}

      {!loading && !userInfo && <p className="p-5">404 page</p>}

      {!loading && userInfo && (
        <div>
          <div>
            {userInfo.coverPhoto ? (
              <img src={userInfo.coverPhoto} alt="Cover" />
            ) : (
              <div className="w-full h-72 bg-gray-700"></div>
            )}
          </div>

          <div className="flex items-end justify-between max-w-[900px] mx-auto -my-20">
            {userInfo.profilePhoto ? (
              <img src={userInfo.profilePhoto} alt="Profile" />
            ) : (
              <img src={userIcon} alt="Profile" className="w-48 rounded-full" />
            )}

            {authUser._id === userInfo._id && (
              <button className="rounded-full border border-secondary border-opacity-50 font-semibold py-2 px-4 text-lg duration-200">
                Edit profile
              </button>
            ) }

            {userInfo._id !== authUser._id && !authUser.following.includes(userInfo._id) && (
            <button
              disabled={loadingFollow}
              onClick={handleFollow}
              className="rounded-full border border-secondary border-opacity-50 font-semibold py-2 px-4 text-lg hover:border-accent-dark  duration-200"
            >
              Follow
            </button>
          )}
          {userInfo._id !== authUser._id && authUser.following.includes(userInfo._id) && (
            <button
              disabled={loadingFollow}
              onClick={handleFollow}
              className="rounded-full border border-secondary border-opacity-50 font-semibold py-2 px-4 text-lg hover:border-accent-dark  duration-200"
            >
              Unfollow
            </button>
          )}
            
            
          </div>
          <div className="max-w-[900px] mx-auto mt-20 py-5">
            <h1 className="font-semibold text-2xl">{userInfo.fullName}</h1>
            <div className="flex items-start gap-2 mt-2 opacity-60 ">
              <img src={calendarIcon} alt="Calendar" />
              <p>Joined {format(userInfo.createdAt, "MMMM yyyy")}</p>
            </div>

            <div className="flex items-center gap-5 mt-2 text-lg">
              <div>
                <span className="opacity-100">{userInfo.followers.length}</span>
                <span className="opacity-60 ml-2">Followers</span>
              </div>

              <div>
                <span className="opacity-100">{userInfo.following.length}</span>
                <span className="opacity-60 ml-2">Following</span>
              </div>
            </div>

            {loadingPosts && <p>...</p>}
            {!loadingPosts && userPosts.length === 0 && <p className="mt-10">No posts yet.</p>}
            {!loadingPosts && userPosts && 
            <div className="mt-10 border-t border-secondary border-opacity-50">
              {userPosts.map((userPost) => 
                <Post post={userPost} key={userPost._id}/>
              )}
              
            </div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
