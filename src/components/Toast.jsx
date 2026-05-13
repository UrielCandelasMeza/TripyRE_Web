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
      className={`flex max-w-sm min-w-72 items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-white shadow-2xl transition-all duration-300 ease-out ${
        isError ? "border-red-500/40 bg-[#3b1a1a]" : "border-[#725AC1]/40 bg-[#2d1f4f]"
      } ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} `}
    >
      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        {isError ? (
          <IoCloseCircle className="text-lg text-red-400" />
        ) : (
          <IoCheckmarkCircle className="text-lg text-[#9D8DD4]" />
        )}
      </div>

      {/* Text */}
      <p className="flex-1 leading-snug text-[#E5E5E5]">{text}</p>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="mt-0.5 shrink-0 text-[#B8A8E8]/60 transition-colors duration-200 hover:text-white"
      >
        <IoClose className="text-base" />
      </button>
    </div>
  );
}

export default Toast;
