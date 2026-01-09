// CreateTravel.jsx
import { useState } from "react";
import TravelForm from "../../components/TravelForm";
import MapContainer from "../../components/MapContainer";

function CreateTravel() {
  const [startCoords, setStartCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [destAddress, setDestAddress] = useState("");

  const handleLocationSelect = (type, coords, address) => {
    if (type === "start") {
      setStartCoords(coords);
      setStartAddress(address);
    } else {
      setDestCoords(coords);
      setDestAddress(address);
    }
  };

  const handleFormSubmit = (formData) => {
    const travelData = {
      start: startAddress,
      destination: destAddress,
      cost: formData.cost,
      maxUsers: formData.maxPeople,
      startCoords: startCoords
        ? {
            lat: startCoords.lat,
            lon: startCoords.lon,
          }
        : null,
      destCoords: destCoords
        ? {
            lat: destCoords.lat,
            lon: destCoords.lon,
          }
        : null,
    };

    console.log("Datos del viaje para backend:", travelData);

    // Validar que tengamos todos los datos necesarios
    if (
      !travelData.start ||
      !travelData.destination ||
      !travelData.startCoords ||
      !travelData.destCoords
    ) {
      alert(
        "Por favor selecciona tanto el punto de partida como el destino desde la lista de sugerencias"
      );
      return;
    }

    // Aquí iría la lógica para enviar al backend
    // await api.createTravel(travelData);
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button and Title */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Crear Viaje</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TravelForm
            onLocationSelect={handleLocationSelect}
            onSubmit={handleFormSubmit}
            startAddress={startAddress}
            destAddress={destAddress}
          />
          <MapContainer startCoords={startCoords} destCoords={destCoords} />
        </div>
      </div>
    </div>
  );
}

export default CreateTravel;
