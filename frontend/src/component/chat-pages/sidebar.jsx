import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileChat from "../../tools/profilechat";
import Profilecard from "../../tools/profilecard";
import Input from "../../tools/input";
import STpfp from "../../assets/standardpfp.png";

function Sidebar({ onSelectChat, selectedChat }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // MOCK USERS
  const mockUsers = [
    { id: 1, username: "alex", avatar: STpfp },
    { id: 2, username: "sara", avatar: STpfp },
    { id: 3, username: "john", avatar: STpfp },
    { id: 4, username: "anna", avatar: STpfp },
  ];

  // Debounced search
  useEffect(() => {
    if (!username.trim()) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      // FRONTEND SEARCH
      const filtered = mockUsers.filter((u) =>
        u.username.toLowerCase().includes(username.toLowerCase()),
      );
      setResults(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  return (
    <aside className="w-1/5 h-screen bg-indigo-100 shadow-lg flex flex-col">
      {/* Profile */}
      <div className="mt-7 mb-4 flex justify-center">
        <ProfileChat
          Src={STpfp}
          Profilename="your username"
          Active="Online"
          onClick={() => navigate("/userpage")}
        />
      </div>

      {/* Search */}
      <div className="px-4 relative">
        <div className="relative mt-8 flex justify-center items-center">
          <Input
            type="text"
            placeholder="Search users..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 justify-center px-10 py-3 rounded-2xl bg-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none"
          />
          {loading && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Results Dropdown */}
        {username && (
          <div className="absolute z-10 mt-2 w-80 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
            {results.length === 0 && !loading && (
              <div className="p-3 text-gray-400 text-sm text-center">
                No users found
              </div>
            )}
            {results.map((user) => (
              <button
                key={user.id}
                onClick={() => navigate(`/userpage/${user.id}`)}
                className="w-full text-left hover:bg-gray-100 p-2 transition">
                <Profilecard
                  Src={user.avatar}
                  Profilename={user.username}
                  Lastmessage="Start chatting"
                  Number={0}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto px-4 mt-6 space-y-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100">
        {/* Here you can map existing friends */}
      </div>
    </aside>
  );
}

export default Sidebar;
