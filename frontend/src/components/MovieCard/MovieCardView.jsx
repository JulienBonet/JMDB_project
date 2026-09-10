// frontend/src/components/MovieCard/MovieCardView.jsx

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player';

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
  return (
    <>
      {/* INFO BLOCK 1 */}
      <section>
        <div className="infos_bloc_1">
          <p className="MovieCard_title">
            {movieData.title}{' '}
            {isTvShow && tvSeason && <span className="tvSeasonsBadge">/Saison {tvSeason}</span>}
          </p>

          <div className="divider" />

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

              <div className="MovieCard_trailer">
                <ReactPlayer
                  url={movieData.trailer}
                  className="video_player"
                  controls
                  onReady={handleTrailerReady}
                  onStart={handleTrailerStart}
                />
              </div>
            </>
          ) : (
            <>
              {/* altTitle */}
              {movieData.altTitle && (
                <p className="MovieCard_info">{movieData.altTitle} (Titre original)</p>
              )}

              {/* Genre */}
              <p className="MovieCard_info">
                <span className="paraph_bolder">Genre:</span> {genres}
              </p>

              {/* Année */}
              <p className="MovieCard_info">
                <span className="paraph_bolder">Année:</span> {movieData.year || ''}
              </p>

              {/* Pays */}
              <p className="MovieCard_info">
                <span className="paraph_bolder">Pays:</span> {countries}
              </p>

              {/* TV saisons */}
              {isTvShow && movieData.tvSeasons && movieData.tvSeasons.trim() !== '' && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder">saisons:</span> {movieData.tvSeasons || ''}
                </p>
              )}

              {/* TV episodes */}
              {isTvShow && movieData.nbTvEpisodes && movieData.nbTvEpisodes > 0 && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder">Nb d&apos;épisodes:</span>{' '}
                  {movieData.nbTvEpisodes || ''}
                </p>
              )}

              {/* TV Durée d'épisode */}
              {isTvShow && movieData.episodeDuration && movieData.episodeDuration > 0 && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder">Durée d&apos;épisode:</span>{' '}
                  {movieData.episodeDuration || ''} mn
                </p>
              )}

              {/* Durée */}
              {!isTvShow && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder">Durée:</span> {movieData.duration || ''}mn
                </p>
              )}

              <div className="divider_dashed" />

              {/* Réalisateur / créateur */}
              {directors && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder paraph_color_2">
                    {isTvShow ? 'Créateur:' : 'Réalisateur:'}
                  </span>{' '}
                  {directors}
                </p>
              )}

              {/* Scénariste */}
              {screenwriters && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder paraph_color_2">Scénariste:</span> {screenwriters}
                </p>
              )}

              {/* Compositeur */}
              {music && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder paraph_color_2">Musique:</span> {music}
                </p>
              )}

              {/* Studio */}
              {studios && (
                <p className="MovieCard_info">
                  <span className="paraph_bolder paraph_color_2">Studio:</span> {studios}
                </p>
              )}

              {/* casting */}
              {casting && (
                <p className="MovieCard_info MovieCard_casting paraph_height">
                  <span className="paraph_bolder paraph_color_2">Casting:</span> {casting}
                </p>
              )}

              <div className="divider" />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieCardView;
