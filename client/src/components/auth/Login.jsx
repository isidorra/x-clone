import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import useLogin from "../../hooks/auth/useLogin.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await login(email, password);
  };
  return (
    <div className="max-w-[900px] mx-auto md:flex md:items-center md:justify-between p-5 min-h-screen">
      <div>
        <img src={logo} alt="Logo" className="md:w-96 w-10" />
      </div>

      <div className="md:w-1/2">
        <h1 className="md:text-5xl text-3xl font-bold mt-20 md:mt-0">
          Welcome back
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="Email Address"
            type="email"
            className="block border border-secondary rounded-md py-2 px-3 bg-primary w-full text-lg outline-none mt-5"
          />
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Password"
            type="password"
            className="block border border-secondary rounded-md py-2 px-3 bg-primary w-full text-lg outline-none mt-5"
          />

          <button disabled={loading} className="rounded-full font-semibold bg-accent text-secondary py-2 px-6 text-lg w-full text-center mt-5 hover:bg-accent-dark duration-200">
            {loading ? <p>Log in...</p> : <p>Log in</p>}
          </button>
        </form>

        <h3 className="md:text-lg font-semibold mt-10">
          Don&apos;t have an account?
        </h3>
        <Link
          to={"/register"}
          className="text-accent font-semibold border border-secondary rounded-full py-2 px-6 w-full text-center mt-2 inline-block hover:bg-accent-dark duration-200"
        >
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
