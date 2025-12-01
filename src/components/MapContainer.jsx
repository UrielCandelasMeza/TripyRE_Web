// MapContainer.jsx
import { useMemo } from "react";
import TravelMap from "./TravelMap";

function MapContainer({ startCoords, destCoords }) {
  const memoizedMapData = useMemo(
    () => ({
      start: startCoords,
      destination: destCoords,
    }),
    [startCoords, destCoords] // Solo se recalcula cuando cambian las coordenadas
  );

  // Mostrar un estado vacío si no hay coordenadas
  if (!startCoords && !destCoords) {
    return (
      <div className="bg-gray-300 rounded-2xl shadow-lg overflow-hidden h-full flex items-center justify-center">
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
    <div className="bg-gray-300 rounded-2xl shadow-lg overflow-hidden h-full">
      <TravelMap
        start={memoizedMapData.start}
        destination={memoizedMapData.destination}
        type="create"
        className="w-full h-full"
      />
    </div>
  );
}

export default MapContainer;
