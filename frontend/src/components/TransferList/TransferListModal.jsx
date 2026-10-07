import { Box, Container, Modal, Typography } from '@mui/material';
import TransferList from './TransferList';

const transferListStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 0,
  pb: 4,
  px: 0,
};

function TransferListModal({
  open,
  onClose,
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
  onSelectedKindsUpdate,
  onSelectedDirectorsUpdate,
  onSelectedCastingUpdate,
  onSelectedScreenwritersUpdate,
  onSelectedMusicUpdate,
  onSelectedStudiosUpdate,
  onSelectedCountriesUpdate,
  onSelectedLanguagesUpdate,
  onSelectedTagsUpdate,
  onSelectedFocusUpdate,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="transfer-list-modal-title"
      aria-describedby="transfer-list-modal-description"
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
            onClick={onClose}
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
          {open && dataType && (
            <TransferList
              dataType={dataType}
              items={data || []}
              selectedKinds={selectedKinds}
              onSelectedKindsUpdate={onSelectedKindsUpdate}
              selectedDirectors={selectedDirectors}
              onSelectedDirectorsUpdate={onSelectedDirectorsUpdate}
              selectedCasting={selectedCasting}
              onSelectedCastingUpdate={onSelectedCastingUpdate}
              selectedScreenwriters={selectedScreenwriters}
              onSelectedScreenwritersUpdate={onSelectedScreenwritersUpdate}
              selectedMusic={selectedMusic}
              onSelectedMusicUpdate={onSelectedMusicUpdate}
              selectedStudios={selectedStudios}
              onSelectedStudiosUpdate={onSelectedStudiosUpdate}
              selectedCountries={selectedCountries}
              onSelectedCountriesUpdate={onSelectedCountriesUpdate}
              selectedLanguages={selectedLanguages}
              onSelectedLanguagesUpdate={onSelectedLanguagesUpdate}
              selectedTags={selectedTags}
              onSelectedTagsUpdate={onSelectedTagsUpdate}
              selectedFocus={selectedFocus}
              onSelectedFocusUpdate={onSelectedFocusUpdate}
            />
          )}
        </Container>
      </Box>
    </Modal>
  );
}

export default TransferListModal;
