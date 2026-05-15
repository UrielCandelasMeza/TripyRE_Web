import {
  FiMapPin,
  FiFlag,
  FiDollarSign,
  FiUsers,
  FiPlayCircle,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { useNavigate } from "react-router";

export default function TravelDetailsCard({
  travelData,
  status,
  isCreator,
  onStartTrip,
  onCancelTrip,
  onFinishTrip,
  onExitTrip,
}) {
  const navigate = useNavigate();

  return (
    <div className="h-fit rounded-2xl bg-white px-8 py-6 shadow-lg">
      {/* Route Section */}
      <div className="mb-6 flex">
        {/* Directions Section */}
        <div>
          <div className="mb-4 flex items-start">
            <div className="bg-moradoClaro mr-3 flex h-10 w-10 items-center justify-center rounded-full">
              <FiMapPin className="text-morado h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-moradoIntermedio mb-1 text-xs font-semibold">Origen</p>
              <p className="text-oscuro text-base font-medium">{travelData?.start?.name}</p>
            </div>
          </div>

          <div className="bg-moradoClaro mb-2 ml-5 h-8 w-0.5"></div>

          <div className="flex items-start">
            <div className="bg-moradoClaro mr-3 flex h-10 w-10 items-center justify-center rounded-full">
              <FiFlag className="text-morado h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-moradoIntermedio mb-1 text-xs font-semibold">Destino</p>
              <p className="text-oscuro text-base font-medium">{travelData?.destination?.name}</p>
            </div>
          </div>
        </div>
        {/* Details Section */}
        <div className="ml-auto flex flex-col items-end">
          <button
            onClick={() => navigate(`/home/travel/${travelData.id}`)}
            className="bg-morado hover:bg-morado/90 rounded-md px-3 py-2 font-medium text-white transition-colors duration-200"
          >
            Ver detalles del viaje
          </button>
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
        <button
          onClick={() => onExitTrip(travelData.id)}
          className="bg-oscuro hover:bg-oscuro/90 mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-colors duration-200"
        >
          <FiXCircle className="h-5 w-5" />
          Salir del viaje
        </button>
      )}
    </div>
  );
}
