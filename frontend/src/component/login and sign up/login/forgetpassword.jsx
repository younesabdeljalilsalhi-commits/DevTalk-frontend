import React, { useState } from "react";
import Input from "../../../tools/input.jsx";
import Btt from "../../../tools/button.jsx";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        alert(data.message || "Failed to send reset link");
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
        {!sent ? (
          <>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 md:mb-6 text-center">
              Forget Password
            </h2>

            <p className="text-white/90 text-base md:text-lg lg:text-xl text-center mb-6 md:mb-8">
              Enter your email address below to receive a password reset link.
            </p>

            <form
              onSubmit={handleReset}
              className="w-full flex items-center justify-center flex-col gap-4 md:gap-5">
              <Input
                label=""
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 border-none rounded-2xl md:rounded-3xl bg-white/20 text-white placeholder-white/50 focus:bg-white/30 focus:outline-none text-base md:text-lg"
              />

              <Btt
                name={loading ? "Sending..." : "Reset Password"}
                goal="submit"
                disabled={loading || !email}
                className="w-full max-w-sm px-6 md:px-12 py-2 md:py-2.5 rounded-lg border-none text-white text-base md:text-lg font-bold transition-colors duration-300 bg-white/20 hover:bg-white/30 cursor-pointer"
              />
            </form>

            <p className="mt-4 md:mt-6 text-white/80 text-xs md:text-sm lg:text-base text-center">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-semibold hover:text-blue-200 transition-colors duration-300">
                Sign In
              </Link>
            </p>
          </>
        ) : (
          <div className="w-full max-w-md text-center bg-white/20 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg">
            <svg
              className="w-14 md:w-16 h-14 md:h-16 text-green-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>

            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-3 md:mb-4">
              Link Sent!
            </h2>

            <p className="text-white/90 text-base md:text-lg lg:text-xl mb-4 md:mb-6">
              Check your email{" "}
              <span className="font-semibold break-all">{email}</span> for the
              password reset link.
            </p>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={() => setSent(false)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors duration-300 text-sm md:text-base">
                Send Again
              </button>

              <Link
                to="/login"
                className="bg-white/20 hover:bg-white/30 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-colors duration-300 text-center text-sm md:text-base">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
