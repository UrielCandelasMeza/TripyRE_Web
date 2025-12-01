import { Link } from "react-router";

const MainContent = () => {
  return (
    <div className="flex items-center space-x-8">
      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/#que-es"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          ¿Qué es Tripy?
        </Link>
        <Link
          to="/#contacto"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Contacto
        </Link>
        <Link
          to="/#nosotros"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300">
          Acerca de Nosotros
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="px-5 py-2 text-oscuro bg-white rounded-lg hover:bg-neutro transition-all duration-300 font-medium">
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register">
          <button className="px-5 py-2 text-white bg-morado rounded-lg hover:bg-moradoIntermedio transition-all duration-300 font-medium shadow-lg hover:shadow-morado/50">
            Registro
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainContent;
