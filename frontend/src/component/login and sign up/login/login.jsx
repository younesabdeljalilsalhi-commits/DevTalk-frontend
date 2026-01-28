import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../tools/input.jsx";
import Btt from "../../../tools/button.jsx";

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row-reverse w-11/12 max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-teal-600 flex flex-col justify-center items-center text-white p-8 text-center gap-4">
          <h2 className="p-2.5 md:p-5 text-2xl md:text-4xl m-0 font-light">
            Welcome to Devtalk
          </h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed">
            Connect, chat, and collaborate with developers.
          </p>
        </div>
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-800 p-8 flex flex-col justify-center items-center text-white gap-6">
          <h2 className="text-2xl md:text-4xl font-light m-0">Sign In</h2>

          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm flex flex-col gap-4 md:gap-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/forgetpassword"
              className="text-white font-bold transition-colors duration-300 hover:text-blue-200">
              Forgot password!
            </Link>

            <Btt name="Login" goal="submit" />
          </form>

          <p className="text-sm md:text-lg text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-bold transition-colors duration-300 hover:text-blue-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
