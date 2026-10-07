/* eslint-disable react/prop-types */
import { Modal, Box, Container } from '@mui/material';

function AdminModal({ open, onClose, children }) {
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
              mx: '5%',
            }}
          >
            X Fermer
          </Box>

          {children}
        </Container>
      </Box>
    </Modal>
  );
}

export default AdminModal;
