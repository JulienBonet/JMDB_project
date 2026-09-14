import { Box, Container, Modal } from '@mui/material';

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
        <div
          onClick={handleCloseModal}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleCloseModal();
            }
          }}
          role="button"
          tabIndex={0}
          className="modal_closed_btn_MovieItemList"
        >
          &#91; Fermer &#93;
        </div>

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
