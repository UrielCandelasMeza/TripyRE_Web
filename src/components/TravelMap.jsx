import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { HiLocationMarker } from "react-icons/hi";
import { createRoot } from "react-dom/client";

import "maplibre-gl/dist/maplibre-gl.css";

export default function TravelMap({
  start,
  destination,
  className = "",
  style = {},
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Función para normalizar coords
  const normalizeCoords = (coords) => {
    if (!coords) return null;

    // Si es un objeto con lat/lon
    if (
      coords &&
      typeof coords === "object" &&
      "lat" in coords &&
      "lon" in coords
    ) {
      return [coords.lon, coords.lat]; // MapLibre usa [lng, lat]
    }
    // Si es un objeto con latitude/longitude
    if (coords && typeof coords === "object" && "latitude" in coords) {
      return [coords.longitude, coords.latitude];
    }
    // Si es un array [lng, lat]
    if (Array.isArray(coords) && coords.length === 2) {
      return coords;
    }
    return null;
  };

  const startCoord = normalizeCoords(start);
  const destCoord = normalizeCoords(destination);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Inicializar mapa con centro por defecto (México)
    const defaultCenter = [-99.1332, 19.4326]; // Ciudad de México
    const center =
      startCoord && destCoord
        ? [
            (startCoord[0] + destCoord[0]) / 2,
            (startCoord[1] + destCoord[1]) / 2,
          ]
        : startCoord || destCoord || defaultCenter;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=9sBTuNSMFV23mLxOZJXu",
      center: center,
      zoom: startCoord && destCoord ? 10 : 5,
    });

    map.current.on("load", () => {
      // Solo agregar línea si ambas coordenadas existen
      if (startCoord && destCoord) {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [startCoord, destCoord],
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3b82f6",
            "line-width": 4,
            "line-dasharray": [2, 2],
          },
        });
      }

      // Marcador de inicio (verde) - solo si existe
      if (startCoord) {
        const startMarkerDiv = document.createElement("div");
        const startRoot = createRoot(startMarkerDiv);
        startRoot.render(
          <HiLocationMarker
            size={32}
            color="#10b981"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
          />
        );

        new maplibregl.Marker({ element: startMarkerDiv, anchor: "bottom" })
          .setLngLat(startCoord)
          .addTo(map.current);
      }

      // Marcador de destino (rojo) - solo si existe
      if (destCoord) {
        const destMarkerDiv = document.createElement("div");
        const destRoot = createRoot(destMarkerDiv);
        destRoot.render(
          <HiLocationMarker
            size={32}
            color="#ef4444"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
          />
        );

        new maplibregl.Marker({ element: destMarkerDiv, anchor: "bottom" })
          .setLngLat(destCoord)
          .addTo(map.current);
      }

      // Ajustar vista solo si ambos puntos existen
      if (startCoord && destCoord) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend(startCoord);
        bounds.extend(destCoord);
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      } else if (startCoord) {
        // Centrar en el punto de inicio
        map.current.setCenter(startCoord);
        map.current.setZoom(12);
      } else if (destCoord) {
        // Centrar en el punto de destino
        map.current.setCenter(destCoord);
        map.current.setZoom(12);
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [startCoord, destCoord /*travelData?.destination, travelData?.start*/]);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Contenedor del mapa */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
