import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileChat from "../../tools/profilechat";
import STpfp from "../../assets/standardpfp.png";
import logo from "../../assets/ewrtyu 1.png";

export default function Userpage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const numberOfFriends = 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 flex">
      {/* LEFT / USER PANEL */}
      <aside className="w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col">
        <ProfileChat
          Src={STpfp}
          Profilename={username || "User"}
          Active="Online"
          onClick={() => navigate("/profile")}
        />

        {/* USER STATS */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Friends</p>
            <p className="text-3xl font-bold text-indigo-600">
              {numberOfFriends}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg font-semibold text-green-600">Online</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-auto space-y-3">
          <button
            onClick={() => navigate("/chatt")}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Start a Chat
          </button>

          <button
            onClick={() => navigate("/friends")}
            className="w-full py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
            Find Friends
          </button>
        </div>
      </aside>

      {/* RIGHT / WELCOME PANEL */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <img
          src={logo}
          alt="DevTalk logo"
          className="h-52 object-contain mb-8 drop-shadow"
        />

        <h1 className="text-5xl font-bold text-gray-700 mb-4">
          Welcome  {username} 
        </h1>

        <p className="text-gray-600 text-lg max-w-lg">
          DevTalk helps you connect instantly. Start chatting with friends or
          discover new people to talk to.
        </p>
      </main>
    </div>
  );
}
