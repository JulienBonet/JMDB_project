import { Box } from '@mui/material';

function AdminListLayout({ children }) {
  return (
    <Box component="section" sx={{ width: '95%' }}>
      {children}
    </Box>
  );
}

export default AdminListLayout;
