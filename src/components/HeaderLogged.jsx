import { useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiUser } from "react-icons/fi";

const Logged = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-8">
      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/home"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Inicio
        </Link>
        <Link
          to="/home/create"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Crear Viaje
        </Link>
        <Link
          to="/home/travels"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Mis Viajes
        </Link>
        <Link
          to="/home/chat"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Chat
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4 gap-4">
        {/* Search Button */}
        <button className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          <FiSearch size={22} />
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 text-white bg-morado rounded-full hover:bg-morado transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
            <FiUser size={20} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <Link
                to="/home/profile"
                className="block px-4 py-2 text-oscuro hover:bg-purple-50 hover:text-morado transition-colors duration-200">
                Mi Perfil
              </Link>
              <button
                onClick={() => {
                  // Aquí puedes agregar la lógica de cerrar sesión
                  console.log("Cerrar sesión");
                }}
                className="w-full text-left px-4 py-2 text-oscuro hover:bg-purple-50 hover:text-morado transition-colors duration-200">
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
