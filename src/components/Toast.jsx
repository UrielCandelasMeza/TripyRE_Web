import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from "react-icons/io5";

function Toast({ id, type, text, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Trigger exit animation just before removal (3.6s into the 4s lifetime)
    const exitTimer = setTimeout(() => setVisible(false), 3600);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const isError = type === "error";

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl min-w-72 max-w-sm
        border text-white text-sm font-medium
        transition-all duration-300 ease-out
        ${isError
          ? "bg-[#3b1a1a] border-red-500/40"
          : "bg-[#2d1f4f] border-[#725AC1]/40"
        }
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
      `}
    >
      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        {isError ? (
          <IoCloseCircle className="text-red-400 text-lg" />
        ) : (
          <IoCheckmarkCircle className="text-[#9D8DD4] text-lg" />
        )}
      </div>

      {/* Text */}
      <p className="flex-1 leading-snug text-[#E5E5E5]">{text}</p>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="shrink-0 mt-0.5 text-[#B8A8E8]/60 hover:text-white transition-colors duration-200"
      >
        <IoClose className="text-base" />
      </button>
    </div>
  );
}

export default Toast;
