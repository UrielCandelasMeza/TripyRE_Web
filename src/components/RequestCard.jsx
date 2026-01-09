import { FiUsers, FiXCircle, FiCheckCircle } from "react-icons/fi";

export default function RequestCard({ userName, onAccept, onReject }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-3 flex items-center justify-between hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
          <FiUsers className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{userName}</p>
          <p className="text-sm text-gray-500">Solicitud pendiente</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onAccept}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4" />
          Aceptar
        </button>
        <button
          onClick={onReject}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
          <FiXCircle className="w-4 h-4" />
          Rechazar
        </button>
      </div>
    </div>
  );
}
