import { Box, Pagination } from '@mui/material';

function AdminListPagination({ totalPages, onChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <Pagination count={totalPages} shape="rounded" onChange={onChange} />
    </Box>
  );
}

export default AdminListPagination;
