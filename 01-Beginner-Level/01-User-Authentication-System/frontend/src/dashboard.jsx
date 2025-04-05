import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContext";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      console.log("hi there");
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/user",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.data.success) handleLogout("Token Expired, Please Re-login");

      setUserData(res.data);

      console.log(userData);
      console.log(res.data);
      // try {
      //   const response = await axios.get("http://localhost:5000/user", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   console.log(response.data.success);

      //   // setUserData(response.data);
      //   setUserData({
      //     token,
      //   });

      //   console.log(token);

      //   //   // Optionally, fetch user data from backend using token
      //   //   // For now, let's just set a message
      //   //   setUserData("Rajat! You are logged in successfully 🎉");
      // } catch (error) {
      //   console.error("Error fetching user data:", error);
      //   alert("Session expired. Please login again.");
      //   localStorage.removeItem("token");
      //   navigate("/login");
      // }
    };

    fetchUserData();
  }, [navigate, setUserData]);

  const handleLogout = async (logOutMessage = "Logged out successfully!") => {
    localStorage.removeItem("token");
    console.log(logOutMessage);
    alert(logOutMessage);
    navigate("/login");
    return;
  };

  return (
    <div className="border-2 border-amber-600 p-4 text-center">
      <h1 className="mb-4 text-xl font-bold text-white">Dashboard</h1>

      <div className="mb-4 rounded bg-amber-900 p-4 text-left text-sm text-green-400">
        <p>
          <strong>Name:</strong> {userData.userName}
        </p>
        <p>
          <strong>Age:</strong> {userData.age}
        </p>
        <p>
          <strong>Message:</strong> {userData.message}
        </p>
        <p className="break-words">
          <strong>Token:</strong> {token}
        </p>
      </div>

      <button
        className="mt-4 w-28 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
