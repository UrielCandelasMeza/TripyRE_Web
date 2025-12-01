// TravelForm.jsx
import { useState } from "react";
import LocationInput from "./LocationInput";

function TravelForm({ onLocationSelect, onSubmit, startAddress, destAddress }) {
  const [formData, setFormData] = useState({
    cost: "",
    maxPeople: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combinar los datos del formulario con las direcciones
    const completeFormData = {
      ...formData,
      startPoint: startAddress,
      destination: destAddress,
    };

    onSubmit(completeFormData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Punto de partida */}
        <LocationInput
          label="Punto de partida:"
          name="startPoint"
          value={startAddress}
          onChange={handleInputChange}
          onLocationSelect={(coords, address) => {
            onLocationSelect("start", coords, address);
          }}
          placeholder="Ingresa el punto de partida"
        />

        {/* Destino */}
        <LocationInput
          label="Destino:"
          name="destination"
          value={destAddress}
          onChange={handleInputChange}
          onLocationSelect={(coords, address) => {
            onLocationSelect("dest", coords, address);
          }}
          placeholder="Ingresa el destino"
        />

        {/* Costo aproximado */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Costo aproximado:
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">$</span>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Máximo de personas */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Máximo de personas:
          </label>
          <input
            type="number"
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleInputChange}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300 font-semibold">
          Crear viaje
        </button>
      </form>
    </div>
  );
}

export default TravelForm;
