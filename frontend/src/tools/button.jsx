import { useState } from "react";

export default function Btt({ name, goal, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type={goal}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`px-12 py-2.5 rounded-lg border-none text-white text-xl font-bold m-auto transition-transform duration-200 ${
        disabled
          ? "bg-gray-500 opacity-60 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600/95 to-teal-600/90 cursor-pointer " +
            (hover ? "scale-103" : "scale-100")
      }`}>
      {name}
    </button>
  );
}
