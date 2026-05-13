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
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Top row: avatar + route timeline + duration */}
      <div className="flex items-center gap-4 px-6 pt-5 pb-4">
        {/* Avatar */}
        <div className="bg-moradoClaro flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
          <FaUser className="text-morado h-5 w-5" />
        </div>

        {/* Route timeline */}
        <div className="flex flex-1 items-center gap-3">
          <div className="flex flex-col items-start leading-tight">
            <span className="text-oscuro text-lg font-bold">{departureTime ?? "10:30"}</span>
            <span className="text-xs font-medium text-gray-400">{originCity ?? "Origen"}</span>
          </div>

          {/* Line */}
          <div className="flex flex-1 items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <div className="h-px flex-1 bg-gray-300" />
            <span className="bg-morado h-2 w-2 rounded-full" />
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-oscuro text-lg font-bold">{arrivalTime ?? "12:00"}</span>
            <span className="text-xs font-medium text-gray-400">
              {destinationCity ?? "Destino"}
            </span>
          </div>
        </div>

        {/* Date + Duration badges */}
        <div className="flex shrink-0 items-center gap-2">
          {departureDate && (
            <div className="bg-moradoClaro/20 flex items-center gap-1 rounded-full px-3 py-1.5">
              <FiCalendar className="text-morado h-3.5 w-3.5" />
              <span className="text-morado text-xs font-medium">{departureDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5">
            <FiClock className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-600">{duration ?? "1h 30min"}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gray-100" />

      {/* Bottom row: origin/destination + details */}
      <div className="flex gap-6 px-6 py-4">
        {/* Left: From / To */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col">
            <div className="mb-0.5 flex items-center gap-1.5">
              <FiMapPin className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-morado text-xs font-semibold tracking-wide uppercase">
                Desde
              </span>
            </div>
            <span className="text-oscuro ml-5.5 truncate text-sm font-medium">
              {origin ?? "Parque México"}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="mb-0.5 flex items-center gap-1.5">
              <FiMapPin className="text-morado h-4 w-4 shrink-0" />
              <span className="text-moradoIntermedio text-xs font-semibold tracking-wide uppercase">
                Hacia
              </span>
            </div>
            <span className="text-oscuro ml-5.5 truncate text-sm font-medium">
              {destination ?? "Estadio GNP Seguros"}
            </span>
          </div>
        </div>

        {/* Right: driver, passengers, price */}
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdDirectionsCar className="h-4 w-4 shrink-0 text-gray-500" />
            <span>
              Conductor: <span className="text-oscuro font-semibold">{driver ?? "Conductor"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiUsers className="h-4 w-4 shrink-0 text-gray-500" />
            <span>
              <span className="text-oscuro font-semibold">{passengers ?? 1}</span> Pasajero
              {passengers !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-morado text-sm font-semibold">$</span>
            <span className="text-morado text-xl font-bold">{price ?? "50"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;
