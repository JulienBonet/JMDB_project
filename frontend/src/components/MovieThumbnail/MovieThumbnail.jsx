/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Modal } from '@mui/material';
// Services
import { getMovie } from '../../services/movieService';
// Component
import MovieCard from '../MovieCard/MovieCard';
// SX
import { thumbnailContainerSx, thumbnailCoverSX, thumbnailTitleSx } from './MovieThumbnailStyles';

function MovieThumbnail({
  data,
  onDeleteMovie,
  onUpdateMovie,
  onFavoriteRemoved,
  homepage = false,
}) {
  const origin = 'movie';
  const [movieData, setMovieData] = useState(data);
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  const { title, cover: coverName } = movieData;
  const year = Number(movieData.year) || '';

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Recuperer cover
  const getCoverUrl = (cover) => {
    if (!cover) return `${CLOUDINARY_BASE_URL}/00_cover_default.jpg`;
    if (cover.startsWith('http')) return cover;
    return `${CLOUDINARY_BASE_URL}/${cover}`;
  };

  // relancer le shuffle
  const handleUpdateMovie = async () => {
    try {
      const updatedMovie = await getMovie(data.id);
      setMovieData(updatedMovie);
    } catch (error) {
      console.error('Erreur lors de la récupération des données mises à jour:', error);
    }
  };

  // Ouvre le modal avec le film sélectionné
  const openModal = () => {
    setSelectedMovie(movieData);
  };

  // Ferme le modal
  const closeModal = () => {
    setSelectedMovie(null);
  };

  // ----------------
  // RETURN
  // ----------------
  return (
    <>
      {/* THUMBNAIL */}
      <Box
        id="MovieThumbnail_container"
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={openModal}
        sx={thumbnailContainerSx(homepage)}
      >
        <Box
          id="MovieThumbnail_cover"
          component="img"
          src={getCoverUrl(coverName)}
          alt={`Cover ${title}`}
          sx={thumbnailCoverSX(homepage)}
        />
        <Box id="MovieThumbnail_title" component="p" sx={thumbnailTitleSx}>
          {title} ({year})
        </Box>
      </Box>
      {/* END THUMBNAIL */}

      {/* MODAL MOVIE CARD*/}
      {selectedMovie && (
        <Modal
          open
          onClose={closeModal}
          sx={{
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              minHeight: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              boxSizing: 'border-box',
              py: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 'lg',
              }}
            >
              <Box
                onClick={closeModal}
                role="button"
                tabIndex={0}
                sx={{
                  textAlign: 'right',
                  fontFamily: 'var(--font-04)',
                  fontWeight: 600,
                  color: 'var(--color-02)',
                  cursor: 'pointer',
                  p: '1rem 1rem 1rem 0',
                  m: 0,
                }}
              >
                X Fermer
              </Box>

              <MovieCard
                movie={selectedMovie}
                origin={origin}
                onUpdateMovie={homepage ? handleUpdateMovie : onUpdateMovie}
                onDeleteMovie={onDeleteMovie}
                onFavoriteRemoved={onFavoriteRemoved}
                closeModal={closeModal}
              />
            </Box>
          </Box>
        </Modal>
      )}
      {/* END MODAL */}
    </>
  );
}

export default MovieThumbnail;
