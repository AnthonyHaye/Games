import React, { useEffect, useState } from "react";
import haversine from "../utils/haversine"; 
import { Link } from "react-router-dom";

const MyShop = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [city, setCity] = useState(null);

  // 📍 Obtenir la position de l'utilisateur
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas supportée.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        console.log("Coordonnées GPS :", coords);
        setPosition(coords);

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`)
          .then((res) => res.json())
          .then((data) => {
            const cityName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Localité inconnue";
            setCity(cityName);
            console.log("Ville détectée :", cityName);
          });
      },
      (err) => {
        console.warn("Erreur géolocalisation :", err);
        setGeoError("Impossible d'obtenir votre position.");
      }
    );
  }, []);

  // 📦 Charger les magasins
  useEffect(() => {
    fetch("https://formacitron.github.io/shopslist/shops.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Magasins chargés :", data);
        setShops(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erreur lors du chargement des magasins.");
        setLoading(false);
      });
  }, []);

  // 📏 Calculer les distances et trier
  const sortedShops = React.useMemo(() => {
        if (!position || shops.length === 0) return [];
      
        return shops
          .filter(
            (shop) =>
              typeof shop.gps_lat === "number" && typeof shop.gps_lng === "number"
          )
          .map((shop) => {
            const distance =
              haversine(position, {
                lat: shop.gps_lat,
                lon: shop.gps_lng,
              }) / 1000;
            return { ...shop, distance };
          })
          .sort((a, b) => a.distance - b.distance);
      }, [position, shops]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Boutiques virtuelles 🛍️</h1>

      <div className="mb-6">
              <Link
                to="/Games"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                ← Retour à l'accueil
              </Link>
      </div>

      {geoError && <p className="text-center text-red-500 mb-4">{geoError}</p>}

      {position && (
        <p className="text-center text-green-600">
          📍 Position : {city} (lat: {position.lat.toFixed(3)}, lon:{" "}
          {position.lon.toFixed(3)})
        </p>
      )}

      <hr className="my-4" />

      {loading ? (
        <p className="text-center text-gray-500">Chargement des magasins...</p>
      ) : (
        <ul className="space-y-4">
          {sortedShops.map((shop, index) => (
            <li
              key={index}
              className="p-4 border rounded shadow hover:shadow-md transition text-center"
            >
              <h2 className="text-xl font-semibold">{shop.name}</h2>
              <p className="text-gray-600 mb-1">{shop.city}</p>

              {typeof shop.distance === "number" && !isNaN(shop.distance) ? (
                <p className="text-gray-800">
                  📏 {shop.distance.toFixed(2)} km
                </p>
              ) : (
                <p className="text-red-400">Coordonnées manquantes</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyShop;
