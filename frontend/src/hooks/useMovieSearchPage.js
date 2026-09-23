import { useState, useEffect } from 'react';
import { searchMovies } from '../services/movieService';

function useMovieSearchPage() {
  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState('');
  const [selectedKind, setSelectedKind] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTvShow, setSelectedTvShow] = useState('all');
  const [orderby, setOrderby] = useState('id');
  const [direction, setDirection] = useState('DESC');
  const [isLoading, setIsLoading] = useState(true);

  // ------------------------------------------------------------------
  // Fetch principal
  // -----------------------------------------------------------------

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const moviesData = await searchMovies({
        search,
        kind: selectedKind,
        country: selectedCountry,
        year: selectedYear,
        tvshow: selectedTvShow,
        orderby,
        direction,
      });

      setMovies(moviesData);
    } catch (err) {
      console.error('Erreur fetchMovies:', err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, selectedKind, selectedCountry, selectedYear, selectedTvShow, orderby, direction]);

  // ------------------------
  // Handlers UI
  // ------------------------

  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, '').toLowerCase();
    setSearch(value);
  };

  const handleKindChange = (k) => setSelectedKind(k);
  const handleYearChange = (y) => setSelectedYear(y);
  const handleCountryChange = (c) => setSelectedCountry(c);

  // TRI via SideActionBar -> change orderby/direction which déclenche fetch
  const handleAlphabeticBtnClick = () => {
    setOrderby('title');
    setDirection((d) => (d === 'ASC' ? 'DESC' : 'ASC'));
  };

  const handleChronologicBtnClick = () => {
    setOrderby('year');
    setDirection((d) => (d === 'ASC' ? 'DESC' : 'ASC'));
  };

  const handleResetSearch = () => {
    setSearch('');
    setSelectedKind('');
    setSelectedCountry('');
    setSelectedYear('');
    setSelectedTvShow('all');
    setOrderby('id');
    setDirection('DESC');
  };

  const clearSearch = () => {
    setSearch('');
  };

  // --------------------------------------------------------
  // UPDATE / DELETE MOVIE (modification locale de la liste)
  // --------------------------------------------------------

  const handleUpdateMovie = (updatedMovieData) => {
    setMovies((prev) => prev.map((m) => (m.id === updatedMovieData.id ? updatedMovieData : m)));
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  return {
    movies,
    search,
    selectedKind,
    selectedCountry,
    selectedYear,
    selectedTvShow,
    isLoading,

    setSelectedTvShow,

    handleTyping,
    handleKindChange,
    handleYearChange,
    handleCountryChange,

    handleAlphabeticBtnClick,
    handleChronologicBtnClick,
    handleResetSearch,
    clearSearch,

    handleUpdateMovie,
    handleDeleteMovie,
  };
}

export default useMovieSearchPage;
