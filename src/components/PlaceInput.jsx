import { useState, useRef } from "react";
import { FiMapPin, FiX } from "react-icons/fi";

import { geocodeAdress } from "../services/geocoding.js";



export default function PlaceInput({ id, icon, placeholder, value, onChange, onSelect, onClear }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    onChange(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (v.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(async () => {
      const results = await geocodeAdress(v);
      setSuggestions(results);
      setOpen(results.length > 0);
    }, 600);
  };

  const handleSelect = (item) => {
    onChange(item.display_name);
    onSelect({ lat: parseFloat(item.lat), lon: parseFloat(item.lon) }, item.display_name);
    setSuggestions([]);
    setOpen(false);
  };

  const handleBlur = () => setTimeout(() => setOpen(false), 180);

  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-morado shrink-0">{icon}</span>
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="text-oscuro flex-1 bg-transparent text-sm font-medium placeholder-gray-400 outline-none"
        />
        {value && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onChange("");
              onClear();
              setSuggestions([]);
              setOpen(false);
            }}
            className="shrink-0 text-gray-400 transition-colors hover:text-gray-600"
          >
            <FiX size={14} />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          {suggestions.map((item, i) => (
            <button
              key={i}
              onMouseDown={() => handleSelect(item)}
              className="flex w-full items-start gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors last:border-0 hover:bg-purple-50"
            >
              <FiMapPin className="text-morado mt-0.5 shrink-0" size={14} />
              <span className="text-oscuro line-clamp-2 text-sm leading-snug">
                {item.display_name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
