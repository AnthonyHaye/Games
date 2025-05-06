import './App.css';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Details from './pages/Details';
import ErrorMessage from './pages/ErrorMessage';
import {BookmarksContext} from './BookmarksContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';



function App() {

  const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  const [bookmarks, setBookmarks] = useState(storedBookmarks);

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
      }

    ],
    {
      basename: '/',
    }
  );

  return (
    <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
      <RouterProvider router={router} />
    </BookmarksContext.Provider>
  );
}

export default App;
