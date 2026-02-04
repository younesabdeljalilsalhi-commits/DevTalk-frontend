import React, { useState } from "react";
import { FiCamera, FiX, FiCheck } from "react-icons/fi";
import STpfp from "./../../assets/standardpfp.png";
export default function Profile() {
  const [preview, setPreview] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // here i will send the file to backend later
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // send profile picture to backend
    console.log("Profile updated");
  }

  function handleCancel() {
    setPreview(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profile-picture"
            className="relative cursor-pointer group">
            <img
              src={preview || STpfp}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <FiCamera className="text-white text-2xl" />
            </div>
          </label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <p className="text-sm text-gray-500 mt-2">
            Click to change profile picture
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            value="JohnDoe"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-500 "
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Bio
          </label>
          <input
            type="text"
            value="I'm a software developer passionate about creating user-friendly applications."
            className="w-full height-auto px-4 py-3 rounded-xl bg-gray-100 text-gray-500 "
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value="johndoe@email.com"
            disabled
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition">
            <FiCheck /> Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl transition">
            <FiX /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
