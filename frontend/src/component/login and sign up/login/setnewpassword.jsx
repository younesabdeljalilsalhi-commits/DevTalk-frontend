import React, { useState } from "react";
import Input from "../../../tools/input";
import Btt from "../../../tools/button";
import { Link, useParams } from "react-router-dom";

export default function SetNewPassword() {
  const { token } = useParams(); // 👈 get token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/set-new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          confirmPassword,
          token, // 👈 send token to backend
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        alert(data.message || "Failed to set new password");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-3xl rounded-3xl bg-gradient-to-b from-blue-500 to-indigo-700 p-6 md:p-10 lg:p-14 flex flex-col items-center shadow-xl">
        {!success ? (
          <>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 md:mb-6 text-center">
              Set New Password
            </h2>
            <p className="text-white/90 text-base md:text-lg lg:text-xl text-center mb-6 md:mb-8">
              Please enter your new password below to reset your account
              password.
            </p>

            <form
              onSubmit={handleSetPassword}
              className="w-full flex items-center justify-center flex-col gap-4 md:gap-5">
              <Input
                label=""
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/20 text-white placeholder-white/50 focus:bg-white/30 focus:outline-none text-base md:text-lg"
              />
              <Input
                label=""
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/20 text-white placeholder-white/50 focus:bg-white/30 focus:outline-none text-base md:text-lg"
              />

              <Btt
                goal="submit"
                name={loading ? "Saving..." : "Set New Password"}
                disabled={loading || !password || !confirmPassword}
                className="w-full max-w-sm px-6 md:px-12 py-2 md:py-2.5 rounded-lg border-none text-white text-base md:text-lg font-bold transition-transform duration-200 bg-white/20 hover:bg-white/30 cursor-pointer"
              />
            </form>
          </>
        ) : (
          <div className="w-full max-w-md text-center bg-white/20 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg">
            <svg
              className="w-14 md:w-16 h-14 md:h-16 text-green-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>

            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-3 md:mb-4">
              Password Updated!
            </h2>
            <p className="text-white/90 text-base md:text-lg lg:text-xl mb-4 md:mb-6">
              Your password has been successfully updated.
            </p>

            <Link
              to="/login"
              className="text-white text-base md:text-lg font-bold transition-colors duration-300 hover:text-blue-200">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
