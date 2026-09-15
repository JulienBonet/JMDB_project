import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import './movieArtist.css';
import './movieArtistMediaQueries.css';
import ArtistList from '../../components/ArtistList/ArtistList';
import ArtistFilmo from '../../components/ArtistFilmo/ArtistFilmo';
import MovieArtistSearchBar from '../../components/MovieArtistSearchBar/MovieArtistSearchBar';
// refactor
import { getTagsByLetter, getTagMovies, getTagMoviesSorted } from '../../services/tagService';

function MovieTag() {
  // ---------------------
  // DATAS
  // ---------------------
  const tagsData = useLoaderData();
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState(movies);
  const [search, setSearch] = useState('');
  const [sortOrderA, setSortOrderA] = useState('asc');
  const [sortOrderY, setSortOrderY] = useState('desc');
  const [movieAmount, setMovieAmount] = useState(0);
  const [selectedLetter, SetSelectedLetter] = useState('a');
  const [selectedTag, setselectedTag] = useState('');
  const [selectedTagByLetter, setSelectedStudioByLetter] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);

  // --------------------------------------------
  // REQUEST ALL TAGS BY LETTER
  // --------------------------------------------
  useEffect(() => {
    const fetchTagsByLetter = async () => {
      try {
        const tagsDataLetter = await getTagsByLetter(selectedLetter);
        setSelectedStudioByLetter(tagsDataLetter);
      } catch (error) {
        console.error('Error fetching tag data:', error);
      }
    };

    fetchTagsByLetter();
  }, [selectedLetter]);

  // --------------------------------------------
  // REQUEST ALL MOVIES by TAG
  // --------------------------------------------
  const fetchMoviesByTag = async () => {
    try {
      const moviesData = await getTagMovies(selectedTag.id);
      setMovies(moviesData);
      setMovieAmount(moviesData.length);
    } catch (error) {
      console.error('Error fetching tag movies:', error);
    }
  };

  useEffect(() => {
    fetchMoviesByTag();
  }, [selectedTag]);

  // --------------------------------------------
  // SELECT LETTER
  // --------------------------------------------
  const handleLetterChange = (letter) => {
    SetSelectedLetter(letter);
    setSearch('');
  };

  // --------------------------------------------
  // SELECT TAG
  // --------------------------------------------
  const handleArtistClick = (tags) => {
    setselectedTag(tags);
  };

  // --------------------------------------------
  // SEARCH BAR
  // --------------------------------------------
  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, '').toLowerCase();
    setSearch(value);
    SetSelectedLetter('');
  };

  const filteredTag = tagsData
    ? tagsData.filter(
        (dataItem) =>
          dataItem.name &&
          dataItem.name.toString().toLowerCase().replace(/-/g, '').includes(search.toLowerCase())
      )
    : [];

  // --------------------------------------------
  // AFFICHER LE NOMBRE D'ARTISTES
  // --------------------------------------------
  const tagsAmount = selectedTagByLetter.length;
  const selectedTagAmount = filteredTag.length;

  // --------------------------------------------
  // SORTED BTN
  // --------------------------------------------
  useEffect(() => {
    setData(movies);
  }, [movies]);

  // --------------------------------------------
  // REQUEST ALL MOVIES SORTED ALPHABETICAL ASC
  // --------------------------------------------
  const movieSortedA = async () => {
    try {
      const newData = await getTagMoviesSorted(selectedTag.id, 0);
      setData(newData);
      setSortOrderA('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // --------------------------------------------
  // REQUEST ALL MOVIES SORTED ALPHABETICAL DESC
  // --------------------------------------------
  const movieSortedZ = async () => {
    try {
      const newData = await getTagMoviesSorted(selectedTag.id, 1);
      setData(newData);
      setSortOrderA('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // --------------------------------------------
  // REQUEST ALL MOVIES SORTED CHRONOLOGICAL ASC
  // --------------------------------------------
  const movieSortedYear = async () => {
    try {
      const newData = await getTagMoviesSorted(selectedTag.id, 2);
      setData(newData);
      setSortOrderY('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // --------------------------------------------
  // REQUEST ALL MOVIES SORTED CHRONOLOGICAL DSC
  // --------------------------------------------
  const movieSortedYearDesc = async () => {
    try {
      const newData = await getTagMoviesSorted(selectedTag.id, 3);
      setData(newData);
      setSortOrderY('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // --------------------------------------------
  // STYLE MUI
  // --------------------------------------------
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fefee2',
        light: '#ffa500',
        dark: '#e59100',
        contrastText: '#242105',
      },
      artists_list: {
        main: '#fefee2',
        light: '#ffa500',
        dark: '#e59100',
        contrastText: '#242105',
      },
    },
  });

  // --------------------------------------------
  // PROPS FOR TEXTS & IMAGE
  // --------------------------------------------
  const origin = 'tags';

  // -----------------------------------------------------
  // MISE A JOUR AFFICHAGE SI DELETE MOVIE DANS MOVIECARD
  // -----------------------------------------------------
  const handleDeleteMovie = () => {
    fetchMoviesByTag();
  };

  // --------------------------------------------
  // FONCTION POUR BTN RESET SEARCH
  // --------------------------------------------
  const handleResetSearch = () => {
    setSearch('');
    SetSelectedLetter('a'); // lettre par défaut
    setselectedTag('');
    setMovies([]);
    setData([]);
    setMovieAmount(0);
  };

  // --------------------------------------------
  // RETURN
  // --------------------------------------------
  return (
    <main>
      <section className="artists_content">
        <section className="search_bar_contents">
          <MovieArtistSearchBar
            placeholder="recherche tags"
            search={search}
            onSearchChange={handleTyping}
            onReset={handleResetSearch}
            selectedItem={selectedTag}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
        </section>
        <div className="dashed_secondary_bar" />
        <section>
          <section className="artists_seach_container">
            <ArtistList
              handleLetterChange={handleLetterChange}
              search={search}
              theme={theme}
              selectedByLetter={selectedTagByLetter}
              filteredArtist={filteredTag}
              handleArtistClick={handleArtistClick}
              origin={origin}
              artistAmount={tagsAmount}
              selectedArtistAmount={selectedTagAmount}
            />
            <ArtistFilmo
              selectedArtist={selectedTag}
              origin={origin}
              data={data}
              sortOrderA={sortOrderA}
              movieSortedZ={movieSortedZ}
              movieSortedA={movieSortedA}
              sortOrderY={sortOrderY}
              movieSortedYearDesc={movieSortedYearDesc}
              movieSortedYear={movieSortedYear}
              movieAmount={movieAmount}
              onUpdateMovie={fetchMoviesByTag}
              onDeleteMovie={handleDeleteMovie}
              onReset={handleResetSearch}
              openSideBar={openSideBar}
              setOpenSideBar={setOpenSideBar}
            />
          </section>
        </section>
      </section>
    </main>
  ); // end return
} // function MovieCasting()

export default MovieTag;
