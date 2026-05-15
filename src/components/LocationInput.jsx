// LocationInput.jsx
import { useState, useRef, useEffect } from "react";
import { geocodeAdress } from "../services/geocoding";

function LocationInput({ label, name, value, onChange, onLocationSelect, placeholder, readOnly }) {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const timerRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

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
      <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => inputValue.length >= 3 && setShowResults(true)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none"
        autoComplete="off"
        readOnly={readOnly}
      />

      {/* Dropdown de resultados */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="cursor-pointer border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-purple-50"
            >
              <p className="text-sm font-medium text-gray-800">{item.display_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationInput;
