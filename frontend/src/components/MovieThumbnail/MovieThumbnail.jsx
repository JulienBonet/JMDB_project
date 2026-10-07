/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box } from '@mui/material';
// Services
import { getMovie } from '../../services/movieService';
// Component
import MovieCardModal from '../MovieCardModal/MovieCardModal';
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
        <MovieCardModal
          open={!!selectedMovie}
          onClose={closeModal}
          movie={selectedMovie}
          origin={origin}
          onUpdateMovie={homepage ? handleUpdateMovie : onUpdateMovie}
          onDeleteMovie={onDeleteMovie}
          onFavoriteRemoved={onFavoriteRemoved}
        />
      )}
      {/* END MODAL MOVIE CARD* */}
    </>
  );
}

export default MovieThumbnail;
