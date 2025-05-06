import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = "1774245be8cd445d8e004e13e6926b1f";

  useEffect(() => {
    const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erreur lors du chargement du jeu.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Chargement...</div>;
  }

  if (!game) {
    return <div className="text-center mt-10 text-red-500">Jeu introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Bouton retour */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Retour à l'accueil
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full rounded mb-4"
        />
      )}

      <p className="mb-2 text-gray-700">
        <span className="font-bold">Date de sortie :</span> {game.released}
      </p>
      <p className="mb-2 text-gray-700">
        <span className="font-bold">Note :</span> {game.rating} / 5
      </p>
      <p className="mb-4 text-gray-700">
        <span className="font-bold">Plateformes :</span>{" "}
        {game.platforms.map((p) => p.platform.name).join(", ")}
      </p>

      <div className="prose max-w-none">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>
    </div>
  );
};

export default Details;
