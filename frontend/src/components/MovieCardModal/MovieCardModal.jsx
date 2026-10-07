/* eslint-disable react/prop-types */
import { Modal, Box, Container } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';

function MovieCardModal({
  open,
  onClose,
  movie,
  origin,
  onUpdateMovie,
  onDeleteMovie,
  onFavoriteRemoved,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <Container maxWidth="lg">
          <Box
            onClick={onClose}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onClose();
              }
            }}
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
            movie={movie}
            origin={origin}
            onUpdateMovie={onUpdateMovie}
            onDeleteMovie={onDeleteMovie}
            onFavoriteRemoved={onFavoriteRemoved}
            closeModal={onClose}
          />
        </Container>
      </Box>
    </Modal>
  );
}

export default MovieCardModal;
