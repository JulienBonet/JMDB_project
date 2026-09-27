/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import { Box, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
// hook
import { useMovieInfosEntrance } from '../../../../hooks/useMovieInfosEntrance';

function MovieInfosEntrance({ title, onMovieClick, handleCloseModalMIE }) {
  const { data, fullData, genres, genresLoaded, page, setPage, adult, setAdult, error } =
    useMovieInfosEntrance(title);

  // --------------------------------------------
  // Fonction pour récupérer les genres d'un film
  // --------------------------------------------
  const getMovieGenres = (movie) => {
    // Vérifier si genres est chargé ou non
    if (!genresLoaded) {
      return 'Chargement des genres...';
    }
    // Vérifier si movie.genre_ids est défini
    if (!movie.genre_ids) {
      return '';
    }
    const genreNames = [];
    movie.genre_ids.forEach((id) => {
      const genre = genres.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames.join(', ');
  };

  // --------------------------------------------
  // SWITCH ADULT
  // --------------------------------------------

  const handleAdultSwitchChange = (event) => {
    setAdult(event.target.checked);
    setPage(1);
  };

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

  // --------------------------------------------
  // Fonction pour formater la date de sortie
  // --------------------------------------------
  const getYear = (releaseDate) => {
    if (!releaseDate) {
      return '';
    }
    return releaseDate.substring(0, 4);
  };

  // -----------------------------------------------------
  // Fonction pour gérer le clic sur le bouton précédent
  // -----------------------------------------------------
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // -----------------------------------------------------
  // Fonction pour gérer le clic sur le bouton suivant
  // -----------------------------------------------------
  const handleNextPage = () => {
    if (fullData && page < fullData.total_pages) {
      setPage(page + 1);
    }
  };

  // Afficher un message d'erreur s'il y en a un
  if (error) {
    return <div>{error}</div>;
  }

  // Afficher un message de chargement si les données complètes ne sont pas encore disponibles
  if (!fullData) {
    return <div>Chargement...</div>;
  }

  // -----------------------------------------------------
  // RETURN
  // -----------------------------------------------------
  return (
    <Box
      component="main"
      id="MiE_Container"
      sx={{
        bgcolor: 'azure',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        height: '90vh',
      }}
    >
      {/* MIE CONTENTS */}
      <Box
        component="section"
        id="MiE_Contents"
        sx={{
          width: {
            xs: '90%',
            md: '95%',
            lg: '98%',
          },
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* TOP SECTION */}

        {/* Main title */}
        <Typography
          component="h1"
          id="MiE_Main_Title"
          textAlign="center"
          fontFamily="var(--font-01)"
          fontSize="larger"
        >
          ENTRÉES DE RECHERCHE DE FILM
        </Typography>
        {/* end Main title */}

        {/* Movies Count */}
        <Typography id="MiE-movie_count" textAlign="center" fontFamily="var(--font-02)">
          <Box component="span" fontWeight="bold">
            {fullData.total_results}
          </Box>{' '}
          film(s)
        </Typography>
        {/* end Movies Count */}

        {/* adult movies switch */}
        <Box
          id="MiE_adult_switch"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <PinkSwitch
                  checked={adult}
                  onChange={handleAdultSwitchChange}
                  name="adult"
                  color="primary"
                />
              }
              label="Inclure le contenu pour adultes"
            />
          </FormGroup>
        </Box>
        {/* end adult movies switch */}

        {/* END TOP SECTION */}

        {/* MOVIES SECTION */}
        <Box component="ul" id="MiE_MoviesList_Section">
          {data.map((item) => (
            <Box
              component="li"
              id="MiE_MovieBloc"
              key={`${item.media_type}-${item.id}`}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  lg: 'row',
                },
                gap: {
                  xs: 3,
                  lg: 0,
                },
                alignItems: 'center',
                border: 1,
                borderColor: 'black',
                my: 2,
                py: 2,
              }}
            >
              {/* Cover Column */}
              <Box
                id="MiE_MovieBloc_Cover"
                sx={{
                  width: {
                    xs: '100%',
                    md: '40%',
                    lg: '15%',
                  },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.poster_path && (
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    sx={{
                      width: '50%',
                    }}
                  />
                )}
              </Box>
              {/* End Cover Column */}

              {/* Infos Movie Column */}
              <Box
                id="MiE_MovieBloc_InfosMovie"
                sx={{
                  width: {
                    xs: '90%',
                    lg: '80%',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {/* movie title */}
                <Typography component="h2" fontFamily="var(--font-03)" fontSize="large">
                  {item.title || item.name}{' '}
                  <Box
                    component="span"
                    sx={{
                      color: 'var(--color-04)',
                    }}
                  >
                    [{item.media_type === 'movie' ? 'Film' : 'Série'}]
                  </Box>
                </Typography>
                {/* end movie title */}

                {/* alt movie title */}
                {(item.original_title || item.original_name) && (
                  <Typography component="h3" fontFamily="var(--font-02)" fontStyle="italic">
                    {item.original_title || item.original_name}
                  </Typography>
                )}
                {/* end alt movie title */}

                {/* adult movie warning */}
                {item.adult && (
                  <Typography color="error" fontWeight="bold">
                    X ADULTE X
                  </Typography>
                )}
                {/* end adult movie warning */}

                {/* movie kinds */}
                <Typography fontFamily="var(--font-02)">
                  <Box component="span" fontWeight="bold">
                    Genre :
                  </Box>{' '}
                  {getMovieGenres(item)}
                </Typography>
                {/* end movie kinds */}

                {/* movie release */}
                <Typography fontFamily="var(--font-02)">
                  <Box component="span" fontWeight="bold">
                    Sortie :
                  </Box>{' '}
                  {getYear(item.release_date || item.first_air_date)}
                </Typography>
                {/* end movie release */}

                {/* movie synopsis */}
                <Typography fontFamily="var(--font-02)" lineHeight={1.5}>
                  <Box component="span" fontWeight="bold">
                    Synopsis :
                  </Box>{' '}
                  {item.overview}
                </Typography>
                {/* end movie synopsis */}
              </Box>
              {/* End Infos Movie Column */}

              {/* Select Button Column */}
              <Box
                id="MiE_MovieBloc_SelectBtn"
                sx={{
                  width: '5%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => {
                    onMovieClick(item.id, item.media_type);
                    handleCloseModalMIE();
                  }}
                >
                  OK
                </button>
              </Box>
              {/* Select Button Column */}
            </Box>
          ))}
        </Box>
        {/* END MOVIES SECTION */}

        {/* TAB - NAV SECTION */}
        {fullData.total_pages > 1 && (
          <Box
            component="section"
            id="MiE_Tab_Nav"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              pb: 4,
            }}
          >
            <button onClick={handlePrevPage} disabled={page === 1}>
              Précédent
            </button>
            <Typography id="MiE_PagesCounter" textAlign="center" fontFamily="var(--font-02)">
              [ {page} / {fullData.total_pages} ]
            </Typography>
            <button onClick={handleNextPage} disabled={page === fullData.total_pages}>
              Suivant
            </button>
          </Box>
        )}
        {/* END TAB - NAV SECTION */}
      </Box>
      {/* END MIE CONTENTS */}
    </Box>
  );
}

export default MovieInfosEntrance;
