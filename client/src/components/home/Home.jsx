import useLogout from "../../hooks/useLogout"

const Home = () => {
  const {loading, logout} = useLogout(); 
  return (
    <div>
      <p>Home</p>

      <button onClick={logout} disabled={loading}>{loading ? <p>...</p> : <p>Logout</p>}</button>

    </div>
  )
}

export default Home