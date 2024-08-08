import { Link } from "react-router-dom";
import profileIcon from "../../assets/profile-user.png";

const UserLink = ({user}) => {
  return (
    <Link className="flex items-center gap-3">
        <img src={user.profilePhoto ? user.profilePhoto : profileIcon} className="w-12"/>
        <span className="text-lg">{user.fullName}</span>
    </Link>
  )
}

export default UserLink