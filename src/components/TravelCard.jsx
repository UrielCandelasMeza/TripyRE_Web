import { FiMapPin, FiUsers, FiClock, FiCalendar } from "react-icons/fi";
import { MdDirectionsCar } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function TravelCard({
  origin,
  destination,
  originCity,
  destinationCity,
  departureDate,
  departureTime,
  arrivalTime,
  duration,
  driver,
  passengers,
  price,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full">
      {/* Top row: avatar + route timeline + duration */}
      <div className="flex items-center gap-4 px-6 pt-5 pb-4">
        {/* Avatar */}
        <div className="shrink-0 w-12 h-12 rounded-full bg-moradoClaro flex items-center justify-center">
          <FaUser className="w-5 h-5 text-morado" />
        </div>

        {/* Route timeline */}
        <div className="flex-1 flex items-center gap-3">
          <div className="flex flex-col items-start leading-tight">
            <span className="text-lg font-bold text-oscuro">
              {departureTime ?? "10:30"}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {originCity ?? "Origen"}
            </span>
          </div>

          {/* Line */}
          <div className="flex-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="flex-1 h-px bg-gray-300" />
            <span className="w-2 h-2 rounded-full bg-morado" />
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-lg font-bold text-oscuro">
              {arrivalTime ?? "12:00"}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {destinationCity ?? "Destino"}
            </span>
          </div>
        </div>

        {/* Date + Duration badges */}
        <div className="shrink-0 flex items-center gap-2">
          {departureDate && (
            <div className="flex items-center gap-1 bg-moradoClaro/20 rounded-full px-3 py-1.5">
              <FiCalendar className="w-3.5 h-3.5 text-morado" />
              <span className="text-xs font-medium text-morado">
                {departureDate}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1.5">
            <FiClock className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-600">
              {duration ?? "1h 30min"}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gray-100" />

      {/* Bottom row: origin/destination + details */}
      <div className="flex gap-6 px-6 py-4">
        {/* Left: From / To */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <FiMapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-xs font-semibold text-morado uppercase tracking-wide">
                Desde
              </span>
            </div>
            <span className="text-sm font-medium text-oscuro ml-5.5 truncate">
              {origin ?? "Parque México"}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-0.5">
              <FiMapPin className="w-4 h-4 text-morado shrink-0" />
              <span className="text-xs font-semibold text-moradoIntermedio uppercase tracking-wide">
                Hacia
              </span>
            </div>
            <span className="text-sm font-medium text-oscuro ml-5.5 truncate">
              {destination ?? "Estadio GNP Seguros"}
            </span>
          </div>
        </div>

        {/* Right: driver, passengers, price */}
        <div className="flex flex-col gap-2 justify-center items-start">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdDirectionsCar className="w-4 h-4 text-gray-500 shrink-0" />
            <span>
              Conductor:{" "}
              <span className="font-semibold text-oscuro">
                {driver ?? "Conductor"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiUsers className="w-4 h-4 text-gray-500 shrink-0" />
            <span>
              <span className="font-semibold text-oscuro">
                {passengers ?? 1}
              </span>{" "}
              Pasajero{passengers !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-morado font-semibold text-sm">$</span>
            <span className="text-xl font-bold text-morado">
              {price ?? "50"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;
