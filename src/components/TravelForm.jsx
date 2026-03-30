// TravelForm.jsx
import { useState } from "react";
import LocationInput from "./LocationInput";
import { FiMapPin, FiUsers, FiDollarSign, FiClock, FiCalendar, FiAlertCircle, FiX, FiPlus } from "react-icons/fi";

function TravelForm({ onLocationSelect, onSubmit, startAddress, destAddress }) {
  const [formData, setFormData] = useState({
    cost: "",
    maxPeople: "",
    departureDate: "",
    departureTime: "",
    arrivalTime: "",
    arrivalDate: "",
  });
  const [multiDay, setMultiDay] = useState(false);
  const [restrictions, setRestrictions] = useState([]);
  const [restrictionInput, setRestrictionInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      arrivalDate: multiDay ? formData.arrivalDate : formData.departureDate,
      startPoint: startAddress,
      destination: destAddress,
      restrictions,
    };
    onSubmit(completeFormData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Punto de partida */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
            Punto de partida
          </label>
          <LocationInput
            name="startPoint"
            value={startAddress}
            onChange={handleInputChange}
            onLocationSelect={(coords, address) =>
              onLocationSelect("start", coords, address)
            }
            placeholder="Ingresa el punto de partida"
          />
        </div>

        {/* Destino */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-morado uppercase tracking-wide">
            <FiMapPin className="w-3.5 h-3.5 text-morado" />
            Destino
          </label>
          <LocationInput
            name="destination"
            value={destAddress}
            onChange={handleInputChange}
            onLocationSelect={(coords, address) =>
              onLocationSelect("dest", coords, address)
            }
            placeholder="Ingresa el destino"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Fecha de partida */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <FiCalendar className="w-3.5 h-3.5 text-gray-400" />
            Fecha de partida
          </label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
            required
          />
        </div>

        {/* Toggle viaje de más de un día */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={multiDay}
            onChange={(e) => {
              setMultiDay(e.target.checked);
              if (!e.target.checked) setFormData((prev) => ({ ...prev, arrivalDate: "" }));
            }}
            className="w-4 h-4 accent-morado rounded"
          />
          <span className="text-xs text-gray-500">El viaje dura más de un día</span>
        </label>

        {/* Fecha de llegada (condicional) */}
        {multiDay && (
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-morado uppercase tracking-wide">
              <FiCalendar className="w-3.5 h-3.5 text-morado" />
              Fecha de llegada
            </label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleInputChange}
              min={formData.departureDate || undefined}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
              required
            />
          </div>
        )}

        {/* Hora de partida y llegada */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <FiClock className="w-3.5 h-3.5 text-gray-400" />
              Hora de partida
            </label>
            <input
              type="time"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-morado uppercase tracking-wide">
              <FiClock className="w-3.5 h-3.5 text-morado" />
              Hora de llegada
            </label>
            <input
              type="time"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Costo y Personas — grid 2 columnas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Costo aproximado */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <FiDollarSign className="w-3.5 h-3.5 text-gray-400" />
              Costo aprox.
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-morado font-semibold text-sm">
                $
              </span>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full pl-7 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Máximo de personas */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <FiUsers className="w-3.5 h-3.5 text-gray-400" />
              Pasajeros
            </label>
            <input
              type="number"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Restricciones */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <FiAlertCircle className="w-3.5 h-3.5 text-gray-400" />
            Restricciones
          </label>

          {/* Tags */}
          {restrictions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {restrictions.map((rule, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-moradoClaro/20 text-morado text-xs font-medium px-2.5 py-1 rounded-lg"
                >
                  {rule}
                  <button
                    type="button"
                    onClick={() => setRestrictions((prev) => prev.filter((_, idx) => idx !== i))}
                    className="hover:text-red-500 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Input + botón agregar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={restrictionInput}
              onChange={(e) => setRestrictionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && restrictionInput.trim()) {
                  e.preventDefault();
                  setRestrictions((prev) => [...prev, restrictionInput.trim()]);
                  setRestrictionInput("");
                }
              }}
              placeholder="Ej. No fumar, No mascotas..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => {
                if (restrictionInput.trim()) {
                  setRestrictions((prev) => [...prev, restrictionInput.trim()]);
                  setRestrictionInput("");
                }
              }}
              className="px-3 py-2 bg-morado text-white rounded-xl hover:opacity-90 transition-opacity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-oscuro hover:opacity-90 transition-opacity duration-200 text-white text-sm font-semibold rounded-lg mt-1"
        >
          Crear viaje
        </button>
      </form>
    </div>
  );
}

export default TravelForm;
