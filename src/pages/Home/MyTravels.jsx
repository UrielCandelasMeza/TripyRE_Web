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
    <div className="h-fit rounded-2xl bg-white px-8 py-6 shadow-lg">
      {/* Route Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-start">
          <div className="bg-moradoClaro mr-3 flex h-10 w-10 items-center justify-center rounded-full">
            <FiMapPin className="text-morado h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-moradoIntermedio mb-1 text-xs font-semibold">Origen</p>
            <p className="text-oscuro text-base font-medium">{travelData.start}</p>
          </div>
        </div>

        <div className="bg-moradoClaro mb-2 ml-5 h-8 w-0.5"></div>

        <div className="flex items-start">
          <div className="bg-moradoClaro mr-3 flex h-10 w-10 items-center justify-center rounded-full">
            <FiFlag className="text-morado h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-moradoIntermedio mb-1 text-xs font-semibold">Destino</p>
            <p className="text-oscuro text-base font-medium">{travelData.destination}</p>
          </div>
        </div>
      </div>

      <div className="my-6 h-px bg-gray-200"></div>

      {/* Info Grid */}
      <div className="mb-6 flex justify-around">
        <div className="flex flex-col items-center">
          <FiDollarSign className="text-morado mb-2 h-6 w-6" />
          <p className="text-moradoIntermedio mb-1 text-xs">Costo</p>
          <p className="text-oscuro text-lg font-bold">${travelData.cost}</p>
        </div>

        <div className="flex flex-col items-center">
          <FiUsers className="text-morado mb-2 h-6 w-6" />
          <p className="text-moradoIntermedio mb-1 text-xs">Pasajeros</p>
          <p className="text-oscuro text-lg font-bold">{travelData.maxUsers}</p>
        </div>
      </div>

      {/* Status */}
      <div className="bg-moradoClaro/15 border-morado mt-6 rounded-xl border-l-4 p-5">
        <p className="text-moradoIntermedio mb-2 text-sm font-semibold tracking-wide uppercase">
          Estado del viaje
        </p>
        <p className="text-oscuro text-2xl font-bold">{status}</p>
      </div>

      {/* Action Buttons */}
      {isCreator && travelData.status === "PRE_TRAVEL" && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => onStartTrip(travelData.id)}
            className="bg-morado hover:bg-morado/90 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-colors duration-200"
          >
            <FiPlayCircle className="h-5 w-5" />
            Iniciar Viaje
          </button>
          <button
            onClick={() => onCancelTrip(travelData.id)}
            className="bg-oscuro hover:bg-oscuro/90 flex items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-colors duration-200"
          >
            <FiXCircle className="h-5 w-5" />
            Cancelar Viaje
          </button>
        </div>
      )}

      {isCreator && travelData.status === "IN_TRAVEL" && (
        <button
          onClick={() => onFinishTrip(travelData.id)}
          className="bg-oscuro hover:bg-oscuro/90 mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-colors duration-200"
        >
          <FiCheckCircle className="h-5 w-5" />
          Finalizar Viaje
        </button>
      )}

      {/* Passenger Info */}
      {!isCreator && (
        <div className="bg-moradoClaro/10 mt-6 rounded-xl p-6 text-center">
          <FiAlertCircle className="text-morado mx-auto mb-3 h-10 w-10" />
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
    <div className="h-fit rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-oscuro mb-6 text-xl font-bold">
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
    <div className="mx-auto grid max-w-full grid-cols-2 gap-4">
      {/* Empty State Card */}
      <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
        <div className="bg-moradoClaro mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full">
          <FiCar className="text-morado h-16 w-16" />
        </div>
        <h2 className="text-oscuro mb-3 text-2xl font-bold">No tienes viajes activos</h2>
        <p className="mx-auto mb-8 max-w-md leading-relaxed text-gray-600">
          Aún no te has unido a ningún viaje. Explora los viajes disponibles y únete a uno para
          comenzar tu aventura.
        </p>

        <Link to="/home/create">
          <button className="bg-morado hover:bg-morado/90 mx-auto flex items-center justify-center gap-2 rounded-lg px-10 py-3 font-semibold text-white shadow-lg transition-colors duration-200">
            <FiSearch className="h-5 w-5" />
            Explorar Viajes
          </button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4">
        <div className="flex flex-col justify-center rounded-2xl bg-white p-6 text-center shadow-md">
          <div className="bg-moradoClaro mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
            <FiUsers className="text-morado h-6 w-6" />
          </div>
          <h3 className="text-oscuro mb-2 text-base font-semibold">Comparte gastos</h3>
          <p className="text-sm text-gray-600">Viaja con otros y reduce costos</p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white p-6 text-center shadow-md">
          <div className="bg-moradoClaro mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full">
            <FiShield className="text-morado h-6 w-6" />
          </div>
          <h3 className="text-oscuro mb-2 text-base font-semibold">Viaja seguro</h3>
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
        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Detalles del Viaje</h1>
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
