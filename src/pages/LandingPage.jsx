import React from "react";

function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Texto */}
        <div className="order-1 space-y-6 rounded-2xl bg-white/70 p-8 shadow-xl backdrop-blur-md md:order-1">
          <h1 className="text-oscuro text-5xl leading-tight font-bold md:text-6xl">
            La forma más sencilla de realizar tus viajes
          </h1>

          <p className="text-xl" style={{ color: "#242038" }}>
            Descubre destinos increíbles y planifica tu próxima aventura sin complicaciones.
          </p>

          <button
            className="transform rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "#725AC1" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5d4a9d")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#725AC1")}
          >
            Comienza ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="order-2 md:order-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            {/* Espacio para imagen */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
