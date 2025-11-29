import { Link } from "react-router";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-oscuro/95 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="text-2xl font-bold text-white">Tripy</div>
          </Link>

          {/* Navigation Links & Auth Buttons */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#que-es"
                className="text-neutro hover:text-moradoClaro transition-colors duration-300">
                ¿Qué es Tripy?
              </a>
              <a
                href="#contacto"
                className="text-neutro hover:text-moradoClaro transition-colors duration-300">
                Contacto
              </a>
              <a
                href="#nosotros"
                className="text-neutro hover:text-moradoClaro transition-colors duration-300">
                Acerca de Nosotros
              </a>
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
        </div>
      </nav>
    </header>
  );
}
