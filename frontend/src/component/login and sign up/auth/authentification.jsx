import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Input from "../../../tools/input";
import Btt from "../../../tools/button";
import logo from "./../../../assets/ewrtyu 1.png";

export default function Auth() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [verificationCode, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-blue-500 to-indigo-700 p-10 flex flex-col items-center">
        <img src={logo} alt="devtalks logo" className="w-64 md:w-96 mb-12" />
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-light m-0 text-black">
            Enter the verification code:
          </h2>
          <p className="mt-6 md:mt-10 text-lg md:text-xl text-blue-100">
            Please enter the verification code sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
        </div>
        <form
          onSubmit={handleVerify}
          className="w-full flex flex-col items-center gap-6">
          <input
            autoFocus
            type="text"
            placeholder="______"
            value={verificationCode}
            onChange={(e) => setCode(e.target.value)}
            maxLength={7}
            className="w-72 md:w-96 h-16 md:h-20 border-none bg-transparent text-4xl md:text-5xl text-center tracking-[45px] text-white outline-none placeholder:text-white/40 rounded-lg"
          />
          <Btt
            goal="submit"
            name="Verify"
            disabled={verificationCode.length === 0}
            className="w-full max-w-sm"
          />
        </form>
        <p className="mt-8 text-lg md:text-xl text-blue-100">
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
