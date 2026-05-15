import { FiUsers, FiSearch, FiShield } from "react-icons/fi";
import { MdOutlineDirectionsCar as FiCar } from "react-icons/md";
import { Link } from "react-router";

export default function EmptyState() {
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

        <Link to="/home">
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
