import { Box, Modal } from '@mui/material';

import MovieInfosEntrance from './MovieInfosEntrance';

function MovieInfosEntranceModal({
  openModalMIE,
  handleCloseModalMIE,
  styleMIEmodal,
  title,
  onMovieClick,
}) {
  return (
    <Modal
      open={openModalMIE}
      onClose={handleCloseModalMIE}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleMIEmodal}>
        <MovieInfosEntrance
          title={title}
          onMovieClick={onMovieClick}
          handleCloseModalMIE={handleCloseModalMIE}
        />
      </Box>
    </Modal>
  );
}

export default MovieInfosEntranceModal;
