import React from "react";

function Button({ text, type, className }) {
  return (
    <button
      type={type}
      className={` font-semibold px-4 py-2 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105
${className}`}>
      {text}
    </button>
  );
}

export default Button;
