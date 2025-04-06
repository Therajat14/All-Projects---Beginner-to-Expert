import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext } from "react";
import axios from "axios";

const SignUp = () => {
  const {
    userName,
    setUserName,
    userAge,
    setUserAge,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/signup",

        data: {
          name: userName,
          age: parseInt(userAge),
          email: userEmail,
          password: userPassword,
        },
      });
      console.log(res);
    } catch (error) {
      setTimeout(() => {
        alert(error.response.data.msg);
      }, 100);
      console.log(error.response.data);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border-2 border-amber-300 p-6 shadow-md shadow-amber-700">
        <h1 className="mb-4 text-center text-3xl font-semibold">Signup Page</h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full rounded border p-2"
            required
            placeholder="Full Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
            type="number"
            id="dob"
            name="dob"
            className="w-full rounded border p-2"
            placeholder="Age"
            required
            value={userAge}
            onChange={(e) => {
              setUserAge(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            name="password"
            className="w-full rounded border p-2"
            required
            placeholder="Password"
            minlength="8"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          Already a user?{" "}
          <Link to="/" className="font-bold text-amber-400 hover:underline">
            {" "}
            Login Now .
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
