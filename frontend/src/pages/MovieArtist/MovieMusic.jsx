import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import './movieArtist.css';
import './movieArtistMediaQueries.css';
import ArtistList from '../../components/ArtistList/ArtistList';
import ArtistFilmo from '../../components/ArtistFilmo/ArtistFilmo';
import MovieArtistSearchBar from '../../components/MovieArtistSearchBar/MovieArtistSearchBar';
// refactor
import {
  getArtistsByLetter,
  getArtistMovies,
  getArtistMoviesSorted,
} from '../../services/artistService';

function MovieCasting() {
  // ------------
  // DATAS
  // ------------
  const musicData = useLoaderData();
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState(movies);
  const [search, setSearch] = useState('');
  const [sortOrderA, setSortOrderA] = useState('asc');
  const [sortOrderY, setSortOrderY] = useState('desc');
  const [movieAmount, setMovieAmount] = useState(0);
  const [selectedLetter, SetSelectedLetter] = useState('a');
  const [selectedMusic, setselectedMusic] = useState('');
  const [selectedMusicByLetter, setSelectedMusicByLetter] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);

  // --------------------------------------------
  // REQUEST ALL ARTIST BY LETTER
  // --------------------------------------------
  useEffect(() => {
    getArtistsByLetter('music', selectedLetter)
      .then((musicDataLetter) => {
        setSelectedMusicByLetter(musicDataLetter);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [selectedLetter]);

  // --------------------------------------------
  // REQUEST ALL MOVIES by ARTIST
  // --------------------------------------------
  const fetchMoviesByMusic = () => {
    getArtistMovies('music', selectedMusic.id)
      .then((moviesData) => {
        setMovies(moviesData);
        setMovieAmount(moviesData.length);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchMoviesByMusic();
  }, [selectedMusic]);

  // --------------------------------------------
  // SELECT LETTER
  // --------------------------------------------
  const handleLetterChange = (letter) => {
    SetSelectedLetter(letter);
    setSearch('');
  };

  // --------------------------------------------
  // SELECT ARTIST
  // --------------------------------------------
  const handleArtistClick = (music) => {
    setselectedMusic(music);
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

  const filteredMusic = musicData
    ? musicData.filter(
        (dataItem) =>
          dataItem.name &&
          dataItem.name.toString().toLowerCase().replace(/-/g, '').includes(search.toLowerCase())
      )
    : [];

  // --------------------------------------------
  // ARTISTS AMOUNT
  // --------------------------------------------
  const musicAmount = selectedMusicByLetter.length;
  const selectedMusicAmount = filteredMusic.length;

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
      const newData = await getArtistMoviesSorted('music', selectedMusic.id, 0);
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
      const newData = await getArtistMoviesSorted('music', selectedMusic.id, 1);
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
      const newData = await getArtistMoviesSorted('music', selectedMusic.id, 2);
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
      const newData = await getArtistMoviesSorted('music', selectedMusic.id, 3);
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
  const origin = 'music';

  // ----------------------------------------------------
  // MISE A JOUR AFFICHAGE SI DELETE MOVIE DANS MOVIECARD
  // ----------------------------------------------------
  const handleDeleteMovie = () => {
    fetchMoviesByMusic();
  };

  // --------------------------------------------
  // FONCTION POUR BTN RESET SEARCH
  // --------------------------------------------
  const handleResetSearch = () => {
    setSearch('');
    SetSelectedLetter('a'); // lettre par défaut
    setselectedMusic('');
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
            placeholder="recherche compositeur"
            search={search}
            onSearchChange={handleTyping}
            onReset={handleResetSearch}
            selectedItem={selectedMusic}
            sopenSideBar={openSideBar}
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
              selectedByLetter={selectedMusicByLetter}
              filteredArtist={filteredMusic}
              handleArtistClick={handleArtistClick}
              origin={origin}
              artistAmount={musicAmount}
              selectedArtistAmount={selectedMusicAmount}
            />
            <ArtistFilmo
              selectedArtist={selectedMusic}
              origin={origin}
              data={data}
              sortOrderA={sortOrderA}
              movieSortedZ={movieSortedZ}
              movieSortedA={movieSortedA}
              sortOrderY={sortOrderY}
              movieSortedYearDesc={movieSortedYearDesc}
              movieSortedYear={movieSortedYear}
              movieAmount={movieAmount}
              onUpdateMovie={fetchMoviesByMusic}
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

export default MovieCasting;
