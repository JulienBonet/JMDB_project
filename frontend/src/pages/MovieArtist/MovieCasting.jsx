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
  // ---------
  // DATAS
  // ---------
  const castingData = useLoaderData();
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState(movies);
  const [selectedCasting, setSelectedCasting] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrderA, setSortOrderA] = useState('asc');
  const [sortOrderY, setSortOrderY] = useState('desc');
  const [movieAmount, setMovieAmount] = useState(0);
  const [selectedLetter, SetSelectedLetter] = useState('a');
  const [selectedCastingByLetter, setSelectedCastingByLetter] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);

  // ----------------------------
  // REQUEST ALL ARTIST BY LETTER
  // ----------------------------
  useEffect(() => {
    getArtistsByLetter('casting', selectedLetter)
      .then((castingDataLetter) => {
        setSelectedCastingByLetter(castingDataLetter);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [selectedLetter]);

  // ----------------------------
  // REQUEST ALL MOVIES by ARTIST
  // ----------------------------
  const fetchMoviesByCasting = () => {
    getArtistMovies('casting', selectedCasting.id)
      .then((moviesData) => {
        setMovies(moviesData);
        setMovieAmount(moviesData.length);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    fetchMoviesByCasting();
  }, [selectedCasting]);

  // ----------------------------
  // SELECT LETTER
  // ----------------------------
  const handleLetterChange = (letter) => {
    SetSelectedLetter(letter);
    setSearch('');
  };

  // ----------------------------
  // SELECT ARTIST
  // ----------------------------
  const handleArtistClick = (casting) => {
    setSelectedCasting(casting);
  };

  // ----------------------------
  // SEARCH BAR
  // ----------------------------
  const handleTyping = (e) => {
    let { value } = e.target;
    value = value.replace(/-/g, '').toLowerCase();
    setSearch(value);
    SetSelectedLetter('');
  };

  const filteredCasting = castingData
    ? castingData.filter(
        (dataItem) =>
          dataItem.name &&
          dataItem.name.toString().toLowerCase().replace(/-/g, '').includes(search.toLowerCase())
      )
    : [];

  // ----------------------------
  // ARTISTS AMOUNT
  // ----------------------------
  const castingAmount = selectedCastingByLetter.length;
  const selectedCastingAmount = filteredCasting.length;

  // ----------------------------
  // SORTED BTN
  // ----------------------------
  useEffect(() => {
    setData(movies);
  }, [movies]);

  // ------------------------------------------
  // REQUEST ALL MOVIES SORTED ALPHABETICAL ASC
  // ------------------------------------------
  const movieSortedA = async () => {
    try {
      const newData = await getArtistMoviesSorted('casting', selectedCasting.id, 0);
      setData(newData);
      setSortOrderA('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ------------------------------------------
  // REQUEST ALL MOVIES SORTED ALPHABETICAL DESC
  // ------------------------------------------
  const movieSortedZ = async () => {
    try {
      const newData = await getArtistMoviesSorted('casting', selectedCasting.id, 1);
      setData(newData);
      setSortOrderA('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ------------------------------------------
  // REQUEST ALL MOVIES SORTED CHRONOLOGICAL ASC
  // ------------------------------------------
  const movieSortedYear = async () => {
    try {
      const newData = await getArtistMoviesSorted('casting', selectedCasting.id, 2);
      setData(newData);
      setSortOrderY('asc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ------------------------------------------
  // REQUEST ALL MOVIES SORTED CHRONOLOGICAL DSC
  // ------------------------------------------
  const movieSortedYearDesc = async () => {
    try {
      const newData = await getArtistMoviesSorted('casting', selectedCasting.id, 3);
      setData(newData);
      setSortOrderY('desc');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ------------------------------------------
  // STYLE MUI
  // ------------------------------------------
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
    }, // end palette
  }); // end const theme

  // ------------------------------------------
  // PROPS FOR TEXTS & IMAGE
  // ------------------------------------------
  const origin = 'casting';

  // ----------------------------------------------------
  // MISE A JOUR AFFICHAGE SI DELETE MOVIE DANS MOVIECARD
  // ----------------------------------------------------
  const handleDeleteMovie = () => {
    fetchMoviesByCasting();
  };

  // ------------------------------------------
  // FONCTION POUR BTN RESET SEARCH
  // ------------------------------------------
  const handleResetSearch = () => {
    setSearch('');
    SetSelectedLetter('a'); // lettre par défaut
    setSelectedCasting('');
    setMovies([]);
    setData([]);
    setMovieAmount(0);
  };

  // ------------------------------------------
  // RETURN
  // ------------------------------------------
  return (
    <main>
      <section className="artists_content">
        <section className="search_bar_contents">
          <MovieArtistSearchBar
            placeholder="recherche acteur"
            search={search}
            onSearchChange={handleTyping}
            onReset={handleResetSearch}
            selectedItem={selectedCasting}
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
              selectedByLetter={selectedCastingByLetter}
              filteredArtist={filteredCasting}
              handleArtistClick={handleArtistClick}
              origin={origin}
              artistAmount={castingAmount}
              selectedArtistAmount={selectedCastingAmount}
            />
            <ArtistFilmo
              selectedArtist={selectedCasting}
              origin={origin}
              data={data}
              sortOrderA={sortOrderA}
              movieSortedZ={movieSortedZ}
              movieSortedA={movieSortedA}
              sortOrderY={sortOrderY}
              movieSortedYearDesc={movieSortedYearDesc}
              movieSortedYear={movieSortedYear}
              movieAmount={movieAmount}
              onUpdateMovie={fetchMoviesByCasting}
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
