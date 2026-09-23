import { Box, Button, Typography } from '@mui/material';
import AdminSearchField from './AdminSearchField';

function AdminListHeader({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  actionLabel,
  onAction,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0',
        gap: 2,
        '@media (max-width: 720px)': {
          justifyContent: 'center',
        },
      }}
    >
      <Box
        sx={{
          width: '50%',
          '@media (max-width: 720px)': {
            display: 'none',
          },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-01)',
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '50%',
          gap: 1,
          '@media (max-width: 720px)': {
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '50%',
            padding: '10px',
            '@media (max-width: 720px)': {
              width: '90%',
            },
          }}
        >
          <AdminSearchField
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </Box>

        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}

export default AdminListHeader;
