import { Box, Typography } from '@mui/material';
import {
  movieInfoMovieCardviewSx,
  spanInfoMovieCardviewSx,
  dividerDashedSx,
} from './constant/MovieCardEditStyle';

const MovieCardView = ({ movieData, isTrailerVisible, focus, isAdmin, toggleTrailerVideo }) => {
  // ------------------------------
  // SX
  // ------------------------------

  const toggleTrailerSx = {
    display: 'flex',
    alignItems: 'center',
    border: '1px dashed whitesmoke',
    borderTop: 0,
    width: 'max-content',
    p: '10px',
    columnGap: '10px',
    cursor: 'pointer',
  };

  // ------------------------------
  // RETURN
  // ------------------------------
  return (
    <Box component="section" id="MovieCardView02">
      {/* INFO BLOCK 2 */}
      <Box
        id="MovieCardView02_content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          mt: { xs: '5px', md: 0 },
        }}
      >
        {isTrailerVisible ? (
          <Box id="MovieCardView02_trailer" />
        ) : (
          <>
            {/* Résumé */}
            <Typography
              id="storyTitle_MovieCardView02"
              component="p"
              sx={{
                ...movieInfoMovieCardviewSx,
                fontWeight: 'bold',
              }}
            >
              Résumé:
            </Typography>

            <Typography
              id="story_MovieCardView02"
              component="p"
              sx={{
                ...movieInfoMovieCardviewSx,
                lineHeight: '26px',
                textAlign: 'justify',
              }}
            >
              {movieData.story}
            </Typography>
            {/* end Résumé */}

            {/* divider */}
            <Box id="divider_story_MovieCardView02" sx={dividerDashedSx} />
            {/* end divider */}

            {/* focus */}
            {movieData.focus && (
              <>
                <Typography id="focus_MovieCardView02" component="p" sx={movieInfoMovieCardviewSx}>
                  <Box component="span" sx={spanInfoMovieCardviewSx}>
                    focus:
                  </Box>{' '}
                  {focus}
                </Typography>

                <Box id="divider_focus_MovieCardView02" sx={dividerDashedSx} />
              </>
            )}
            {/* end focus */}

            {/* Support */}
            <Typography id="support_MovieCardView02" component="p" sx={movieInfoMovieCardviewSx}>
              <Box component="span" sx={spanInfoMovieCardviewSx}>
                Support:
              </Box>{' '}
              {movieData.videoSupport}
            </Typography>
            {/* end Support */}

            {/* Version VOSTFR */}
            {movieData.vostfr ? (
              <Typography
                id="vostfr_MovieCardView02"
                component="p"
                sx={{
                  ...movieInfoMovieCardviewSx,
                  lineHeight: '26px',
                }}
              >
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  Version:
                </Box>{' '}
                VOSTFR
              </Typography>
            ) : null}
            {/* end Version VOSTFR */}

            {/* Version Multi */}
            {movieData.multi ? (
              <Typography
                id="multi_MovieCardView02"
                component="p"
                sx={{
                  ...movieInfoMovieCardviewSx,
                  lineHeight: '26px',
                }}
              >
                <Box component="span" sx={spanInfoMovieCardviewSx}>
                  Version:
                </Box>{' '}
                Multi-langues
              </Typography>
            ) : null}
            {/* end Version Multi */}

            {/* Informations fichier */}
            {(movieData.videoSupport === 'Fichier multimédia' ||
              movieData.videoSupport === 'FICHIER MULTIMEDIA') &&
              isAdmin && (
                <>
                  {movieData.location && (
                    <Typography
                      id="location_MovieCardView02"
                      component="p"
                      sx={{
                        ...movieInfoMovieCardviewSx,
                        lineHeight: '26px',
                      }}
                    >
                      <Box component="span" sx={spanInfoMovieCardviewSx}>
                        Emplacement:
                      </Box>{' '}
                      {movieData.location}
                    </Typography>
                  )}

                  {movieData.fileSize && (
                    <Typography
                      id="fileSize_MovieCardView02"
                      component="p"
                      sx={movieInfoMovieCardviewSx}
                    >
                      <Box component="span" sx={spanInfoMovieCardviewSx}>
                        Size:
                      </Box>{' '}
                      {movieData.fileSize}
                    </Typography>
                  )}
                </>
              )}
            {/* end Informations fichier */}

            {/* Commentaire */}
            {movieData.comment && (
              <>
                <Box id="divider_comment_MovieCardView02" sx={dividerDashedSx} />

                <Typography
                  id="comment_MovieCardView02"
                  component="p"
                  sx={movieInfoMovieCardviewSx}
                >
                  <Box component="span" sx={spanInfoMovieCardviewSx}>
                    Commentaire:
                  </Box>{' '}
                  {movieData.comment}
                </Typography>
              </>
            )}
            {/* end Commentaire */}
          </>
        )}
        <Box id="divider_trailer_MovieCardView02" sx={{ ...dividerDashedSx, mb: 0 }} />
        {/* Toggle trailer */}
        {movieData.trailer && (
          <Box
            id="MovieCardView02_trailerToggle"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '-4px',
            }}
          >
            <Box
              id="Toggle_video_player_MovieCardView02"
              role="button"
              tabIndex={0}
              onClick={toggleTrailerVideo}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  toggleTrailerVideo();
                }
              }}
              sx={toggleTrailerSx}
            >
              <Typography
                id="Toggle_video_btn_MovieCardView02"
                component="p"
                sx={movieInfoMovieCardviewSx}
              >
                {isTrailerVisible ? 'VOIR FICHE DU FILM' : 'VOIR BANDE ANNONCE'}
              </Typography>
            </Box>
          </Box>
        )}
        {/* end Toggle trailer */}
      </Box>
      {/* END INFO BLOCK 2 */}
    </Box>
  );
};

export default MovieCardView;
