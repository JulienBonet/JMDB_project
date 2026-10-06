import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player';
import {
  movieInfoMovieCardviewSx,
  spanInfoMovieCardviewSx,
  dividerSx,
  dividerDashedSx,
} from './constant/MovieCardEditStyle';

const MovieCardView = ({
  movieData,
  isTvShow,
  tvSeason,
  isTrailerVisible,
  isTrailerLoading,
  genres,
  countries,
  directors,
  screenwriters,
  music,
  studios,
  casting,
  handleTrailerReady,
  handleTrailerStart,
}) => {
  //------------------
  // SX
  //------------------

  const spanArtistsMovieCardviewSx = { fontWeight: 'bold', color: 'var(--color-02)' };

  // ------------------------------
  // RETURN
  // ------------------------------
  return (
    <>
      {/* INFO BLOCK 1 */}
      <Box
        id="MovieCardView01"
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* movie title */}
        <Typography
          id="Title_MovieCardView01"
          component="p"
          sx={{
            fontFamily: 'var(--font-05)',
            textAlign: { xs: 'center', lg: 'left' },
            color: 'var(--color-02)',
            fontSize: 'x-large',
            mb: 0.5,
          }}
        >
          {movieData.title} {isTvShow && tvSeason && <Box component="span">/Saison {tvSeason}</Box>}
        </Typography>
        {/* end movie title */}

        {/* top divider */}
        <Box id="Top_Divider_MovieCardView01" sx={{ ...dividerSx, my: 0.5 }} />
        {/* end top divider */}

        {/* trailer */}
        {isTrailerVisible ? (
          <>
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isTrailerLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Box
              id="MovieCard_videoplayerContainer"
              component="section"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                flex: 1,
                minWidth: 0,
              }}
            >
              <Box
                id="MovieCard_videoplayer_Content"
                sx={{
                  width: '70vw',
                  maxWidth: '650px',
                  aspectRatio: '16 / 9',
                }}
              >
                <ReactPlayer
                  id="MovieCard_reactplayer"
                  url={movieData.trailer}
                  controls
                  width="100%"
                  height="100%"
                  onReady={handleTrailerReady}
                  onStart={handleTrailerStart}
                />
              </Box>
            </Box>
            {/* end trailer */}
          </>
        ) : (
          <>
            {/* altTitle */}
            {movieData.altTitle && (
              <Typography id="altTitle_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
                {movieData.altTitle} (Titre original)
              </Typography>
            )}
            {/* end altTitle */}

            {/* Genre */}
            <Typography id="genre_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
              <Box component="span" sx={spanInfoMovieCardviewSx}>
                Genre:
              </Box>{' '}
              {genres}
            </Typography>
            {/* end Genre */}

            {/* Année */}
            <Typography id="year_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
              <Box component="span" sx={spanInfoMovieCardviewSx}>
                Année:
              </Box>{' '}
              {movieData.year || ''}
            </Typography>
            {/* end Année */}

            {/* Pays */}
            <Typography id="country_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
              <Box component="span" sx={spanInfoMovieCardviewSx}>
                Pays:
              </Box>{' '}
              {countries}
            </Typography>
            {/* end Pays */}

            {/* TV saisons */}
            {isTvShow && movieData.tvSeasons && movieData.tvSeasons.trim() !== '' && (
              <Typography
                id="tvSeasons_MovieCardView01"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  saisons:
                </Box>{' '}
                {movieData.tvSeasons || ''}
              </Typography>
            )}
            {/* end TV saisons */}

            {/* TV episodes */}
            {isTvShow && movieData.nbTvEpisodes && movieData.nbTvEpisodes > 0 && (
              <Typography
                id="tvEpisodes_MovieCardView01"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  Nb d&apos;épisodes:
                </Box>{' '}
                {movieData.nbTvEpisodes || ''}
              </Typography>
            )}
            {/* end TV episodes */}

            {/* TV Durée d'épisode */}
            {isTvShow && movieData.episodeDuration && movieData.episodeDuration > 0 && (
              <Typography
                id="tvEpisodeDuration_MovieCardView01"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  Durée d&apos;épisode:
                </Box>{' '}
                {movieData.episodeDuration || ''} mn
              </Typography>
            )}
            {/* end TV Durée d'épisode */}

            {/* Durée */}
            {!isTvShow && (
              <Typography id="Duration_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  Durée:
                </Box>{' '}
                {movieData.duration || ''}mn
              </Typography>
            )}
            {/* end Durée */}

            {/* Divider */}
            <Box id="middle_Divider_MovieCardView01" sx={dividerDashedSx} />
            {/* end Divider */}

            {/* Réalisateur / créateur */}
            {directors && (
              <Typography id="director_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
                <Box component="span" sx={spanArtistsMovieCardviewSx}>
                  {isTvShow ? 'Créateur:' : 'Réalisateur:'}
                </Box>{' '}
                {directors}
              </Typography>
            )}
            {/* end Réalisateur / créateur */}

            {/* Scénariste */}
            {screenwriters && (
              <Typography
                id="screenwriter_MovieCardView01"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                <Box component="span" sx={spanArtistsMovieCardviewSx}>
                  Scénariste:
                </Box>{' '}
                {screenwriters}
              </Typography>
            )}
            {/* end Scénariste */}

            {/* Compositeur */}
            {music && (
              <Typography
                id="compositor_MovieCardView01"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                <Box component="span" sx={spanArtistsMovieCardviewSx}>
                  Musique:
                </Box>{' '}
                {music}
              </Typography>
            )}
            {/* end Compositeur */}

            {/* Studio */}
            {studios && (
              <Typography id="studio_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
                <Box component="span" sx={spanArtistsMovieCardviewSx}>
                  Studio:
                </Box>{' '}
                {studios}
              </Typography>
            )}
            {/* end Studio */}

            {/* casting */}
            {casting && (
              <Typography id="casting_MovieCardView01" component="p" sx={movieInfoMovieCardviewSx}>
                <Box component="span" sx={spanArtistsMovieCardviewSx}>
                  Casting:
                </Box>{' '}
                {casting}
              </Typography>
            )}
            {/* end casting */}

            {/* back divider */}
            <Box id="Back_Divider_MovieCardView01" sx={{ ...dividerSx, my: 0.5 }} />
            {/* end back divider */}
          </>
        )}
      </Box>
      {/* END INFO BLOCK 1 */}
    </>
  );
};

export default MovieCardView;
