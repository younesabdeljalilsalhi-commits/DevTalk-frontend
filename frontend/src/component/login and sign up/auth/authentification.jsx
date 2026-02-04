import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Input from "../../../tools/input";
import Btt from "../../../tools/button";
import logo from "./../../../assets/ewrtyu 1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [verificationCode, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Email verified successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setTimer(60);
    try {
      const res = await fetch(
        "http://localhost:8080/auth/resend-verification-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      if (res.ok) alert("Verification code resent!");
      else {
        const data = await res.json();
        alert(data.message || "Failed to resend code");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-blue-500 to-indigo-700 p-6 md:p-10 flex flex-col items-center">
        <img
          src={logo}
          alt="devtalks logo"
          className="w-40 md:w-64 lg:w-96 mb-6 md:mb-8 lg:mb-12"
        />
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-light m-0 text-black">
            Enter the verification code:
          </h2>
          <p className="mt-3 md:mt-6 lg:mt-10 text-sm md:text-lg lg:text-xl text-blue-100">
            Please enter the verification code sent to{" "}
            <span className="font-semibold break-all">{email}</span>
          </p>
        </div>
        <form
          onSubmit={handleVerify}
          className="w-full flex flex-col items-center gap-4 md:gap-5 lg:gap-6">
          <input
            autoFocus
            type="text"
            placeholder="______"
            value={verificationCode}
            onChange={(e) => setCode(e.target.value)}
            maxLength={7}
            className="w-48 md:w-64 lg:w-96 h-12 md:h-16 lg:h-20 border-none bg-transparent text-3xl md:text-4xl lg:text-5xl text-center tracking-[30px] md:tracking-[40px] lg:tracking-[45px] text-white outline-none placeholder:text-white/40 rounded-lg"
          />
          <Btt
            goal="submit"
            name="Verify"
            disabled={verificationCode.length === 0}
            className="w-full max-w-sm px-6 md:px-12 py-2 md:py-2.5 rounded-lg border-none text-white text-base md:text-lg font-bold transition-transform duration-200 bg-gradient-to-r from-blue-600/95 to-teal-600/90 cursor-pointer hover:opacity-90"
          />
        </form>
        <p className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-lg lg:text-xl text-blue-100 text-center">
          Didn't receive the code?{" "}
          <button
            className={`underline hover:text-white transition-colors ${
              resendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleResend}
            disabled={resendDisabled}>
            {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
}
