import { Link } from "react-router-dom";
import profileIcon from "../../assets/profile-user.png";

const UserLink = ({user}) => {
  return (
    <Link to={`/user/${user._id}`} className="flex items-center gap-3">
        <img src={user.profilePhoto ? user.profilePhoto : profileIcon} className="w-10"/>
        <span className="text-sm md:text-base">{user.fullName}</span>
    </Link>
  )
}

export default UserLink