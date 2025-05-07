import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import Home from './pages/Home';
import Details from './pages/Details';
import ErrorMessage from './pages/ErrorMessage';
import { BookmarksContext } from './BookmarksContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';

function App() {
  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const [bookmarks, setBookmarks] = useState(storedBookmarks);

  // Gestion du stockage local
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  useEffect(() => {
    if (bookmarks.length > 0) {
      console.log("Sauvegarde:", bookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  // Ajout bouton d'installation PWA
  const [canInstall, setCanInstall] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt.current) return;

    const result = await deferredPrompt.current.prompt();
    console.log(`Installation ${result.outcome}`);

    deferredPrompt.current = null;
    setCanInstall(false);
  };

  // Définition du router
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorMessage />,
      },
      {
        path: '/details/:slug',
        element: <Details />,
      },
      {
        path: '/bookmarks',
        element: <Bookmarks />,
      },
      {
        path: '/shop',
        element: <MyShop />,
      },
      {
        path: '*',
        element: <ErrorMessage />,
      }
    ],
    {
      basename: '/',
    }
  );

  return (
    <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
      {/* Bouton d'installation PWA personnalisé */}
      {canInstall && (
  <div className="install-banner">
    <span className="install-text">
      Voulez-vous installer l'application sur votre appareil ?
    </span>
    <button className="install-button" onClick={handleInstallClick}>
      Installer
    </button>
  </div>
)}


      <RouterProvider router={router} />
    </BookmarksContext.Provider>
  );
}

export default App;
