import React, { useState } from "react";
import axios from "axios";
import { CiUser, CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      setLoading(true); 

      const response = await axios.post("https://auth-inter-project-xafx.vercel.app/api/signup", {
        username,
        email,
        password,
      });

      setUsername("");
      setEmail("");
      setPassword("");

      // console.log(response.data);
      navigate("/login")
    } catch (error) {
      console.error("Error during signup:", error.response.data);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container h-full w-full flex items-center justify-center">
      <div className="loginbox flex items-center flex-col gap-[.8rem]">
        <h2 className="text-2xl font-medium">Signup</h2>
        <div className="flex items-center bg-gray-100 p-2 rounded-3xl gap-2">
          <CiUser size={18} />
          <input
            type="text"
            placeholder="Enter your name"
            className="bg-transparent outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center bg-gray-100 p-2 rounded-3xl gap-2">
          <CiMail size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-end flex-col">
          <div className="flex items-center bg-gray-100 p-2 rounded-3xl gap-2">
            <CiLock size={18} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="active:scale-75 bg-[#1f2937] p-2 px-3 rounded-full text-white flex items-center gap-2 w-full text-center justify-center"
          onClick={handleSignup}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <AiOutlineLoading size={24} className="text-white animate-spin" />
          ) : (
            // Show the regular icon and text if not loading
            <>
              <CiLocationArrow1 size={18} className="font-extrabold" />
              <span>Signup</span>
            </>
          )}
        </button>
        <Link to="/login">
          <p className="cursor-pointer text-sm text-green-600 px-2">
            Existing user? Back to login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
