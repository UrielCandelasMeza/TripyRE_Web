import { FiUsers, FiXCircle, FiCheckCircle } from "react-icons/fi";

export default function RequestCard({ userName, onAccept, onReject }) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
          <FiUsers className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{userName}</p>
          <p className="text-sm text-gray-500">Solicitud pendiente</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-purple-700"
        >
          <FiCheckCircle className="h-4 w-4" />
          Aceptar
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-gray-700"
        >
          <FiXCircle className="h-4 w-4" />
          Rechazar
        </button>
      </div>
    </div>
  );
}
