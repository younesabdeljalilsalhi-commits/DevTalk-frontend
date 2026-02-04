import React, { useState } from "react";
import Sidebar from "./sidebar";
import Chat from "./chatt";
import Landing from "./landing";
function MainChat() {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar />
      <Landing />
    </div>
  );
}

export default MainChat;
