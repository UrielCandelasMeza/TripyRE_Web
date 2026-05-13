import { Link } from "react-router";

const MainContent = () => {
  return (
    <div className="flex items-center space-x-8">
      {/* Navigation Links */}
      <div className="hidden items-center space-x-8 md:flex">
        <Link
          to="/#que-es"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          ¿Qué es Tripy?
        </Link>
        <Link
          to="/#contacto"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Contacto
        </Link>
        <Link
          to="/#nosotros"
          className="text-neutro hover:text-moradoClaro transition-colors duration-300"
        >
          Acerca de Nosotros
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <button className="text-oscuro hover:bg-neutro rounded-lg bg-white px-5 py-2 font-medium transition-all duration-300">
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-morado hover:bg-moradoIntermedio hover:shadow-morado/50 rounded-lg px-5 py-2 font-medium text-white shadow-lg transition-all duration-300">
            Registro
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainContent;
