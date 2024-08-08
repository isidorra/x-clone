import Sidebar from "./Sidebar"
import {Outlet} from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex items-start">
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Layout