import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../userContext";

const Login = () => {
  const { userEmail, userPassword, setUserEmail, setUserPassword } =
    useContext(UserContext);
  const handeleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setUserEmail("");
    setUserPassword("");
  };
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border-2 border-amber-300 p-6 shadow-md shadow-amber-700">
        <h1 className="mb-4 text-center text-3xl font-semibold">Login</h1>

        <form className="space-y-3" onSubmit={handeleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded border p-2"
            required
            placeholder="Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />

          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded border p-2"
            required
            placeholder="Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          New user?{" "}
          <Link
            to="/signup"
            className="font-bold text-amber-400 hover:underline"
          >
            Sign Up
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Login;
