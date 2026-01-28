import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../tools/input";
import Btt from "../../../tools/button";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/auth/request-verification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, confirmPassword }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/authentification", { state: { email } });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100">
      <div className="flex  w-11/12 max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-teal-600 flex flex-col justify-center items-center text-white p-8 text-center">
          <h2 className="p-2.5 md:p-5 text-2xl md:text-4xl m-0 font-light">
            Join Devtalk
          </h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed">
            Create an account and start chatting with developers.
          </p>
        </div>

        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-800 p-8 flex flex-col justify-center items-center text-white gap-6 overflow-y-auto max-h-[90vh]">
          <h2 className="text-2xl md:text-4xl font-light m-0">Sign Up</h2>

          <form
            onSubmit={handleSignup}
            className="w-full max-w-sm flex flex-col gap-4 md:gap-5">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Confirm your password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Btt name="Create Account" goal="submit" disabled={!isFormValid} />
          </form>

          <p className="text-sm md:text-lg text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-bold transition-colors duration-300 hover:text-blue-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
