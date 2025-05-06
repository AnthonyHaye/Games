import React, { useContext, useState } from "react";
import { BookmarksContext } from "../BookmarksContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [games, setGames] = useState([]);

  const [searchText, setSearchText] = useState("");

  const { bookmarks, setBookmarks } = useContext(BookmarksContext);

  const toggleBookmark = (game) => {
    const isBookmarked = bookmarks.some((b) => b.slug === game.slug);
  
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.slug !== game.slug));
    } else {
      setBookmarks([...bookmarks, game]);
    }
  };
  

  const handleSearch = (e) => {
        e.preventDefault();
      
        const apiKey = '1774245be8cd445d8e004e13e6926b1f';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(searchText)}`;
      
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setGames(data.results);
          })
          .catch(() => {
            alert('Une erreur est survenue');
          });
      };
      

      return (
        <>
          <div className="text-right md:w-2/3 mx-auto px-2 my-4">
            <Link
              to="/shop"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Accéder à la boutique
            </Link>
          </div>
          
          <form
            className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Nom du jeu"
              className="rounded-l border border-gray-500 flex-grow px-4"
              autoFocus
              onInput={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <button
              type="submit"
              className="bg-blue-700 rounded-r text-white px-4 py-2"
            >
              Rechercher
            </button>
          </form>
    
          <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
            {games.map((game) => (


              <li
                className="py-2 px-4 border-b border-gray-500"
                key={game.id}
              >

              <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-24 pr-2"
              />

              <div className="text-2xl font-bold flex-grow">
                  <Link to={`/details/${game.slug}`} className="hover:underline">
                    {game.name}
                  </Link>
              </div>

              <button
                    onClick={() => toggleBookmark(game)}
                    className="text-3xl text-yellow-500 hover:scale-110 transition"
                    title="Ajouter ou retirer des favoris"
                  >
                    {bookmarks.some((b) => b.slug === game.slug) ? "★" : "☆"}
              </button>
                
                
                <Link to={'/bookmarks'}>Favoris </Link>
              </li>

              
            ))}
          </ul>


        </>
      );
    };
    
    export default Home;

