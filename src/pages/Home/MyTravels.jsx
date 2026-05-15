import { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";

import EmptyState from "../../components/EmptyState";
import TravelDetailsCard from "../../components/TravelDetailsCard";
import RequestsCard from "../../components/RequestsCard";
import MapContainer from "../../components/MapContainer";

// Main MyTravels Component
export default function MyTravels() {
  const [isCreator, setIsCreator] = useState(false);
  const [travelData, setTravelData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // TODO change mockdata to real fetch from api

    const mockTravelData = {
      id: 1,
      start: {
        name: "Ciudad de México, CDMX, México",
        lat: 19.4326,
        lon: -99.1332,
      },
      destination: {
        name: "Guadalajara, Jalisco, México",
        lat: 20.6667,
        lon: -103.3833,
      },
      cost: "500",
      maxUsers: "4",
      status: "PRE_TRAVEL", // or "IN_TRAVEL"
    };

    const mockRequests = [
      { id: 1, userName: "Juan Pérez", idUser: 101 },
      { id: 2, userName: "María González", idUser: 102 },
    ];

    setTravelData(mockTravelData);
    setRequests(mockRequests);
    setIsCreator(false);

    if (mockTravelData?.status === "IN_TRAVEL") {
      setStatus("Viajando");
    } else if (mockTravelData?.status === "PRE_TRAVEL") {
      setStatus("Preparando Viaje");
    }
  }, []);

  // TODO Change all the handlers to real api actions
  const handleStartTrip = (idTravel) => {
    console.log("Iniciando viaje:", idTravel);
    alert("Viaje iniciado con éxito!");
  };

  const handleCancelTrip = (idTravel) => {
    console.log("Cancelando viaje:", idTravel);
    alert("Viaje cancelado");
  };

  const handleFinishTrip = (idTravel) => {
    console.log("Finalizando viaje:", idTravel);
    alert("Viaje finalizado con éxito!");
  };

  const handleExitTrip = (idTravel) => {
    console.log("Saliendo del viaje:", idTravel);
    alert("Viaje abandonado con exito!");
  };

  const handleAcceptRequest = (request) => {
    console.log("Aceptando solicitud:", request);
    setRequests(requests.filter((req) => req.id !== request.id));
    alert("Solicitud aceptada!");
  };

  const handleRejectRequest = (requestId) => {
    console.log("Rechazando solicitud:", requestId);
    setRequests(requests.filter((req) => req.id !== requestId));
    alert("Solicitud rechazada");
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Detalles del Viaje</h1>
        </div>

        {/* Main Content */}
        {travelData ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Left Column - Travel Details */}
            <TravelDetailsCard
              travelData={travelData}
              status={status}
              isCreator={isCreator}
              onStartTrip={handleStartTrip}
              onCancelTrip={handleCancelTrip}
              onFinishTrip={handleFinishTrip}
              onExitTrip={handleExitTrip}
            />

            {/* Right Column - Extra Info (only if passengers) */}
            {!isCreator && travelData?.status === "PRE_TRAVEL" && (
              <div className="h-fit rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                {/* Header con Estado */}
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-purple-100 p-3">
                    <FiAlertCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">¡Ya eres parte del viaje!</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Mantente atento, el conductor notificará cuando el motor esté en marcha.
                  </p>
                </div>

                {/* Listado de Políticas con Estilo */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                    Información importante
                  </h3>

                  <ul className="space-y-4">
                    {[
                      {
                        title: "Cancelaciones",
                        desc: "Puedes abandonar el viaje en cualquier momento, excepto el día anterior a la salida.",
                        icon: "🕒",
                      },
                      {
                        title: "Inicio del Viaje",
                        desc: "El conductor puede iniciar la ruta hasta 3 días antes de la fecha pactada.",
                        icon: "🚗",
                      },
                      {
                        title: "Seguridad Automática",
                        desc: "Si no se inicia en la fecha marcada, el viaje se cancelará sin afectar tu perfil.",
                        icon: "🛡️",
                      },
                      {
                        title: "Historial",
                        desc: "Al llegar a tu destino, el viaje aparecerá automáticamente en tu perfil.",
                        icon: "✨",
                      },
                    ].map((policy, index) => (
                      <li
                        key={index}
                        className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                      >
                        <span className="shrink-0 text-2xl">{policy.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{policy.title}</p>
                          <p className="text-xs leading-relaxed text-gray-600">{policy.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <p className="text-center text-[10px] text-gray-400 italic">
                      Al participar, aceptas nuestras políticas de comunidad y convivencia.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column - Requests (only if creator and has requests) */}
            {isCreator && requests.length > 0 && travelData?.status === "PRE_TRAVEL" && (
              <RequestsCard
                requests={requests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            )}

            {travelData?.status === "IN_TRAVEL" && (
              <div className="sticky top-24 h-[calc(100vh-8rem)]">
                <MapContainer
                  startCoords={travelData?.start}
                  destCoords={travelData?.destination}
                />
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
