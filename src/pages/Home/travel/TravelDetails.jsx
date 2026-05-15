import { useEffect, useState } from "react";
import { useParams } from "react-router";

import MapContainer from "../../../components/MapContainer";
import TravelDescription from "../../../components/TravelDescription";

export default function TravelDetails() {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    // TODO Fetch travel details

    // Mock data
    setTravel({
      start: {
        name: "Monterrey Centro, Nuevo León",
        lat: 25.6714,
        lon: -100.309,
      },
      destination: {
        name: "San Pedro Garza García, Nuevo León",
        lat: 25.6589,
        lon: -100.4023,
      },
      cost: 40,
      passengers: 2,
      departureDate: "2026-05-09",
      arrivalDate: "2026-05-09",
      departureTime: "22:00",
      arrivalTime: "18:00",
      restrictions: ["No mascotas", "Sin fumar", "Sin alcohol"],
    });

    setCreator({ id: 3, name: "Carlos", lastName: "Ruiz", userName: "carlitos" });
  }, []);

  const handleClick = () => {
    if (confirm("Seguro que quieres enviar una solicitud de viaje a este usuario?")) {
      alert("Solicitud enviada");
      console.log(travel);
    }
  };

  if (travel === null || creator === null) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="border-morado h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
          <span className="text-sm text-gray-400">Cargando Viaje...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button and Title */}
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-oscuro text-2xl font-bold">Enviar Solicitud</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Display Data Section */}
          <TravelDescription travel={travel} onClick={handleClick} creator={creator} />

          {/* Map Section */}
          <div className="sticky top-24 h-[calc(100vh-8rem)]">
            <MapContainer startCoords={travel?.start} destCoords={travel?.destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
