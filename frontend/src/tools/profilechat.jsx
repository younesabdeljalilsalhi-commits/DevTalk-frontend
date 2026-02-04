import React from "react";
import Pfp from "./pfp";

export default function ProfileChat({ Src, Profilename, Active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-2  rounded-lg cursor-pointer">
      <Pfp Src={Src} Alt={Profilename} Size="medium" Active={Active} />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-gray-800">{Profilename}</h2>
        </div>

        <h6
          className={
            Active === "Online"
              ? "text-green-500 text-sm"
              : "text-red-500 text-sm"
          }>
          {Active}
        </h6>
      </div>
    </div>
  );
}
