import React from "react";

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <div className="order-1 md:order-1 space-y-6 backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-oscuro">
            La forma más sencilla de realizar tus viajes
          </h1>

          <p className="text-xl" style={{ color: "#242038" }}>
            Descubre destinos increíbles y planifica tu próxima aventura sin
            complicaciones.
          </p>

          <button
            className="text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ backgroundColor: "#725AC1" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5d4a9d")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#725AC1")}>
            Comienza ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="order-2 md:order-2">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden">
            {/* Espacio para imagen */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
