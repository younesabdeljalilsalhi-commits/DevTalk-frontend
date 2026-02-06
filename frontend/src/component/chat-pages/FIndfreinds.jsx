import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import STpfp from "../../assets/standardpfp.png";

export default function FindFriends() {
  const navigate = useNavigate();

  /* MOCK USERS I WILL  REMOVE THIS WHEN BACKEND IS READY*/
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "alex",
      online: true,
      requested: false,
      profileImage: STpfp,
    },
    {
      id: 2,
      username: "sara",
      online: false,
      requested: false,
      profileImage: STpfp,
    },
    {
      id: 3,
      username: "john_dev",
      online: true,
      requested: false,
      profileImage: STpfp,
    },
    {
      id: 4,
      username: "mohamed",
      online: false,
      requested: false,
      profileImage: STpfp,
    },
  ]);

  const [search, setSearch] = useState("");

  /* FUTURE BACKEND SEARCH */
  /*
  useEffect(() => {
    if (search.trim() === "") return;

    async function fetchUsers() {
      const res = await fetch(
        `http://localhost:8080/user/search?username=${search}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, [search]);
  */

  /*  ADD FRIEND */
  function handleAddFriend(userId) {
    // FRONTEND ONLY
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, requested: true } : u)),
    );

    /*
    // BACKEND VERSION
    await fetch(`http://localhost:8080/friends/add/${userId}`, {
      method: "POST",
      credentials: "include",
    });
    */
  }

  /* FILTER USERS  */
  const filteredUsers =
    search.trim() === ""
      ? []
      : users.filter((u) =>
          u.username.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 p-6">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-700">Find Friends</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-semibold hover:underline">
          ← Back
        </button>
      </div>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white shadow focus:outline-none"
        />
      </div>

      {/* EMPTY STATE */}
      {search.trim() === "" && (
        <p className="text-center text-gray-500 mt-20">
          Start typing a username to find friends
        </p>
      )}

      {/* RESULTS */}
      {search.trim() !== "" && (
        <div className="max-w-4xl mx-auto grid gap-4">
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500">No users found</p>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-700">{user.username}</p>
                  <p
                    className={`text-sm ${
                      user.online ? "text-green-600" : "text-gray-400"
                    }`}>
                    {user.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleAddFriend(user.id)}
                disabled={user.requested}
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  user.requested
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}>
                {user.requested ? "Requested" : "Add Friend"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
