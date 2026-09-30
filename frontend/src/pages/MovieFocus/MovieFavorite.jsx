import { useAuth } from '../../Context/AuthContext';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import favoriteIco from '../../assets/ico/favorite.png';
// hook
import useMovieFavoritesPage from '../../hooks/useMovieFavoritesPage';
// component
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';

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
    <Box
      component="main"
      id="MovieFavouriteLayout_Main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <Box
        component="section"
        id="MovieFavourite_Header"
        sx={{
          flex: '0 0 auto',
        }}
      >
        {/* header contents */}
        <Box
          id="MovieFavourite_HeaderContent"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '5rem',
            px: 4,
            gap: 1,
          }}
        >
          {/* ico Favourite */}
          <Box
            component="img"
            id="favorite_Ico"
            src={favoriteIco}
            alt="favorite_ico"
            sx={{ height: '3rem' }}
          />
          {/* end ico Favourite */}

          {/* header title */}
          <Typography
            id="Favorite_HeaderTitle"
            component="h1"
            sx={{
              fontFamily: 'var(--font-02)',
              color: 'var(--color-01)',
              fontSize: { xs: 'large', sm: 'xx-large' },
            }}
          >
            MA LISTE
          </Typography>
          {/* end header title */}

          {/* toggle Btn */}
          <ToggleSortedButton active={!!movies} onClick={() => setOpenSideBar(!openSideBar)} />
          {/* end toggle Btn */}
        </Box>
        {/* end header contents */}
      </Box>

      <div className="dashed_secondary_bar" />
      {/* END HEADER */}

      {/* FAVORITES MOVIES LIST */}
      <Box
        component="section"
        id="MovieFavourite_Content"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflowY: 'auto',
        }}
      >
        {/* sorted sticky bar */}
        <SideActionBar
          onAlphabeticClick={handleSortedAlphabeticalMovies}
          onChronologicClick={handleSortedChronologicalMovies}
          onResetClick={handleResetMovies}
          openSideBar={openSideBar}
          origin={origin}
        />
        {/* end sorted sticky bar */}

        {/* favorite movies list container */}
        <Container maxWidth={false}>
          {/* loader */}
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
          {/* end loader */}

          {/* if NO favorite movies */}
          {!loading && movies.length === 0 && (
            <Box
              id="Favorites_EmptyState"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '60vh',
                textAlign: 'center',
                gap: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: '3rem',
                  fontFamily: 'var(--font-02)',
                  color: 'var(--color-03)',
                }}
              >
                AUCUN FILM DANS VOTRE LISTE
              </Typography>
            </Box>
          )}
          {/* end if NO favorite movies */}

          {/* end if favorite movies list */}
          {!loading && movies.length > 0 && (
            <Box
              id="FavoriteMovies_Container"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                py: 4,
                width: '90%',
                mx: 'auto',
              }}
            >
              {movies.map((movie) => (
                <MovieThumbnail
                  key={movie.id}
                  data={movie}
                  onUpdateMovie={handleUpdateMovie}
                  onDeleteMovie={handleDeleteMovie}
                  onFavoriteRemoved={fetchFavorites}
                />
              ))}
            </Box>
          )}
          {/* end if favorite movies list */}
        </Container>
        {/* end favorite movies list container */}
      </Box>
      {/* END FAVORITES MOVIES LIST */}
    </Box>
  );
}

export default Favorites;
