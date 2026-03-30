// CreateTravel.jsx
import { useState } from "react";
import TravelForm from "../../components/TravelForm";
import MapContainer from "../../components/MapContainer";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import axios from "../../api/axios"
function CreateTravel() {
  const { user } = useAuth();
  const { showMessage, showError } = useToast();
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

  const handleFormSubmit = async (formData) => {
    const travelData = {
      start: {
        name: startAddress,
        lat: startCoords ? startCoords.lat : null,
        lon: startCoords ? startCoords.lon : null,
      },
      destination: {
        name: destAddress,
        lat: destCoords ? destCoords.lat : null,
        lon: destCoords ? destCoords.lon : null,
      },
      cost: formData.cost,
      passengers: formData.maxPeople,
      idCreator: user?.id,
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      departureDate: formData.departureDate,
      arrivalDate: formData.arrivalDate,
      restrictions: formData.restrictions,
    };

    console.log("Datos del viaje para backend:", travelData);

    // Validar que tengamos todos los datos necesarios
    if (
      !travelData.start.lat ||
      !travelData.start.lon ||
      !travelData.destination.lat ||
      !travelData.destination.lon ||
      !travelData.cost ||
      !travelData.passengers ||
      !travelData.idCreator ||
      !travelData.departureTime ||
      !travelData.arrivalTime ||
      !travelData.departureDate ||
      !travelData.start.name ||
      !travelData.destination.name ||
      !travelData.arrivalDate ||
      !travelData.restrictions
    ) {
      alert(
        "Por favor selecciona tanto el punto de partida como el destino desde la lista de sugerencias"
      );
      return;
    }

    try {
      const response = await axios.post("/travels/create", travelData);
      showMessage("¡Viaje creado exitosamente!");
      console.log("Viaje creado:", response.data);
    } catch (error) {
      const msg = error?.response?.data?.message ?? "Error al crear el viaje.";
      showError(msg);
    }
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button and Title */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-oscuro">Crear Viaje</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TravelForm
            onLocationSelect={handleLocationSelect}
            onSubmit={handleFormSubmit}
            startAddress={startAddress}
            destAddress={destAddress}
          />
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <MapContainer startCoords={startCoords} destCoords={destCoords} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTravel;
