import React, { useState } from "react";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const token = response.data.token;

      localStorage.setItem("token", token);

      history("/");
    } catch (error) {
      console.error("Error during login:", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container h-full w-full flex items-center justify-center">
      <div className="loginbox flex items-center flex-col gap-[.8rem]">
        <h2 className="text-2xl font-medium">Login</h2>
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
          onClick={handleLogin}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <AiOutlineLoading size={24} className="text-white animate-spin" />
          ) : (
            <>
              <CiLocationArrow1 size={18} className="font-extrabold" />
              <span>Login</span>
            </>
          )}
        </button>
        <Link to="/signup">
          <p className="cursor-pointer text-sm text-red-600 px-2">
            New here? Signup
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
