/* eslint-disable react/prop-types */
import { Modal, Box, Container } from '@mui/material';
import CreateItemCard from '../AdminItemsCards/CreateItemCard';

function AdminCreateItemModal({ open, onClose, origin, onUpdate }) {
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
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          py: 2,
        }}
      >
        <Container maxWidth="sm">
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

          <CreateItemCard origin={origin} onUpdate={onUpdate} closeModal={onClose} />
        </Container>
      </Box>
    </Modal>
  );
}

export default AdminCreateItemModal;
