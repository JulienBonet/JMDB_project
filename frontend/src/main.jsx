// frontend/src/main.jsx
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// auth
import { AuthProvider } from './Context/AuthContext.jsx';
import RequireAuth from './Context/RequireAuth.jsx';
import RequireAdmin from './Context/RequireAdmin.jsx';

// App - Pages - components
import App from './App.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import MovieSearch from './pages/MovieSearch/MovieSearch.jsx';
import MovieDirectors from './pages/MovieArtist/MovieDirectors.jsx';
import MovieCasting from './pages/MovieArtist/MovieCasting.jsx';
import MovieScreenwriters from './pages/MovieArtist/MovieScreenwriters.jsx';
import MovieMusic from './pages/MovieArtist/MovieMusic.jsx';
import MovieStudio from './pages/MovieArtist/Moviestudio.jsx';
import MovieTag from './pages/MovieArtist/MovieTags.jsx';
import MovieThema from './pages/MovieFocus/MovieThema.jsx';
import MovieFestival from './pages/MovieFocus/MovieFestival.jsx';
import MovieCollection from './pages/MovieFocus/MovieCollection.jsx';
import MovieFocusDirectors from './pages/MovieFocus/MovieFocusDirectors.jsx';
import MovieFocusCasting from './pages/MovieFocus/MovieFocusCasting.jsx';
import MovieFavorite from './pages/MovieFocus/MovieFavorite.jsx';
import AdminFeat from './pages/AdminFeat/AdminFeat.jsx';
import AddNewMovie from './components/AdminFeatures/AddNewMovie/AddNewMovie.jsx';
import MovieInfosEntrance from './components/AdminFeatures/AddNewMovie/MovieInfosEntranceModal/MovieInfosEntrance.jsx';

// services
import { getArtists, getRandomArtistFocus } from './services/artistService';
import { getTags } from './services/tagService';
import { getFocusByCategory } from './services/focusService';
import { getMoviesSortedNox } from './services/movieService';

// -------------------------------------------------------
// PROTECTION DES LOADERS
// -------------------------------------------------------
const requireAuthLoader = (loader) => async (args) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw redirect('/login');
  }

  try {
    const base64Url = token.split('.')[1];

    if (!base64Url) {
      throw new Error('Invalid token');
    }

    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(base64Url.length / 4) * 4, '=');

    const payload = JSON.parse(atob(base64));

    if (!payload.exp || payload.exp * 1000 <= Date.now()) {
      throw new Error('Expired token');
    }
  } catch {
    throw redirect('/login');
  }

  return loader(args);
};

const router = createBrowserRouter([
  // ----------------
  // Route publique
  // ----------------
  { path: '/login', element: <Login /> },

  // -----------------------------------
  // Routes nécessitant d'être connecté
  // -----------------------------------
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true, // "/" par défaut -> Home
            element: <Home />,
            loader: requireAuthLoader(() => getMoviesSortedNox()),
          },
          { path: 'movie_search', element: <MovieSearch /> },
          {
            path: 'movie_directors',
            element: <MovieDirectors />,
            loader: requireAuthLoader(() => getArtists('directors')),
          },
          {
            path: 'movie_casting',
            element: <MovieCasting />,
            loader: requireAuthLoader(() => getArtists('casting')),
          },
          {
            path: 'movie_screenwriters',
            element: <MovieScreenwriters />,
            loader: requireAuthLoader(() => getArtists('screenwriters')),
          },
          {
            path: 'movie_music',
            element: <MovieMusic />,
            loader: requireAuthLoader(() => getArtists('music')),
          },
          {
            path: 'movie_studio',
            element: <MovieStudio />,
            loader: requireAuthLoader(() => getArtists('studio')),
          },
          {
            path: 'movie_tag',
            element: <MovieTag />,
            loader: requireAuthLoader(() => getTags()),
          },
          {
            path: 'movie_thema',
            element: <MovieThema />,
            loader: requireAuthLoader(() => getFocusByCategory(1)),
          },
          {
            path: 'movie_thema_festival',
            element: <MovieFestival />,
            loader: requireAuthLoader(() => getFocusByCategory(2)),
          },
          {
            path: 'movie_thema_collection',
            element: <MovieCollection />,
            loader: requireAuthLoader(() => getFocusByCategory(3)),
          },
          {
            path: 'movie_thema_directors',
            element: <MovieFocusDirectors />,
            loader: requireAuthLoader(() => getRandomArtistFocus('directors')),
          },
          {
            path: 'movie_thema_casting',
            element: <MovieFocusCasting />,
            loader: requireAuthLoader(() => getRandomArtistFocus('casting')),
          },
          {
            path: 'movie_favorites',
            element: <MovieFavorite />,
          },

          // -----------------------
          // Routes admin uniquement
          // -----------------------
          {
            element: <RequireAdmin />,
            children: [
              { path: 'admin_feat', element: <AdminFeat /> },
              { path: 'new_movie', element: <AddNewMovie /> },
              { path: 'movie_entrance', element: <MovieInfosEntrance /> },
            ],
          },
        ],
      },
    ],
  },
]);

//-----------------------------------------------
// createRoot pour rendre l'application complète
//-----------------------------------------------
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
