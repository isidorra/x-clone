import { useState } from "react";
import CreatePost from "../post/CreatePost";
import ForYouFeed from "../post/ForYouFeed";
import FollowingFeed from "../post/FollowingFeed";

const Feed = () => {
  const [selectedFeed, setSelectedFeed] = useState(0);
  const selectedClasses = "border-b-2 border-accent pb-2 font-semibold mx-auto";
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <CreatePost />

      <div className="flex items-start justify-between p-5 border-b border-secondary border-opacity-50">
        <button
          className={selectedFeed === 0 ? selectedClasses : `mx-auto`}
          onClick={() => setSelectedFeed(0)}
        >
          For you
        </button>
        <button
          className={selectedFeed === 1 ? selectedClasses : `mx-auto`}
          onClick={() => setSelectedFeed(1)}
        >
          Following
        </button>
      </div>

      {selectedFeed === 0 && <ForYouFeed/>}
      {selectedFeed === 1 && <FollowingFeed/>}
    </div>
  );
};

export default Feed;
