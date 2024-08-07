import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
const Hero = () => {
  return (
    <div className="max-w-[900px] mx-auto md:flex md:items-center md:justify-between p-5 min-h-screen">
      <div>
        <img src={logo} alt="Logo" className="md:w-96 w-10" />
      </div>

      <div className="md:w-1/2">
        <h1 className="md:text-5xl text-3xl font-bold mt-20 md:mt-0">Happening now</h1>

        <h2 className="md:text-3xl text-xl font-semibold mt-10">Join today.</h2>
        <Link
          to={"/register"}
          className="rounded-full font-semibold bg-accent text-secondary py-2 px-6 text-lg w-full text-center mt-2 inline-block hover:bg-accent-dark duration-200"
        >
          Create account
        </Link>

        <h3 className="md:text-xl text-lg font-semibold mt-10">
          Already have an account?
        </h3>
        <Link
          to={"/login"}
          className="text-accent font-semibold border border-secondary rounded-full py-2 px-6 text-lg w-full text-center mt-2 inline-block hover:bg-accent-dark duration-200"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Hero;
