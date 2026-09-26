import { Box, Container, Modal, Typography } from '@mui/material';

import TransferList from '../../TransferList/TransferList';

function AddMovieTransferListModal({
  openModal,
  handleCloseModal,
  transferListStyle,
  data,
  dataType,
  selectedKinds,
  selectedDirectors,
  selectedCasting,
  selectedScreenwriters,
  selectedMusic,
  selectedStudios,
  selectedCountries,
  selectedLanguages,
  selectedTags,
  selectedFocus,
  setSelectedKinds,
  setSelectedDirectors,
  setSelectedCasting,
  setSelectedScreenwriters,
  setSelectedMusic,
  setSelectedStudios,
  setSelectedCountries,
  setSelectedLanguages,
  setSelectedTags,
  setSelectedFocus,
}) {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={transferListStyle}>
        <Box
          sx={{
            textAlign: 'right',
            pr: 2,
            pt: 2,
            pb: 3,
            mr: '5%',
          }}
        >
          <Typography
            component="button"
            onClick={handleCloseModal}
            sx={{
              border: 'none',
              background: 'none',
              fontFamily: 'var(--font-04)',
              fontWeight: 'bold',
              color: 'var(--color-05)',
              cursor: 'pointer',
            }}
          >
            [ Fermer ]
          </Typography>
        </Box>

        <Container>
          {openModal && dataType && (
            <TransferList
              dataType={dataType}
              items={data || []}
              selectedKinds={selectedKinds}
              onSelectedKindsUpdate={setSelectedKinds}
              selectedDirectors={selectedDirectors}
              onSelectedDirectorsUpdate={setSelectedDirectors}
              selectedScreenwriters={selectedScreenwriters}
              onSelectedScreenwritersUpdate={setSelectedScreenwriters}
              selectedMusic={selectedMusic}
              onSelectedMusicUpdate={setSelectedMusic}
              selectedCasting={selectedCasting}
              onSelectedCastingUpdate={setSelectedCasting}
              selectedStudios={selectedStudios}
              onSelectedStudiosUpdate={setSelectedStudios}
              selectedCountries={selectedCountries}
              onSelectedCountriesUpdate={setSelectedCountries}
              selectedLanguages={selectedLanguages}
              onSelectedLanguagesUpdate={setSelectedLanguages}
              selectedTags={selectedTags}
              onSelectedTagsUpdate={setSelectedTags}
              selectedFocus={selectedFocus}
              onSelectedFocusUpdate={setSelectedFocus}
            />
          )}
        </Container>
      </Box>
    </Modal>
  );
}

export default AddMovieTransferListModal;
