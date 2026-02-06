import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileChat from "../../tools/profilechat";
import STpfp from "../../assets/standardpfp.png";
import logo from "../../assets/ewrtyu 1.png";
import { FiBell, FiSettings } from "react-icons/fi";

export default function Userpage() {
  const navigate = useNavigate();

  /* MOCK USER (NO BACKEND)*/
  const [user, setUser] = useState({
    id: 1,
    username: "younes",
    email: "younes@email.com",
    profileImage: STpfp,
    friendsCount: 12,
    online: true,
  });

  /* MOCK NOTIFICATIONS (FRIEND REQUESTS) */
  const [notifications, setNotifications] = useState([
    { id: 1, from: "alex", profileImage: STpfp },
    { id: 2, from: "sara", profileImage: STpfp },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  /* ==============================
     BACKEND FETCH EXAMPLES (COMMENTS)
  ============================== */

  // // Fetch authenticated user on load
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const res = await fetch("http://localhost:8080/user", {
  //         method: "GET",
  //         credentials: "include", // send cookies / JWT
  //       });
  //       if (!res.ok) throw new Error("Not authenticated");
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (err) {
  //       navigate("/login");
  //     }
  //   }
  //   fetchUser();
  // }, [navigate]);

  // // Fetch friend requests / notifications
  // useEffect(() => {
  //   async function fetchNotifications() {
  //     try {
  //       const res = await fetch("http://localhost:8080/friends/requests", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       if (res.ok) {
  //         const data = await res.json();
  //         setNotifications(data);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch notifications", err);
  //     }
  //   }
  //   fetchNotifications();
  // }, []);

  /* ACCEPT FRIEND REQUEST */
  const handleAccept = (id) => {
    // FRONTEND MOCK
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    user.friendsCount += 1;

    // BACKEND EXAMPLE
    // async function acceptFriend() {
    //   try {
    //     const res = await fetch(`http://localhost:8080/friends/accept/${id}`, {
    //       method: "POST",
    //       credentials: "include",
    //     });
    //     if (res.ok) {
    //       setNotifications(prev => prev.filter(n => n.id !== id));
    //       setUser(prev => ({ ...prev, friendsCount: prev.friendsCount + 1 }));
    //     }
    //   } catch (err) {
    //     console.error("Failed to accept friend", err);
    //   }
    // }
    // acceptFriend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 flex">
      {/* LEFT / USER PANEL */}
      <aside className="w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col relative">
        {/* TOP BAR: Notifications + Settings + Profile */}
        <div className="flex flex-row-reverse justify-between items-center mb-4">
          {/* RIGHT SIDE: Notifications + Settings */}
          <div className="flex flex-row-reverse items-center gap-4 relative">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative text-gray-700 hover:text-indigo-600 transition">
              <FiBell className="text-2xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate("/settings")}
              className="text-gray-700 hover:text-indigo-600 transition">
              <FiSettings className="text-2xl" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-10 right-0 w-64 bg-white shadow-xl rounded-2xl overflow-hidden z-50">
                <h3 className="text-gray-700 font-semibold px-4 py-2 border-b">
                  Friend Requests
                </h3>
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No new requests
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={n.profileImage}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-700">
                          {n.from}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAccept(n.id)}
                        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition">
                        Accept
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* LEFT SIDE: Profile */}
          <ProfileChat
            Src={user.profileImage}
            Profilename={user.username}
            Active={user.online ? "Online" : "Offline"}
            
          />
        </div>

        {/* USER STATS */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Friends</p>
            <p className="text-3xl font-bold text-indigo-600">
              {user.friendsCount}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Status</p>
            <p
              className={`text-lg font-semibold ${user.online ? "text-green-600" : "text-gray-500"}`}>
              {user.online ? "Online" : "Offline"}
            </p>
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
            onClick={() => navigate("/findfriends")}
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
          Welcome {user.username}
        </h1>

        <p className="text-gray-600 text-lg max-w-lg">
          DevTalk helps you connect instantly. Start chatting with friends or
          discover new people to talk to.
        </p>
      </main>
    </div>
  );
}
