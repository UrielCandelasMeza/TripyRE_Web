import { useEffect, useState } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { FiMapPin, FiSearch, FiX } from "react-icons/fi";

import TravelCard from "../../components/TravelCard";
import FilterSidebar from "../../components/FilterSidebar";
import PlaceInput from "../../components/PlaceInput";
import axios from "../../api/axios";

const TIME_SLOTS = [
  { id: "madrugada", label: "Madrugada", icon: "🌙", range: [0, 5] },
  { id: "manana", label: "Mañana", icon: "🌅", range: [6, 11] },
  { id: "tarde", label: "Tarde", icon: "☀️", range: [12, 17] },
  { id: "noche", label: "Noche", icon: "🌆", range: [18, 23] },
];

const DEFAULT_FILTERS = {
  day: "",
  month: "",
  year: "",
  timeSlots: [],
  minPrice: 0,
  maxPrice: 500,
};
// ─── Main Home component ──────────────────────────────────────────────────────
function Home() {
  const [travels, setTravels] = useState(null);

  // Search state
  const [originText, setOriginText] = useState("");
  const [destText, setDestText] = useState("");
  const [originCoords, setOriginCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  // Filter state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);


  // Fetch all active travels on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/travels/get");
        const raw = res.data.travels ?? [];
        setTravels(raw);
      } catch {
        // ── Mock data (used while backend is not connected) ──────────────────
        setTravels([
          {
            user: { id: 1, name: "Pedro", lastName: "Pérez", userName: "pedritop" },
            travel: {
              id: 1,
              start: "Parque México, Colonia Condesa, CDMX",
              destination: "Estadio GNP Seguros, Ciudad de México",
              startCoords: { lat: 19.4128, lon: -99.1683 },
              destCoords: { lat: 19.4284, lon: -99.1332 },
              maxUsers: 3,
              cost: 50,
              status: "PRE_TRAVEL",
              users: [1],
              createdAt: "2026-05-09T08:00:00Z",
            },
          },
          {
            user: { id: 2, name: "María", lastName: "López", userName: "mlopez" },
            travel: {
              id: 2,
              start: "Guadalajara Centro, Jalisco",
              destination: "Tlaquepaque, Jalisco",
              startCoords: { lat: 20.6597, lon: -103.3496 },
              destCoords: { lat: 20.6425, lon: -103.3117 },
              maxUsers: 4,
              cost: 35,
              status: "PRE_TRAVEL",
              users: [2],
              createdAt: "2026-05-09T15:30:00Z",
            },
          },
          {
            user: { id: 3, name: "Carlos", lastName: "Ruiz", userName: "carlitos" },
            travel: {
              id: 3,
              start: "Monterrey Centro, Nuevo León",
              destination: "San Pedro Garza García, Nuevo León",
              startCoords: { lat: 25.6714, lon: -100.309 },
              destCoords: { lat: 25.6589, lon: -100.4023 },
              maxUsers: 2,
              cost: 40,
              status: "PRE_TRAVEL",
              users: [3],
              createdAt: "2026-05-09T22:00:00Z",
            },
          },
          {
            user: { id: 3, name: "Carlos", lastName: "Ruiz", userName: "carlitos" },
            travel: {
              id: 4,
              start: "Monterrey Centro, Nuevo León",
              destination: "San Pedro Garza García, Nuevo León",
              startCoords: { lat: 25.6714, lon: -100.309 },
              destCoords: { lat: 25.6589, lon: -100.4023 },
              maxUsers: 2,
              cost: 40,
              status: "PRE_TRAVEL",
              users: [3],
              createdAt: "2026-05-09T22:00:00Z",
            },
          },
          {
            user: { id: 3, name: "Carlos", lastName: "Ruiz", userName: "carlitos" },
            travel: {
              id: 5,
              start: "Monterrey Centro, Nuevo León",
              destination: "San Pedro Garza García, Nuevo León",
              startCoords: { lat: 25.6714, lon: -100.309 },
              destCoords: { lat: 25.6589, lon: -100.4023 },
              maxUsers: 2,
              cost: 40,
              status: "PRE_TRAVEL",
              users: [3],
              createdAt: "2026-05-09T22:00:00Z",
            },
          },
        ]);
      }
    })();
  }, []);

  // Swap origin ↔ destination
  const handleSwap = () => {
    setOriginText(destText);
    setDestText(originText);
    setOriginCoords(destCoords);
    setDestCoords(originCoords);
  };

  // ── Compute the displayed list reactively ─────────────────────────────────
  const norm = (s) =>
    s
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") ?? "";

  const list = (travels ?? []).filter((t) => {
    const tStart = norm(t.travel?.start ?? t.start ?? "");
    const tDest = norm(t.travel?.destination ?? t.destination ?? "");
    const cost = t.travel?.cost ?? t.cost ?? 0;
    const rawDate = t.travel?.createdAt ?? t.createdAt ?? null;
    const date = rawDate ? new Date(rawDate) : null;

    // Location search
    const oq = norm(originText.trim());
    const dq = norm(destText.trim());
    const originMatch = !oq || tStart.includes(oq);
    const destMatch = !dq || tDest.includes(dq);
    if (!originMatch || !destMatch) return false;

    // Date filters
    if (filters.day && date && date.getDate() !== Number(filters.day)) return false;
    if (filters.month && date && date.getMonth() + 1 !== Number(filters.month)) return false;
    if (filters.year && date && date.getFullYear() !== Number(filters.year)) return false;

    // Time-of-day filter
    if (filters.timeSlots.length > 0 && date) {
      const hour = date.getHours();
      const inSlot = filters.timeSlots.some((id) => {
        const slot = TIME_SLOTS.find((s) => s.id === id);
        return slot && hour >= slot.range[0] && hour <= slot.range[1];
      });
      if (!inSlot) return false;
    }

    // Price range
    return !(cost < filters.minPrice || cost > filters.maxPrice);
  });

  const hasActiveFilters =
    filters.day ||
    filters.month ||
    filters.year ||
    filters.timeSlots.length > 0 ||
    filters.minPrice > 0 ||
    filters.maxPrice < 500;

  const hasActiveSearch = originText.trim() || destText.trim();

  // Normalise a travel entry to a common shape for TravelCard
  const normalize = (t) => ({
    id: t.travel?.id ?? t.id,
    origin: t.travel?.start ?? t.start ?? "—",
    destination: t.travel?.destination ?? t.destination ?? "—",
    originCity: (t.travel?.start ?? t.start ?? "").split(",")[1]?.trim() ?? "",
    destinationCity: (t.travel?.destination ?? t.destination ?? "").split(",")[1]?.trim() ?? "",
    departureDate: t.travel?.createdAt
      ? new Date(t.travel.createdAt).toLocaleDateString("es-MX")
      : "",
    departureTime: t.travel?.createdAt
      ? new Date(t.travel.createdAt).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    arrivalTime: "",
    duration: "",
    driver: t.user ? `${t.user.name} ${t.user.lastName}` : "Conductor",
    passengers: t.travel?.maxUsers ?? t.passengers ?? 1,
    price: t.travel?.cost ?? t.cost ?? 0,
  });

  // ── Loading ────────────────────────────────────────────────────────────────
  if (travels === null) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="border-morado h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
          <span className="text-sm text-gray-400">Cargando viajes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50 pt-16">
      {/* ── Uber-style sticky search panel ───────────────────────────────────── */}
      <div className="sticky top-2 z-40 bg-gray-50/85 px-4 pt-4 pb-2 backdrop-blur-md">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-visible rounded-2xl border border-gray-100 bg-white shadow-lg">
            {/* Origin row */}
            <div className="flex items-center border-b border-gray-100">
              <PlaceInput
                id="origin-input"
                icon={<span className="bg-morado inline-block h-2.5 w-2.5 rounded-full" />}
                placeholder="¿Desde dónde sales?"
                value={originText}
                onChange={setOriginText}
                onSelect={(coords, name) => {
                  setOriginCoords(coords);
                  setOriginText(name);
                }}
                onClear={() => setOriginCoords(null)}
              />
            </div>

            {/* Destination row + swap + search */}
            <div className="flex items-center">
              <PlaceInput
                id="destination-input"
                icon={<FiMapPin size={14} className="text-morado" />}
                placeholder="¿A dónde vas?"
                value={destText}
                onChange={setDestText}
                onSelect={(coords, name) => {
                  setDestCoords(coords);
                  setDestText(name);
                }}
                onClear={() => setDestCoords(null)}
              />

              <button
                id="swap-btn"
                onClick={handleSwap}
                title="Intercambiar"
                className="hover:text-morado mx-1 shrink-0 rounded-xl p-2 text-gray-400 transition-all hover:bg-purple-50"
              >
                <HiOutlineSwitchVertical size={18} />
              </button>

              <button
                id="search-btn"
                className="bg-morado hover:bg-moradoIntermedio shadow-morado/20 m-2 flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-95"
              >
                <FiSearch size={15} />
                <span>Buscar</span>
              </button>
            </div>
          </div>

          {/* Active pills */}
          {(hasActiveSearch || hasActiveFilters) && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">
                {list.length} resultado{list.length !== 1 ? "s" : ""}
              </span>
              {(hasActiveSearch || hasActiveFilters) && (
                <button
                  onClick={() => {
                    setOriginText("");
                    setDestText("");
                    setOriginCoords(null);
                    setDestCoords(null);
                    setFilters(DEFAULT_FILTERS);
                  }}
                  className="text-morado bg-moradoClaro/20 hover:bg-moradoClaro/40 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  <FiX size={10} /> Limpiar todo
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────────────── */}
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-stretch gap-6 px-4 py-4">
        {/* Cards column */}
        <div className="h-full min-w-0 flex-1 overflow-y-auto px-2 py-1">
          {list.length === 0 ? (
            <div className="mx-auto flex max-w-sm flex-col items-center gap-6 pt-16 text-center">
              <div className="bg-moradoClaro/30 flex h-24 w-24 items-center justify-center rounded-full">
                <FiMapPin className="text-morado h-10 w-10" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-oscuro text-2xl font-bold">
                  {hasActiveSearch || hasActiveFilters
                    ? "Sin coincidencias"
                    : "No hay viajes disponibles"}
                </h2>
                <p className="text-sm leading-relaxed text-gray-400">
                  {hasActiveSearch || hasActiveFilters
                    ? "Intenta con otros términos o ajusta los filtros."
                    : "Aún no hay viajes publicados. Vuelve más tarde o sé el primero en publicar uno."}
                </p>
              </div>
              {!hasActiveSearch && !hasActiveFilters && (
                <button className="bg-morado hover:bg-moradoIntermedio rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors">
                  Publicar un viaje
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-auto px-2 pb-5">
              {list.map((t) => {
                const trip = normalize(t);
                return (
                  <TravelCard
                    key={trip.id}
                    origin={trip.origin}
                    destination={trip.destination}
                    originCity={trip.originCity}
                    destinationCity={trip.destinationCity}
                    departureDate={trip.departureDate}
                    departureTime={trip.departureTime}
                    arrivalTime={trip.arrivalTime}
                    duration={trip.duration}
                    driver={trip.driver}
                    passengers={trip.passengers}
                    price={trip.price}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Filter sidebar */}
        <div className="h-full shrink-0 overflow-y-auto px-2 py-1">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
