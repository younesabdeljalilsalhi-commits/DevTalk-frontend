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
        { id: Date.now(), type: "text", content: message, sender: "me" },
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
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll immediately for text messages
    scrollToBottom();

    // Also scroll after images load
    const images = document.querySelectorAll(".chat-img");
    images.forEach((img) => {
      img.onload = scrollToBottom;
    });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-indigo-400">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-200">
          <ProfileChat Src={STpfp} Profilename="Joe Done" Active="Online" />

          <div className="flex gap-3 text-gray-600 text-xl">
            <button className="p-2 hover:bg-indigo-100 rounded-full transition">
              <FiPhone />
            </button>
            <button className="p-2 hover:bg-indigo-100 rounded-full transition">
              <FiVideo />
            </button>
            <button className="p-2 hover:bg-indigo-100 rounded-full transition">
              <FiSettings />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 w-full overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg) =>
            msg.sender === "me" ? (
              <div key={msg.id} className="flex justify-end gap-3 items-end">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-3 rounded-2xl max-w-xs shadow-md break-words">
                  {msg.type === "text" && msg.content}
                  {msg.type === "image" && (
                    <img
                      src={msg.content}
                      alt="sent"
                      className="chat-img rounded-lg max-w-xs max-h-64 object-contain"
                    />
                  )}
                </div>
                <Pfp Src={STpfp} Size="small" border />
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-3">
                <Pfp Src={STpfp} Size="small" border />
                <div className="bg-white p-3 rounded-2xl max-w-xs shadow-sm break-words">
                  {msg.content}
                </div>
              </div>
            ),
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* IMAGE PREVIEW */}
        {selectedImage && (
          <div className="px-4 pb-2 flex justify-start">
            <div className="relative w-32">
              <img
                src={selectedImage.preview}
                alt="preview"
                className="rounded-xl border shadow"
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-lg">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* INPUT */}
        <form
          onSubmit={handleMessageSend}
          className="p-4 flex items-center gap-2 bg-white shadow-inner border-t border-gray-200 sticky bottom-0">
          <AttachmentButton
            trigger={
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition">
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

          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition">
            <FiMic className="text-xl" />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
            <AiOutlineSend className="text-xl" />
          </button>
        </form>
      </main>
    </div>
  );
}
