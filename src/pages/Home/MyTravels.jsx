import { useState, useEffect } from "react";
import {
  FiMapPin,
  FiFlag,
  FiDollarSign,
  FiUsers,
  FiPlayCircle,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiShield,
} from "react-icons/fi";

import { MdOutlineDirectionsCar as FiCar } from "react-icons/md";

import { Link } from "react-router";

import RequestCard from "../../components/RequestCard";

// TravelDetailsCard Component
function TravelDetailsCard({
  travelData,
  status,
  isCreator,
  onStartTrip,
  onCancelTrip,
  onFinishTrip,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg py-6 px-8 h-fit">
      {/* Route Section */}
      <div className="mb-6">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-moradoClaro flex items-center justify-center mr-3">
            <FiMapPin className="w-5 h-5 text-morado" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-moradoIntermedio font-semibold mb-1">
              Origen
            </p>
            <p className="text-base text-oscuro font-medium">
              {travelData.start}
            </p>
          </div>
        </div>

        <div className="w-0.5 h-8 bg-moradoClaro ml-5 mb-2"></div>

        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-moradoClaro flex items-center justify-center mr-3">
            <FiFlag className="w-5 h-5 text-morado" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-moradoIntermedio font-semibold mb-1">
              Destino
            </p>
            <p className="text-base text-oscuro font-medium">
              {travelData.destination}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-6"></div>

      {/* Info Grid */}
      <div className="flex justify-around mb-6">
        <div className="flex flex-col items-center">
          <FiDollarSign className="w-6 h-6 text-morado mb-2" />
          <p className="text-xs text-moradoIntermedio mb-1">Costo</p>
          <p className="text-lg font-bold text-oscuro">${travelData.cost}</p>
        </div>

        <div className="flex flex-col items-center">
          <FiUsers className="w-6 h-6 text-morado mb-2" />
          <p className="text-xs text-moradoIntermedio mb-1">Pasajeros</p>
          <p className="text-lg font-bold text-oscuro">{travelData.maxUsers}</p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 bg-moradoClaro/15 border-l-4 border-morado rounded-xl p-5">
        <p className="text-sm font-semibold text-moradoIntermedio uppercase tracking-wide mb-2">
          Estado del viaje
        </p>
        <p className="text-2xl font-bold text-oscuro">{status}</p>
      </div>

      {/* Action Buttons */}
      {isCreator && travelData.status === "PRE_TRAVEL" && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => onStartTrip(travelData.id)}
            className="bg-morado hover:bg-morado/90 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
            <FiPlayCircle className="w-5 h-5" />
            Iniciar Viaje
          </button>
          <button
            onClick={() => onCancelTrip(travelData.id)}
            className="bg-oscuro hover:bg-oscuro/90 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
            <FiXCircle className="w-5 h-5" />
            Cancelar Viaje
          </button>
        </div>
      )}

      {isCreator && travelData.status === "IN_TRAVEL" && (
        <button
          onClick={() => onFinishTrip(travelData.id)}
          className="w-full bg-oscuro hover:bg-oscuro/90 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mt-6 transition-colors duration-200">
          <FiCheckCircle className="w-5 h-5" />
          Finalizar Viaje
        </button>
      )}

      {/* Passenger Info */}
      {!isCreator && (
        <div className="bg-moradoClaro/10 rounded-xl p-6 text-center mt-6">
          <FiAlertCircle className="w-10 h-10 text-morado mx-auto mb-3" />
          <p className="text-oscuro text-sm leading-relaxed">
            Estás unido a este viaje. Espera a que el conductor inicie el viaje.
          </p>
        </div>
      )}
    </div>
  );
}

// RequestsCard Component
function RequestsCard({ requests, onAccept, onReject }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
      <h2 className="text-xl font-bold text-oscuro mb-6">
        Solicitudes Pendientes ({requests.length})
      </h2>
      <div className="space-y-3">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            userName={request.userName}
            onAccept={() => onAccept(request)}
            onReject={() => onReject(request.id)}
          />
        ))}
      </div>
    </div>
  );
}

// EmptyState Component
function EmptyState() {
  return (
    <div className="max-w-full mx-auto grid grid-cols-2 gap-4">
      {/* Empty State Card */}
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-32 h-32 rounded-full bg-moradoClaro flex items-center justify-center mx-auto mb-6">
          <FiCar className="w-16 h-16 text-morado" />
        </div>
        <h2 className="text-2xl font-bold text-oscuro mb-3">
          No tienes viajes activos
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
          Aún no te has unido a ningún viaje. Explora los viajes disponibles y
          únete a uno para comenzar tu aventura.
        </p>

        <Link to="/home/create">
          <button className="bg-morado hover:bg-morado/90 text-white py-3 px-10 rounded-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-colors duration-200 shadow-lg">
            <FiSearch className="w-5 h-5" />
            Explorar Viajes
          </button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4">
        <div className="flex flex-col bg-white rounded-2xl shadow-md p-6 text-center justify-center">
          <div className="w-14 h-14 rounded-full bg-moradoClaro flex items-center justify-center mx-auto mb-3">
            <FiUsers className="w-6 h-6 text-morado" />
          </div>
          <h3 className="text-base font-semibold text-oscuro mb-2">
            Comparte gastos
          </h3>
          <p className="text-sm text-gray-600">
            Viaja con otros y reduce costos
          </p>
        </div>

        <div className="flex flex-col bg-white rounded-2xl shadow-md p-6 text-center justify-center">
          <div className="w-14 h-14 rounded-full bg-moradoClaro flex items-center justify-center mx-auto mb-3">
            <FiShield className="w-6 h-6 text-morado" />
          </div>
          <h3 className="text-base font-semibold text-oscuro mb-2">
            Viaja seguro
          </h3>
          <p className="text-sm text-gray-600">Usuarios verificados</p>
        </div>
      </div>
    </div>
  );
}

// Main MyTravels Component
export default function MyTravels() {
  const [isCreator, setIsCreator] = useState(false);
  const [travelData, setTravelData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockTravelData = {
      id: 1,
      start: "Ciudad de México, CDMX, México",
      destination: "Guadalajara, Jalisco, México",
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
    setIsCreator(true);

    if (mockTravelData.status === "IN_TRAVEL") {
      setStatus("Viajando");
    } else if (mockTravelData.status === "PRE_TRAVEL") {
      setStatus("Preparando Viaje");
    }
  }, []);

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
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Detalles del Viaje
          </h1>
        </div>

        {/* Main Content */}
        {travelData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Travel Details */}
            <TravelDetailsCard
              travelData={travelData}
              status={status}
              isCreator={isCreator}
              onStartTrip={handleStartTrip}
              onCancelTrip={handleCancelTrip}
              onFinishTrip={handleFinishTrip}
            />

            {/* Right Column - Requests (only if creator and has requests) */}
            {isCreator && requests.length > 0 && (
              <RequestsCard
                requests={requests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
