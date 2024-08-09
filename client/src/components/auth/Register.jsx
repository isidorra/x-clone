import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import useRegister from "../../hooks/auth/useRegister";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, register } = useRegister();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await register(fullName, email, password, confirmPassword);
  };

  return (
    <div className="max-w-[900px] mx-auto md:flex md:items-center md:justify-between p-5 min-h-screen">
      <div>
        <img src={logo} alt="Logo" className="md:w-96 w-10" />
      </div>

      <div className="md:w-1/2">
        <h1 className="md:text-5xl text-3xl font-bold mt-10 md:mt-0">
          Create account
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
            placeholder="Full Name"
            type="text"
            className="block border border-secondary rounded-md py-2 px-3 bg-primary w-full text-lg outline-none mt-5"
          />
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
          <input
            value={confirmPassword}
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            placeholder="Confirm password"
            type="password"
            className="block border border-secondary rounded-md py-2 px-3 bg-primary w-full text-lg outline-none mt-5"
          />

          <button
            disabled={loading}
            className="rounded-full font-semibold bg-accent text-secondary py-2 px-6 text-lg w-full text-center mt-5 hover:bg-accent-dark duration-200"
          >
            {loading ? <p>Registering...</p> : <p>Register</p>}
          </button>
        </form>

        <h3 className="md:text-lg font-semibold mt-10">Already have an account?</h3>
        <Link
          to={"/login"}
          className="text-accent font-semibold border border-secondary rounded-full py-2 px-6 w-full text-center mt-2 inline-block hover:bg-accent-dark duration-200"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
