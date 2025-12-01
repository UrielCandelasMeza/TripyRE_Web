// services/geocoding.js
import axios from "axios";

export async function geocodeAdress(query) {
  const url = "https://nominatim.openstreetmap.org/search";
  const params = {
    q: query,
    format: "json",
    addressdetails: 1,
    limit: 5,
    countrycodes: "mx",
  };
  console.log("enviado");
  const res = await axios.get(url, { params });
  console.log(res.status);
  return res.data;
}
