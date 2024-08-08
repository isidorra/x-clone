import Feed from "./Feed"
import FollowingSuggestions from "./FollowingSuggestions"

const Home = () => {
  return (
    <div className="w-full flex items-start justify-between">
      <Feed/>
      <FollowingSuggestions/>

      

    </div>
  )
}

export default Home