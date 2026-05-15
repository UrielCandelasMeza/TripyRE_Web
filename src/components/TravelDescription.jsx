import {
  FiAlertCircle,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import LocationInput from "./LocationInput.jsx";

export default function TravelDescription({ travel, onClick, creator }) {
  return (
    <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="space-y-5">
        {/* Start Point */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            <FiMapPin className="h-3.5 w-3.5 text-gray-400" />
            Punto de partida
          </label>
          <LocationInput name="startPoint" value={travel?.start?.name ?? ""} readOnly />
        </div>

        {/* Destino */}
        <div className="flex flex-col gap-1.5">
          <label className="text-morado flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
            <FiMapPin className="text-morado h-3.5 w-3.5" />
            Destino
          </label>
          <LocationInput name="destination" value={travel?.destination?.name ?? ""} readOnly />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Fecha de partida */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            <FiCalendar className="h-3.5 w-3.5 text-gray-400" />
            Fecha de partida
          </label>
          <input
            type="date"
            name="departureDate"
            value={travel?.departureDate ?? ""}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm transition-all focus:outline-none"
            readOnly
          />
        </div>

        {/* Fecha de llegada (condicional) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-morado flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
            <FiCalendar className="text-morado h-3.5 w-3.5" />
            Fecha de llegada
          </label>
          <input
            type="date"
            name="arrivalDate"
            value={travel?.arrivalDate ?? ""}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm transition-all focus:outline-none"
            readOnly
          />
        </div>

        {/* Hora de partida y llegada */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <FiClock className="h-3.5 w-3.5 text-gray-400" />
              Hora de partida
            </label>
            <input
              type="time"
              name="departureTime"
              value={travel?.departureTime ?? ""}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm transition-all focus:outline-none"
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-morado flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
              <FiClock className="text-morado h-3.5 w-3.5" />
              Hora de llegada
            </label>
            <input
              type="time"
              name="arrivalTime"
              value={travel?.arrivalTime ?? ""}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm transition-all focus:outline-none"
              readOnly
            />
          </div>
        </div>

        {/* Costo y Personas — grid 2 columnas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Costo aproximado */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <FiDollarSign className="h-3.5 w-3.5 text-gray-400" />
              Costo aprox.
            </label>
            <div className="relative">
              <span className="text-morado absolute top-1/2 left-3 -translate-y-1/2 text-sm font-semibold">
                $
              </span>
              <input
                type="number"
                name="cost"
                value={travel?.cost ?? ""}
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-7 text-sm transition-all focus:outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Máximo de personas */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              <FiUsers className="h-3.5 w-3.5 text-gray-400" />
              Pasajeros
            </label>
            <input
              type="number"
              name="maxPeople"
              value={travel?.passengers ?? ""}
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm transition-all focus:outline-none"
              readOnly
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Restricciones */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            <FiAlertCircle className="h-3.5 w-3.5 text-gray-400" />
            Restricciones
          </label>

          {/* Tags */}
          {travel?.restrictions?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {travel?.restrictions?.map((rule, i) => (
                <span
                  key={i}
                  className="bg-moradoClaro/20 text-morado inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium"
                >
                  {rule}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="bg-oscuro mt-1 w-full rounded-lg py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          onClick={onClick}
        >
          Enviar solicitud
        </button>
      </div>
    </div>
  );
}
