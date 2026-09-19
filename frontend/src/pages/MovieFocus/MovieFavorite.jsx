import { Container, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
import favoriteIco from '../../assets/ico/favorite.png';
import './movieFocus.css';
import './movieFocusMediaqueries.css';
// refacto
import useMovieFavoritesPage from '../../hooks/useMovieFavoritesPage';

function Favorites() {
  const { token, user, isAuthenticated, authReady } = useAuth();

  const origin = 'movies';

  const {
    movies,
    openSideBar,
    setOpenSideBar,
    loading,
    fetchFavorites,
    handleSortedAlphabeticalMovies,
    handleSortedChronologicalMovies,
    handleResetMovies,
    handleUpdateMovie,
    handleDeleteMovie,
  } = useMovieFavoritesPage({
    token,
    authReady,
    isAuthenticated,
    userId: user?.id,
  });

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
