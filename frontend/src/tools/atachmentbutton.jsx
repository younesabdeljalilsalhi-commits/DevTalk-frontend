import { useRef, useState } from "react";
import { FiImage, FiVideo, FiFile } from "react-icons/fi";

export default function AttachmentButton({ trigger, options }) {
  const [open, setOpen] = useState(false);
  const inputRefs = useRef({});

  const handleClick = (index) => {
    inputRefs.current[index]?.click();
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div className="absolute bottom-12 left-0 bg-white shadow-xl rounded-xl w-48 p-2 space-y-1 z-50">
          {options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Hidden inputs */}
      {options.map((opt, index) => (
        <input
          key={index}
          type="file"
          accept={opt.accept}
          hidden
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => opt.onSelect?.(e.target.files[0])}
        />
      ))}
    </div>
  );
}
