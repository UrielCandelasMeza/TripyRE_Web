import { useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiUser } from "react-icons/fi";

const Logged = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-8">
      {/* Navigation Links */}
      <div className="hidden items-center space-x-8 md:flex">
        <Link
          to="/home"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Inicio
        </Link>
        <Link
          to="/home/create"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Crear Viaje
        </Link>
        <Link
          to="/home/travels"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Mis Viajes
        </Link>
        <Link
          to="/home/chat"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Chat
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4 space-x-4">
        {/* Search Button */}
        <button className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          <FiSearch size={22} />
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-morado hover:bg-morado rounded-full p-3 text-white shadow-lg transition-all duration-300 hover:shadow-purple-500/50"
          >
            <FiUser size={20} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
              <Link
                to="/home/profile"
                className="text-oscuro hover:text-morado block px-4 py-2 transition-colors duration-200 hover:bg-purple-50"
              >
                Mi Perfil
              </Link>
              <button
                onClick={() => {
                  // Aquí puedes agregar la lógica de cerrar sesión
                  console.log("Cerrar sesión");
                }}
                className="text-oscuro hover:text-morado w-full px-4 py-2 text-left transition-colors duration-200 hover:bg-purple-50"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logged;
