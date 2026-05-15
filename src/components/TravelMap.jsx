import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";
import { HiLocationMarker } from "react-icons/hi";
import { createRoot } from "react-dom/client";

import "maplibre-gl/dist/maplibre-gl.css";

const DEFAULT_CENTER = [-99.1332, 19.4326]; // Ciudad de México
const MAP_STYLE =
  "https://api.maptiler.com/maps/streets/style.json?key=9sBTuNSMFV23mLxOZJXu";

const normalizeCoords = (coords) => {
  if (!coords) return null;
  if (typeof coords === "object" && "lat" in coords && "lon" in coords) {
    return [coords.lon, coords.lat];
  }
  if (typeof coords === "object" && "latitude" in coords) {
    return [coords.longitude, coords.latitude];
  }
  if (Array.isArray(coords) && coords.length === 2) {
    return coords;
  }
  return null;
};

const renderMarker = (color, lngLat, map) => {
  const el = document.createElement("div");
  createRoot(el).render(
    <HiLocationMarker
      size={32}
      color={color}
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
    />,
  );
  return new maplibregl.Marker({ element: el, anchor: "bottom" })
    .setLngLat(lngLat)
    .addTo(map);
};

export default function TravelMap({
  start,
  destination,
  className = "",
  style = {},
  handleLoading,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const startCoord = useMemo(() => normalizeCoords(start), [start]);
  const destCoord = useMemo(() => normalizeCoords(destination), [destination]);

  useEffect(() => {
    if (!mapContainer.current) return;

    handleLoading(true);

    const center =
      startCoord && destCoord
        ? [(startCoord[0] + destCoord[0]) / 2, (startCoord[1] + destCoord[1]) / 2]
        : startCoord || destCoord || DEFAULT_CENTER;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center,
      zoom: startCoord && destCoord ? 10 : 5,
    });

    let cancelled = false;

    map.current.on("load", async () => {
      if (cancelled || !map.current) return;

      if (startCoord) renderMarker("#10b981", startCoord, map.current);
      if (destCoord) renderMarker("#ef4444", destCoord, map.current);

      if (startCoord && destCoord) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend(startCoord);
        bounds.extend(destCoord);
        map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });

        let routeCoords = [startCoord, destCoord]; // fallback: línea recta
        try {
          const url = `https://router.project-osrm.org/route/v1/driving/${startCoord[0]},${startCoord[1]};${destCoord[0]},${destCoord[1]}?overview=full&geometries=geojson`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.code === "Ok" && data.routes?.[0]) {
            routeCoords = data.routes[0].geometry.coordinates;
          }
        } catch (err) {
          console.warn("OSRM no disponible, usando línea recta:", err);
        }

        if (cancelled || !map.current) return;

        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: routeCoords },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#725AC1", "line-width": 4 },
        });
      } else if (startCoord || destCoord) {
        map.current.setCenter(startCoord || destCoord);
        map.current.setZoom(12);
      }

      if (!cancelled) handleLoading(false);
    });

    return () => {
      cancelled = true;
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [startCoord, destCoord, handleLoading]);

  return (
    <div className={`relative ${className}`} style={style}>
      <div ref={mapContainer} className="h-full w-full rounded-lg" />
    </div>
  );
}
