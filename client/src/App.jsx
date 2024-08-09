import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/auth/Hero";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Home from "./components/home/Home";
import Layout from "./components/home/Layout";
import ProfilePage from "./components/user/ProfilePage";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        {authUser ? 
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
          </Route>
          :
          <Route path="/" element={<Hero/>}/>
        }
        <Route element={<Layout/>}>
          <Route path="/user/:id" element={authUser ? <ProfilePage/> : <Navigate to="/"/>}/>
        </Route>
        
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={authUser ? <Navigate to="/" /> : <Register />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
export const SERVER_URL = "http://localhost:5000/api";
