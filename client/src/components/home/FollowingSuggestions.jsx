import useGetFollowingSuggestions from "../../hooks/user/useGetFollowingSuggestions";
import UserLink from "../user/UserLink";

const FollowingSuggestions = () => {
  const {loading, usersToFollow} = useGetFollowingSuggestions();
  return (
    <div className="sticky top-0 right-0 hidden lg:block max-w-52 w-full">
      <div className=" border-l border-secondary border-opacity-50 p-5 h-screen">
        <h2 className="text-xl p-2">Explore</h2>

        {loading && <p>...</p>}
        {!loading && usersToFollow && 
          <div>
            {usersToFollow.map((user) => 
              <div key={user._id} className="p-2">
                <UserLink user={user}/>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default FollowingSuggestions;
