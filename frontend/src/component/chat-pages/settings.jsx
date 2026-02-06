import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiCheck, FiX, FiLogOut } from "react-icons/fi";
import STpfp from "../../assets/standardpfp.png";

export default function Settings() {
  const navigate = useNavigate();

  /* MOCK USER (NO BACKEND) */
  const [user, setUser] = useState({
    username: "younes",
    email: "younes@email.com",
    bio: "Hello! I love chatting.",
    profileImage: STpfp,
  });

  const [preview, setPreview] = useState(user.profileImage);
  const [imageFile, setImageFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  /*  GET USER PROFILE  */
  useEffect(() => {
    // async function fetchUserProfile() {
    //   try {
    //     const res = await fetch("http://localhost:8080/user/profile", {
    //       method: "GET",
    //       credentials: "include",
    //     });
    //     const data = await res.json();
    //     if (!res.ok) throw new Error(data.message);
    //     setUser(data);
    //     setPreview(data.profileImage || STpfp);
    //     setUsername(data.username);
    //     setBio(data.bio);
    //   } catch (err) {
    //     console.error(err);
    //     navigate("/login");
    //   }
    // }
    // fetchUserProfile();
  }, [navigate]);

  /* IMAGE CHANGE */
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  /* UPDATE PROFILE */
  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (imageFile) formData.append("image", imageFile);

    // MOCK UPDATE
    setUser({ ...user, username, bio, profileImage: preview });
    alert("Profile updated successfully ✅");

    /* BACKEND VERSION
    try {
      const res = await fetch("http://localhost:8080/user/profile", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setUser(data);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    */
  }

  /* CANCEL CHANGES */
  function handleCancel() {
    setUsername(user.username);
    setBio(user.bio);
    setPreview(user.profileImage);
    setImageFile(null);
  }

  /* LOGOUT */
  function handleLogout() {
    localStorage.removeItem("username");
    navigate("/login");

    /* BACKEND VERSION
    await fetch("http://localhost:8080/user/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
    */
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-700 text-center">
          Settings
        </h1>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer group">
            <img
              src={preview || STpfp}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <FiCamera className="text-white text-2xl" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Click image to change profile picture
          </p>
        </div>

        {/* USERNAME */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100"
          />
        </div>

        {/* BIO */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Bio
          </label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-3 rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl">
              <FiCheck /> Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl">
              <FiX /> Cancel
            </button>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl mt-2">
            <FiLogOut /> Logout
          </button>
        </div>
      </form>
    </div>
  );
}
