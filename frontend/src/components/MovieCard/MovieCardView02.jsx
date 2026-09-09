// frontend/src/components/MovieCard/MovieCardView 02.jsx

const MovieCardView = ({ movieData, isTrailerVisible, focus, isAdmin, toggleTrailerVideo }) => {
  return (
    <>
      {/* INFO BLOCK 2 */}
      <section>
        <div className="MC_line2">
          {isTrailerVisible ? (
            <div className="MovieCard_trailer" />
          ) : (
            <>
              {/* Résumé */}
              <p className="MovieCard_info paraph_bolder">Résumé:</p>
              <p className="MovieCard_info MovieCard_story paraph_height">{movieData.story}</p>

              <div className="divider_dashed" />

              {/* focus */}
              {movieData.focus && (
                <>
                  <p className="MovieCard_info">
                    <span className="paraph_bolder">focus:</span> {focus}
                  </p>
                  <div className="divider_dashed" />
                </>
              )}

              {/* Support */}
              <p className="MovieCard_info">
                <span className="paraph_bolder">Support:</span> {movieData.videoSupport}
              </p>

              {/* Version VOSTFR - MULTI */}
              {movieData.vostfr ? (
                <p className="MovieCard_info paraph_height">
                  <span className="paraph_bolder">Version:</span> VOSTFR
                </p>
              ) : null}

              {movieData.multi ? (
                <p className="MovieCard_info paraph_height">
                  <span className="paraph_bolder">Version:</span> Multi-langues
                </p>
              ) : null}

              {/* Support */}
              {(movieData.videoSupport === 'Fichier multimédia' ||
                movieData.videoSupport === 'FICHIER MULTIMEDIA') &&
                isAdmin && (
                  <>
                    {movieData.location && (
                      <p className="MovieCard_info paraph_height">
                        <span className="paraph_bolder">Emplacement:</span> {movieData.location}
                      </p>
                    )}

                    {movieData.fileSize && (
                      <p className="MovieCard_info">
                        <span className="paraph_bolder">Size:</span> {movieData.fileSize}
                      </p>
                    )}
                  </>
                )}

              {/* Commentaire */}
              {movieData.comment && (
                <>
                  <div className="divider_dashed" />

                  <p className="MovieCard_info">
                    <span className="paraph_bolder">Commentaire:</span> {movieData.comment}
                  </p>
                </>
              )}
            </>
          )}

          {movieData.trailer && (
            <div className="MovieCard_trailer">
              <div className="divider_dashed divider_trailer" />

              <div
                className="Toggle_video_player"
                role="button"
                tabIndex={0}
                onClick={toggleTrailerVideo}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    toggleTrailerVideo();
                  }
                }}
              >
                <p className="MovieCard_info Toggle_video_btn">
                  {isTrailerVisible ? 'VOIR FICHE DU FILM' : 'VOIR BANDE ANNONCE'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieCardView;
