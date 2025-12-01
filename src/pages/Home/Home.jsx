import React from "react";
import { useEffect, useState } from "react";

import TravelCard from "../../components/TravelCard";

function Home() {
  const [travels, setTravels] = useState(null);
  useEffect(() => {
    setTravels([
      {
        id: 1,
        destination: "Cancún",
        origin: "Ciudad de México",
        username: "@maria_travels",
      },
      {
        id: 2,
        destination: "Oaxaca",
        origin: "Guadalajara",
        username: "@explorer_juan",
      },
      {
        id: 3,
        destination: "Monterrey",
        origin: "Puebla",
        username: "@viajera_ana",
      },
      {
        id: 4,
        destination: "Puerto Vallarta",
        origin: "Querétaro",
        username: "@travel_carlos",
      },
    ]);
  }, []);
  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {travels?.map((trip) => (
            <TravelCard
              key={trip.id}
              destination={trip.destination}
              origin={trip.origin}
              username={trip.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
