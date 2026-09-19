import { useEffect, useState } from 'react';
import {
  getFavorites,
  getFavoritesAlphaAsc,
  getFavoritesAlphaDesc,
  getFavoritesYearAsc,
  getFavoritesYearDesc,
} from '../services/favoriteService';

function useMovieFavoritesPage({ token, authReady, isAuthenticated, userId }) {
  const [movies, setMovies] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sortMoviesAsc, setSortMoviesAsc] = useState(true);
  const [sortMoviesYearAsc, setSortMoviesYearAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const data = await getFavorites();
      setMovies(data);
    } catch (err) {
      console.error('Fetch favorites failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authReady || !isAuthenticated || !token || !userId) return;
    fetchFavorites();
  }, [authReady, isAuthenticated, token, userId]);

  //------------------------------------------
  // SORTED MOVIES
  //------------------------------------------

  const handleSortedAlphabeticalMovies = async () => {
    try {
      const data = sortMoviesAsc ? await getFavoritesAlphaAsc() : await getFavoritesAlphaDesc();

      setMovies(data);
      setSortMoviesAsc(!sortMoviesAsc);
    } catch (err) {
      console.error('Fetch favorites sorting failed', err);
    }
  };

  const handleSortedChronologicalMovies = async () => {
    try {
      const data = sortMoviesYearAsc ? await getFavoritesYearAsc() : await getFavoritesYearDesc();

      setMovies(data);
      setSortMoviesYearAsc(!sortMoviesYearAsc);
    } catch (err) {
      console.error('Fetch favorites sorting failed', err);
    }
  };

  const handleResetMovies = async () => {
    try {
      const data = await getFavorites();

      setMovies(data);
      setSortMoviesAsc(true);
      setSortMoviesYearAsc(true);
    } catch (err) {
      console.error('Fetch favorites reset failed', err);
    }
  };
  //------------------------------------------
  // UPDATE / DELETE
  //------------------------------------------

  const handleUpdateMovie = (updatedMovie) => {
    setMovies((prev) => prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)));
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return {
    movies,
    openSideBar,
    setOpenSideBar,
    sortMoviesAsc,
    sortMoviesYearAsc,
    loading,
    fetchFavorites,
    handleSortedAlphabeticalMovies,
    handleSortedChronologicalMovies,
    handleResetMovies,
    handleUpdateMovie,
    handleDeleteMovie,
  };
}

export default useMovieFavoritesPage;
