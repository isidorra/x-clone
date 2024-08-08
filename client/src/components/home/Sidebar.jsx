import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import homeIcon from "../../assets/home.svg";
import searchIcon from "../../assets/search.svg";
import userIcon from "../../assets/user.svg";

import useLogout from "../../hooks/useLogout";
const Sidebar = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="max-w-44 bg-primary md:w-full sticky top-0 left-0">
      <div className="h-screen p-3 md:p-5  flex flex-col border-r border-secondary border-opacity-50">
        <Link to={"/"} className="mx-auto md:mx-0">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="mt-5 md:mt-10 text-lg">
          <Link
            to={"/"}
            className="flex items-center gap-3 my-3 md:my-2 hover:opacity-60 duration-200"
          >
            <img src={homeIcon} className="mx-auto md:mx-0" />
            <span className="hidden md:block">Home</span>
          </Link>
          <Link
            to={"/"}
            className="flex items-center gap-3 my-3 md:my-2 hover:opacity-60 duration-200"
          >
            <img src={searchIcon} className="mx-auto md:mx-0" />
            <span className="hidden md:block">Explore</span>
          </Link>
          <Link
            to={"/"}
            className="flex items-center gap-3 my-3 md:my-2 hover:opacity-60 duration-200"
          >
            <img src={userIcon} className="mx-auto md:mx-0" />
            <span className="hidden md:block">Profile</span>
          </Link>
        </div>

        <button
          onClick={logout}
          disabled={loading}
          className="mt-auto flex items-center gap-2 text-lg hover:opacity-60 duration-200"
        >
          <img src={logoutIcon} className="rotate-180 mx-auto md:mx-0" />
          {loading ? (
            <p className="md:block hidden">...</p>
          ) : (
            <p className="md:block hidden">Logout</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
