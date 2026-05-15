// MapContainer.jsx
import { useMemo, useState } from "react";
import TravelMap from "./TravelMap";

function MapContainer({ startCoords, destCoords }) {
  const [loading, setLoading] = useState(true);

  const memoizedMapData = useMemo(
    () => ({
      start: startCoords,
      destination: destCoords,
    }),
    [startCoords, destCoords], // Solo se recalcula cuando cambian las coordenadas
  );

  // Mostrar un estado vacío si no hay coordenadas
  if (!startCoords && !destCoords) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl bg-gray-300 shadow-lg">
        <div className="text-center text-gray-600">
          <p className="text-lg font-semibold">Selecciona ubicaciones</p>
          <p className="text-sm">
            El mapa aparecerá aquí cuando selecciones punto de partida y destino
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-gray-300 shadow-lg">
      <TravelMap
        start={memoizedMapData.start}
        destination={memoizedMapData.destination}
        type="create"
        className="h-full w-full"
        handleLoading={setLoading}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
          <div className="flex flex-col items-center gap-4">
            <div className="border-morado h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
            <span className="text-sm text-gray-600">Cargando Mapa...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapContainer;
