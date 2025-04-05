import { Link, Navigate } from "react-router";
import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    userEmail,
    userPassword,
    setUserEmail,
    setUserPassword,
    setUserData,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
    // } else {
    //   // Optionally, fetch user data from backend using token
    //   // For now, let's just set a message
    //   setUserData("Rajat! You are logged in successfully 🎉");
    // }
  }, [navigate]);

  const handeleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/login",

        data: {
          email: userEmail,
          password: userPassword,
        },
      });

      setTimeout(() => {
        alert(res.data.message);
      }, 100);
      setUserData(res.data);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }

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
