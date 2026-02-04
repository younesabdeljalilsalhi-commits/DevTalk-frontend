import React, { useState, useEffect, useRef } from "react";
import {
  FiPhone,
  FiVideo,
  FiSettings,
  FiPaperclip,
  FiMic,
  FiImage,
} from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";

import Sidebar from "./sidebar";
import Pfp from "../../tools/pfp";
import ProfileChat from "../../tools/profilechat";
import AttachmentButton from "../../tools/atachmentbutton";
import STpfp from "../../assets/standardpfp.png";

export default function Chatt() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "text", content: "Hello! How are you?", sender: "other" },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);

  const messagesEndRef = useRef(null);

  const handleImageSelect = (file) => {
    const preview = URL.createObjectURL(file);
    setSelectedImage({ file, preview });
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedImage) return;

    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "text",
          content: message,
          sender: "me",
        },
      ]);
    }

    if (selectedImage) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "image",
          content: selectedImage.preview,
          sender: "me",
        },
      ]);
    }

    setMessage("");
    setSelectedImage(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gradient-to-b from-indigo-50 to-indigo-100">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 bg-blue-100 border-b border-indigo-300">
          <ProfileChat Src={STpfp} Profilename="Joe Done" Active="Online" />

          <div className="flex gap-3 text-xl text-gray-600">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiPhone />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiVideo />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <FiSettings />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 w-full overflow-y-auto p-6 flex flex-col justify-end gap-4 bg-gradient-to-t from-blue-500 to-blue-100">
          {messages.map((msg) =>
            msg.sender === "me" ? (
              <div key={msg.id} className="flex justify-end gap-3">
                <div className="bg-indigo-600 text-white p-3 rounded-2xl max-w-xs shadow">
                  {msg.type === "text" && msg.content}
                  {msg.type === "image" && (
                    <img
                      src={msg.content}
                      alt="sent"
                      className="rounded-lg max-w-xs flex items-center justify-center"
                    />
                  )}
                </div>
                <Pfp Src={STpfp} Size="small" />
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-3">
                <Pfp Src={STpfp} Size="small" />
                <div className="bg-gray-200 p-3 rounded-2xl max-w-xs shadow">
                  {msg.content}
                </div>
              </div>
            ),
          )}
          <div ref={messagesEndRef} />
        </div>

        {selectedImage && (
          <div className="px-4 pb-2 ">
            <div className="relative w-32">
              <img
                src={selectedImage.preview}
                alt="preview"
                className="rounded-lg border shadow"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* INPUT */}
        <form
          onSubmit={handleMessageSend}
          className="p-4 flex items-center gap-2 bg-blue-100 border-t border-indigo-300">
          <AttachmentButton
            trigger={
              <button
                type="button"
                className="p-2 hover:bg-gray-200 rounded-full">
                <FiPaperclip className="text-xl" />
              </button>
            }
            options={[
              {
                label: "Image",
                icon: <FiImage />,
                accept: "image/*",
                onSelect: handleImageSelect,
              },
            ]}
          />

          <button type="button" className="p-2 hover:bg-gray-200 rounded-full">
            <FiMic className="text-xl" />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            <AiOutlineSend className="text-xl" />
          </button>
        </form>
      </main>
    </div>
  );
}
