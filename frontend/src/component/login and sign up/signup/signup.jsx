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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      console.error("Full error:", err);
      alert(`Server error: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-teal-600 flex flex-col justify-center items-center text-white p-6 md:p-8 text-center">
          <h2 className="text-2xl md:text-4xl m-0 font-light">Join Devtalk</h2>
          <p className="text-sm md:text-xl opacity-90 leading-relaxed mt-4">
            Create an account and start chatting with developers.
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-800 p-6 md:p-8 flex flex-col justify-center items-center text-white gap-6 overflow-y-auto max-h-screen md:max-h-[90vh]">
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
              className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/90 text-base md:text-lg outline-none text-blue-900"
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/90 text-base md:text-lg outline-none text-blue-900"
            />

            <div className="w-full">
              <label
                htmlFor="Password"
                className="block text-blue-100 text-sm md:text-lg mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/90 text-base md:text-lg outline-none text-blue-900 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 cursor-pointer hover:opacity-70 transition-opacity">
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M15.171 13.576l1.414 1.414A10.018 10.018 0 0019.542 10c-1.274-4.057-5.064-7-9.542-7a9.958 9.958 0 00-4.512 1.074l1.414 1.414a8 8 0 0110.088 10.088zM9.026 5.303l.639.513A3.999 3.999 0 0113.5 13.5H11V12h.5a2 2 0 00-3.464-1.707l-.707-.707z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="ConfirmPassword"
                className="block text-blue-100 text-sm md:text-lg mb-2">
                Confirm your password
              </label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  id="ConfirmPassword"
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/90 text-base md:text-lg outline-none text-blue-900 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 cursor-pointer hover:opacity-70 transition-opacity">
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M15.171 13.576l1.414 1.414A10.018 10.018 0 0019.542 10c-1.274-4.057-5.064-7-9.542-7a9.958 9.958 0 00-4.512 1.074l1.414 1.414a8 8 0 0110.088 10.088zM9.026 5.303l.639.513A3.999 3.999 0 0113.5 13.5H11V12h.5a2 2 0 00-3.464-1.707l-.707-.707z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Btt
              name="Create Account"
              goal="submit"
              disabled={!isFormValid}
              className="w-full px-6 md:px-12 py-2 md:py-2.5 rounded-lg border-none text-white text-base md:text-lg font-bold transition-transform duration-200 bg-gradient-to-r from-blue-600/95 to-teal-600/90 cursor-pointer hover:opacity-90"
            />
          </form>

          <p className="text-xs md:text-lg text-center">
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
