import React from "react";

function Input({ value, name, onChange, type = "text", placeholder, label }) {
  return (
    <label className="flex flex-col gap-2">
      <p className="text-oscuro">{label}</p>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="text-oscuro rounded-lg border border-slate-500 px-3 py-2"
      />
    </label>
  );
}

export default Input;
