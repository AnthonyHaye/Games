import React, { useContext } from "react";
import {  Link } from "react-router-dom";
import { BookmarksContext } from "../BookmarksContext";

const Bookmarks = () => {
  const { bookmarks, setBookmarks} = useContext(BookmarksContext);

  const deleteBookmarks = (index) => {
        const tmpBookmarks = [...bookmarks]; // On crée une copie de bookmarks
        tmpBookmarks.splice(index, 1);        // On supprime 1 entrée à partir de l'index
        setBookmarks(tmpBookmarks);           // On met à jour le state avec le nouveau tableau
      };
      

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Mes favoris</h2>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Retour à l'accueil
        </Link>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">Aucun favori pour l’instant.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((bookmark, index) => (


                <li
                        key={index}
                        className="relative bg-white shadow-md rounded-lg overflow-hidden flex hover:shadow-lg transition"
                        >
                        <img
                        src={bookmark.background_image}
                        alt={bookmark.name}
                        className="w-36 h-24 object-cover"
                        />
                        <div className="p-4 pr-12 flex flex-col justify-center">
                        <span className="text-xl font-semibold break-words">{bookmark.name}</span>
                        <button
                        onClick={() => deleteBookmarks(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        title="Supprimer des favoris"
                        >
                        ✕
                        </button>
                        </div>
                </li>




          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
