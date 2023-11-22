import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setUserData(decodedToken);
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="h-[100vh] w-full m-auto flex items-center justify-center">
      <div className="p-4 w-[500px] rounded-md overflow-hidden shadow-md h-[300px] border">
        <div className="flex items-center justify-between">
          <div className="left">
            <>
              <h2 className="text-xl font-semibold">
                Hi, {userData?.username}
              </h2>
              <p>Welcome back!</p>
            </>
          </div>
          <div className="right">
            <IoIosLogOut
              onClick={handleLogout}
              className="active:scale-75 cursor-pointer"
              size={25}
              title="Logout"
            />
          </div>
        </div>
        <div className="mt-6">
          {userData && (
            <>
              <p className="font-medium">Your email: {userData?.email}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
