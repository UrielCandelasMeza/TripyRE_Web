// LocationInput.jsx
import { useState, useRef } from "react";
import { geocodeAdress } from "../services/geocoding";

function LocationInput({
  label,
  name,
  value,
  onChange,
  onLocationSelect,
  placeholder,
}) {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Simular el cambio para el formulario padre
    onChange(e);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (newValue.trim().length < 3) {
        setShowResults(false);
        return;
      }

      const geocodeResults = await geocodeAdress(newValue);
      setResults(geocodeResults);
      setShowResults(true);
    }, 1000);
  };

  const handleSelect = (item) => {
    const coords = {
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    };

    setInputValue(item.display_name);
    onLocationSelect(coords, item.display_name);
    setShowResults(false);
  };

  const handleBlur = () => {
    // Pequeño delay para permitir el click en los resultados
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => inputValue.length >= 3 && setShowResults(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        autoComplete="off"
      />

      {/* Dropdown de resultados */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-gray-100 last:border-b-0">
              <p className="text-sm text-gray-800 font-medium">
                {item.display_name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationInput;
