import { FiMapPin, FiUser } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";

function TravelCard({ image, destination, origin, username }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <HiOutlinePhotograph className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Destino Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <FiMapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Origen:</span>
            <span className="text-sm">{origin || "Ciudad de origen"}</span>
          </div>

          <div className="flex items-center gap-2 text-morado">
            <FiMapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Destino:</span>
            <span className="text-sm font-semibold">
              {destination || "Ciudad destino"}
            </span>
          </div>
        </div>

        {/* Username */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser className="w-5 h-5" />
            <span className="text-sm">
              Creado por{" "}
              <span className="font-medium text-gray-900">
                {username || "@usuario"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelCard;
