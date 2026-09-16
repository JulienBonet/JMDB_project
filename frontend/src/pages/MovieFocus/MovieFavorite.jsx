import { useState, useEffect } from 'react';
import { Container, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
import favoriteIco from '../../assets/ico/favorite.png';
import './movieFocus.css';
import './movieFocusMediaqueries.css';
// refacto
import {
  getFavorites,
  getFavoritesAlphaAsc,
  getFavoritesAlphaDesc,
  getFavoritesYearAsc,
  getFavoritesYearDesc,
} from '../../services/favoriteService';

function Favorites() {
  const { token, user, isAuthenticated, authReady } = useAuth();
  const [movies, setMovies] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [sortMoviesAsc, setSortMoviesAsc] = useState(true);
  const [sortMoviesYearAsc, setSortMoviesYearAsc] = useState(true);
  const [loading, setLoading] = useState(true);

  const origin = 'movies';

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
    if (!authReady || !isAuthenticated || !token || !user) return;
    fetchFavorites();
  }, [authReady, isAuthenticated, token, user?.id]);

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
    setMovies((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  //------------------------------------------
  // RENDER
  //------------------------------------------
  return (
    <main className="Main_movieFocusPage">
      {/* HEADER */}
      <section className="search_bar_container_MF">
        <div className="search_bar_content_selectefFocus_MF">
          <img src={favoriteIco} alt="favorite" className="thema_icon" />
          <h1 className="h1_titlePage_MF">MA LISTE</h1>
          <ToggleSortedButton active={!!movies} onClick={() => setOpenSideBar(!openSideBar)} />
        </div>
      </section>

      <div className="dashed_secondary_bar" />

      {/* CONTENT */}
      <section className="main_content_MF">
        <SideActionBar
          onAlphabeticClick={handleSortedAlphabeticalMovies}
          onChronologicClick={handleSortedChronologicalMovies}
          onResetClick={handleResetMovies}
          openSideBar={openSideBar}
          origin={origin}
        />

        <Container maxWidth={false}>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '40vh',
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!loading && movies.length === 0 && (
            <div className="NoFavoriteMessageContainer">
              <p>AUCUN FILM DANS VOTRE LISTE</p>
            </div>
          )}

          {!loading && movies.length > 0 && (
            <div className="Movies_thumbnails_container_MF">
              {movies.map((movie) => (
                <MovieThumbnail
                  key={movie.id}
                  data={movie}
                  onUpdateMovie={handleUpdateMovie}
                  onDeleteMovie={handleDeleteMovie}
                  onFavoriteRemoved={fetchFavorites}
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

export default Favorites;
