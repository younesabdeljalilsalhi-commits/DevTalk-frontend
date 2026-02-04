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

  // Debounced search
  useEffect(() => {
    if (!username.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      searchUsers(username);
    }, 500);

    return () => clearTimeout(timeout);
  }, [username]);

  const searchUsers = async (value) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/auth/search-useres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: value }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.users || []);
      } else {
        setError(data.message || "Search failed");
        setResults([]);
      }
    } catch (err) {
      setError("Server error");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle add friend
  const handleAddUser = async () => {
    if (!username.trim()) return;
    try {
      const response = await fetch("http://localhost:8080/auth/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(`${username} added successfully!`);
        setUsername("");
        setResults([]);
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

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
            className="flex-1 justify-center  px-10 py-3 rounded-2xl bg-blue-200 text-gray-800 placeholder-gray-500 focus:outline-none"
          />
          {/* loader */}
          {loading && (
            <div className="absolute right-20 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Results Dropdown */}
        {username && (
          <div className="absolute z-10 mt-2 w-80 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
            {error && <div className="p-3 text-red-500 text-sm">{error}</div>}
            {!loading && results.length === 0 && !error && (
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
                  Src={user.avatar || STpfp}
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
      <div className="flex-1 overflow-y-auto px-4 mt-6 space-y-2">
        {/* existing friends list */}
      </div>
    </aside>
  );
}

export default Sidebar;
