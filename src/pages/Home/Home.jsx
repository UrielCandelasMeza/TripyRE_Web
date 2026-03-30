import { useEffect, useState } from "react";
import TravelCard from "../../components/TravelCard";
import { FiMapPin } from "react-icons/fi";

function Home() {
  // null = cargando, [] = sin viajes, [...] = hay viajes
  const [travels, setTravels] = useState(null);

  useEffect(() => {
    // Simulación de fetch — reemplazar con llamada real a la API
    setTravels([
      {
        id: 1,
        origin: "Parque México",
        destination: "Estadio GNP Seguros",
        originCity: "CDMX",
        destinationCity: "CDMX",
        departureDate: "2026-03-25",
        departureTime: "10:30",
        arrivalTime: "12:00",
        duration: "1h 30min",
        driver: "Pedrito Perez",
        passengers: 1,
        price: 50,
      },
      {
        id: 2,
        origin: "Guadalajara Centro",
        destination: "Tlaquepaque",
        originCity: "GDL",
        destinationCity: "GDL",
        departureDate: "2026-03-26",
        departureTime: "08:00",
        arrivalTime: "08:45",
        duration: "45min",
        driver: "María López",
        passengers: 3,
        price: 35,
      },
      {
        id: 3,
        origin: "Monterrey Centro",
        destination: "San Pedro Garza",
        originCity: "MTY",
        destinationCity: "MTY",
        departureDate: "2026-03-27",
        departureTime: "14:15",
        arrivalTime: "15:00",
        duration: "45min",
        driver: "Carlos Ruiz",
        passengers: 2,
        price: 40,
      },
    ]);
  }, []);

  // Estado de carga
  if (travels === null) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-morado border-t-transparent animate-spin" />
          <span className="text-gray-400 text-sm">Cargando viajes...</span>
        </div>
      </div>
    );
  }

  // Estado vacío
  if (travels.length === 0) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen px-6">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          {/* Icono decorativo */}
          <div className="w-24 h-24 rounded-full bg-moradoClaro/30 flex items-center justify-center">
            <FiMapPin className="w-10 h-10 text-morado" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-oscuro">
              No hay viajes disponibles
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Aún no hay viajes publicados. Vuelve más tarde o sé el primero en
              publicar uno.
            </p>
          </div>

          <button className="bg-morado hover:bg-moradoIntermedio transition-colors text-white font-semibold rounded-xl px-6 py-3 text-sm">
            Publicar un viaje
          </button>
        </div>
      </div>
    );
  }

  // Lista de viajes
  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="text-2xl font-bold text-oscuro mb-6">
          Viajes disponibles
        </h1>

        <div className="flex flex-col gap-4">
          {travels.map((trip) => (
            <TravelCard
              key={trip.id}
              origin={trip.origin}
              destination={trip.destination}
              originCity={trip.originCity}
              destinationCity={trip.destinationCity}
              departureDate={trip.departureDate}
              departureTime={trip.departureTime}
              arrivalTime={trip.arrivalTime}
              duration={trip.duration}
              driver={trip.driver}
              passengers={trip.passengers}
              price={trip.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
