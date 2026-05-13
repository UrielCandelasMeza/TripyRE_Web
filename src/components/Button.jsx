import React from "react";

function Button({ text, type, className }) {
  return (
    <button
      type={type}
      className={`transform rounded-xl px-4 py-2 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
