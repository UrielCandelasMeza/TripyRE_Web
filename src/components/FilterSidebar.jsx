import { FiSliders, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";

// ─── Time-of-day slots ────────────────────────────────────────────────────────
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


export default function FilterSidebar({ filters, onChange, onReset, hasActiveFilters }) {
  // const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: 3 }, (_, i) => currentYear + i);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const toggleSlot = (id) => {
    const next = filters.timeSlots.includes(id)
      ? filters.timeSlots.filter((s) => s !== id)
      : [...filters.timeSlots, id];
    onChange({ ...filters, timeSlots: next });
  };

  return (
    <aside className="h-fit w-90 shrink-0">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="text-oscuro flex items-center gap-2 text-sm font-bold">
            <FiSliders size={15} className="text-morado" />
            Filtros
          </div>
          {hasActiveFilters && (
            <button onClick={onReset} className="text-morado text-xs font-medium hover:underline">
              Limpiar todo
            </button>
          )}
        </div>

        <div className="flex flex-col gap-6 px-5 py-4">
          {/* ── Date ──────────────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center gap-1.5">
              <FiCalendar size={13} className="text-morado" />
              <span className="text-oscuro text-xs font-bold tracking-wide uppercase">Fecha</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Day */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Día</label>
                <input
                  id="filter-day"
                  type="number"
                  min={1}
                  max={31}
                  placeholder="1 – 31"
                  value={filters.day}
                  onChange={(e) => onChange({ ...filters, day: e.target.value })}
                  className="focus:border-morado w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition-colors focus:outline-none"
                />
              </div>
              {/* Month */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Mes</label>
                <select
                  id="filter-month"
                  value={filters.month}
                  onChange={(e) => onChange({ ...filters, month: e.target.value })}
                  className="focus:border-morado w-full appearance-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none"
                >
                  <option value="">Cualquier mes</option>
                  {months.map((m, i) => (
                    <option key={i} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* ── Time of day ───────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center gap-1.5">
              <FiClock size={13} className="text-morado" />
              <span className="text-oscuro text-xs font-bold tracking-wide uppercase">Horario</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const active = filters.timeSlots.includes(slot.id);
                return (
                  <button
                    key={slot.id}
                    id={`slot-${slot.id}`}
                    onClick={() => toggleSlot(slot.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? "border-morado bg-morado/10 text-morado"
                        : "hover:border-moradoClaro border-gray-200 bg-white text-gray-500 hover:bg-purple-50"
                    }`}
                  >
                    <span className="text-base leading-none">{slot.icon}</span>
                    {slot.label}
                    <span className="text-[10px] opacity-60">
                      {slot.range[0]}:00 – {slot.range[1]}:59
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Price range ───────────────────────────────────────────────── */}
          <section>
            <div className="mb-3 flex items-center gap-1.5">
              <FiDollarSign size={13} className="text-morado" />
              <span className="text-oscuro text-xs font-bold tracking-wide uppercase">Precio</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>$0</span>
                <span className="text-morado text-sm font-bold">${filters.maxPrice}</span>
                <span>$500+</span>
              </div>
              <input
                id="filter-price"
                type="range"
                min={0}
                max={500}
                step={10}
                value={filters.maxPrice}
                onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, #725AC1 0%, #725AC1 ${(filters.maxPrice / 500) * 100}%, #e5e7eb ${(filters.maxPrice / 500) * 100}%, #e5e7eb 100%)`,
                }}
              />
              {/* Min/Max inputs */}
              <div className="flex gap-2">
                <div className="flex flex-1 flex-col gap-1">
                  <label className="text-xs text-gray-500">Mín $</label>
                  <input
                    id="filter-min-price"
                    type="number"
                    min={0}
                    max={filters.maxPrice}
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })}
                    className="focus:border-morado w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition-colors focus:outline-none"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <label className="text-xs text-gray-500">Máx $</label>
                  <input
                    id="filter-max-price"
                    type="number"
                    min={filters.minPrice}
                    max={500}
                    placeholder="500"
                    value={filters.maxPrice}
                    onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                    className="focus:border-morado w-full rounded-xl border border-gray-200 px-3 py-2 text-sm transition-colors focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
