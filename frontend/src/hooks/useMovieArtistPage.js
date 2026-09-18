import { useEffect, useState } from 'react';
import {
  getArtistsByLetter,
  getArtistMovies,
  getArtistMoviesSorted,
} from '../services/artistService';
import { getTagsByLetter, getTagMovies, getTagMoviesSorted } from '../services/tagService';

function useMovieArtistPage({ type, initialData, mode = 'artist' }) {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrderA, setSortOrderA] = useState('asc');
  const [sortOrderY, setSortOrderY] = useState('desc');
  const [movieAmount, setMovieAmount] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('a');
  const [selectedArtistByLetter, setSelectedArtistByLetter] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    const fetchItemsByLetter = async () => {
      try {
        const itemsDataLetter =
          mode === 'tag'
            ? await getTagsByLetter(selectedLetter)
            : await getArtistsByLetter(type, selectedLetter);

        setSelectedArtistByLetter(itemsDataLetter);
      } catch (error) {
        console.error('Error fetching items by letter:', error);
      }
    };

    fetchItemsByLetter();
  }, [mode, type, selectedLetter]);

  const fetchMoviesByArtist = async () => {
    try {
      const moviesData =
        mode === 'tag'
          ? await getTagMovies(selectedArtist.id)
          : await getArtistMovies(type, selectedArtist.id);

      setMovies(moviesData);
      setMovieAmount(moviesData.length);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (!selectedArtist) return;

    fetchMoviesByArtist();
  }, [selectedArtist]);

  const handleLetterChange = (letter) => {
    setSelectedLetter(letter);
    setSearch('');
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
  };

  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, '').toLowerCase();

    setSearch(value);
    setSelectedLetter('');
  };

  const filteredArtists = initialData
    ? initialData.filter(
        (dataItem) =>
          dataItem.name &&
          dataItem.name.toString().toLowerCase().replace(/-/g, '').includes(search.toLowerCase())
      )
    : [];

  const artistsAmount = selectedArtistByLetter.length;
  const selectedArtistAmount = filteredArtists.length;

  useEffect(() => {
    setData(movies);
  }, [movies]);

  const movieSortedA = async () => {
    try {
      const newData =
        mode === 'tag'
          ? await getTagMoviesSorted(selectedArtist.id, 0)
          : await getArtistMoviesSorted(type, selectedArtist.id, 0);

      setData(newData);
      setSortOrderA('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const movieSortedZ = async () => {
    try {
      const newData =
        mode === 'tag'
          ? await getTagMoviesSorted(selectedArtist.id, 1)
          : await getArtistMoviesSorted(type, selectedArtist.id, 1);

      setData(newData);
      setSortOrderA('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const movieSortedYear = async () => {
    try {
      const newData =
        mode === 'tag'
          ? await getTagMoviesSorted(selectedArtist.id, 2)
          : await getArtistMoviesSorted(type, selectedArtist.id, 2);

      setData(newData);
      setSortOrderY('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const movieSortedYearDesc = async () => {
    try {
      const newData =
        mode === 'tag'
          ? await getTagMoviesSorted(selectedArtist.id, 3)
          : await getArtistMoviesSorted(type, selectedArtist.id, 3);

      setData(newData);
      setSortOrderY('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteMovie = () => {
    fetchMoviesByArtist();
  };

  const handleResetSearch = () => {
    setSearch('');
    setSelectedLetter('a');
    setSelectedArtist('');
    setMovies([]);
    setData([]);
    setMovieAmount(0);
  };

  return {
    movies,
    data,
    selectedArtist,
    search,
    sortOrderA,
    sortOrderY,
    movieAmount,
    selectedLetter,
    selectedArtistByLetter,
    openSideBar,

    filteredArtists,
    artistsAmount,
    selectedArtistAmount,

    setOpenSideBar,

    handleLetterChange,
    handleArtistClick,
    handleTyping,

    movieSortedA,
    movieSortedZ,
    movieSortedYear,
    movieSortedYearDesc,

    fetchMoviesByArtist,
    handleDeleteMovie,
    handleResetSearch,
  };
}

export default useMovieArtistPage;
