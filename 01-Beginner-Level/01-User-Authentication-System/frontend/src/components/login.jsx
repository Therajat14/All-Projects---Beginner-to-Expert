import { Link } from "react-router";

const Login = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border-2 border-amber-300 p-6 shadow-md shadow-amber-700">
        <h1 className="mb-4 text-center text-3xl font-semibold">Login</h1>

        <form className="space-y-3">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded border p-2"
            required
            placeholder="Email"
          />

          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded border p-2"
            required
            placeholder="Password"
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
