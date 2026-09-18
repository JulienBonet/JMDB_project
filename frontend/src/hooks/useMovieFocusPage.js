import { useState } from 'react';
import {
  getFocusByCategoryAsc,
  getFocusByCategoryDesc,
  getFocusMovies,
  getFocusMoviesSorted,
} from '../services/focusService';
import {
  getArtistFocusSorted,
  getArtistMovies,
  getArtistMoviesSorted,
} from '../services/artistService';

function useMovieFocusPage({ mode, category, type, initialData }) {
  const [Focus, setFocus] = useState(initialData || []);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [films, setFilms] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openMovieSideBar, setOpenMovieSideBar] = useState(false);
  const [sortFocusAsc, setSortFocusAsc] = useState(true);
  const [sortMoviesAsc, setSortMoviesAsc] = useState(true);
  const [sortMoviesYearAsc, setSortMoviesYearAsc] = useState(true);
  const [openFocusModal, setOpenFocusModal] = useState(false);

  const origin = mode === 'artist' ? 'ArtistFocus' : 'focus';

  //------------------------------------------
  // SORTED FOCUS
  //------------------------------------------

  const handleSortedAlphabeticalFocus = async () => {
    try {
      if (mode === 'artist') {
        const sort = sortFocusAsc ? 0 : 1;
        const data = await getArtistFocusSorted(type, sort);
        setFocus(data);
      } else {
        const data = sortFocusAsc
          ? await getFocusByCategoryAsc(category)
          : await getFocusByCategoryDesc(category);
        setFocus(data);
      }

      setSortFocusAsc(!sortFocusAsc);
    } catch (err) {
      console.error('Fetch focus sorting failed', err);
    }
  };

  const handleSortedChronologicalFocus = async () => {
    if (mode !== 'artist') return;

    try {
      const sort = sortFocusAsc ? 2 : 3;
      const data = await getArtistFocusSorted(type, sort);

      setFocus(data);
      setSortFocusAsc(!sortFocusAsc);
    } catch (err) {
      console.error('Fetch artist focus chronological sorting failed', err);
    }
  };

  const handleResetFocus = () => {
    setFocus(initialData || []);
  };

  //------------------------------------------
  // SELECTION D'UN FOCUS - FETCH DES FILMS
  //------------------------------------------

  const handleClickFocus = async (focus) => {
    setSelectedFocus(focus);

    try {
      const data =
        mode === 'artist' ? await getArtistMovies(type, focus.id) : await getFocusMovies(focus.id);

      setFilms(data);
    } catch (err) {
      console.error('Fetch focus movies failed', err);
    }
  };

  //------------------------------------------
  // SORTED MOVIES
  //------------------------------------------

  const handleSortedAlphabeticalMovies = async () => {
    if (!selectedFocus) return;

    try {
      const sort = sortMoviesAsc ? 0 : 1;

      const data =
        mode === 'artist'
          ? await getArtistMoviesSorted(type, selectedFocus.id, sort)
          : await getFocusMoviesSorted(selectedFocus.id, sort);

      setFilms(data);
      setSortMoviesAsc(!sortMoviesAsc);
    } catch (err) {
      console.error('Fetch focus movies sorting failed', err);
    }
  };

  const handleSortedChronologicalMovies = async () => {
    if (!selectedFocus) return;

    try {
      const sort = sortMoviesYearAsc ? 2 : 3;

      const data =
        mode === 'artist'
          ? await getArtistMoviesSorted(type, selectedFocus.id, sort)
          : await getFocusMoviesSorted(selectedFocus.id, sort);

      setFilms(data);
      setSortMoviesYearAsc(!sortMoviesYearAsc);
    } catch (err) {
      console.error('Fetch focus movies sorting failed', err);
    }
  };

  const handleResetMovies = async () => {
    if (!selectedFocus) return;

    try {
      const data =
        mode === 'artist'
          ? await getArtistMovies(type, selectedFocus.id)
          : await getFocusMovies(selectedFocus.id);

      setFilms(data);
      setSortMoviesAsc(true);
      setSortMoviesYearAsc(true);
    } catch (err) {
      console.error('Fetch focus movies reset failed', err);
    }
  };

  //------------------------------------------
  // MAJ DU CONTENU
  //------------------------------------------

  const handleUpdateMovie = (updatedMovie) => {
    setFilms((prev) => prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)));
  };

  const handleDeleteMovie = (movieId) => {
    setFilms((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  //------------------------------------------
  // OPEN / CLOSED MODAL
  //------------------------------------------

  const openModal = () => {
    setOpenFocusModal(true);
  };

  const closeModal = () => {
    setOpenFocusModal(false);
  };

  return {
    Focus,
    selectedFocus,
    films,
    openSideBar,
    openMovieSideBar,
    sortFocusAsc,
    sortMoviesAsc,
    sortMoviesYearAsc,
    openFocusModal,
    origin,

    setSelectedFocus,
    setOpenSideBar,
    setOpenMovieSideBar,

    handleSortedAlphabeticalFocus,
    handleSortedChronologicalFocus,
    handleResetFocus,
    handleClickFocus,
    handleSortedAlphabeticalMovies,
    handleSortedChronologicalMovies,
    handleResetMovies,
    handleUpdateMovie,
    handleDeleteMovie,
    openModal,
    closeModal,
  };
}

export default useMovieFocusPage;
