import { Link } from "react-router";

import MainContent from "./HeaderMain";
import Logged from "./HeaderLogged";

export default function Header({ logged = false }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-oscuro/95 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="text-2xl font-bold text-white">Tripy</div>
          </Link>

          {!logged ? <MainContent /> : <Logged />}
        </div>
      </nav>
    </header>
  );
}
