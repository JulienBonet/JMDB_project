import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AlbumIcon from '@mui/icons-material/Album';
// SX
import { filterSelectSx, filterMenuProps } from './MovieSearchFiltersStyles';

function VideoSupportFilter({ value, onChange }) {
  const options = [
    { value: 'all', label: 'SUPPORTS' },
    { value: 'dvd', label: 'DVD' },
    { value: 'multimedia', label: 'FICHIER MULTIMÉDIA' },
  ];

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        ...filterSelectSx,
        color: 'var(--color-03)',
        '& .MuiSelect-icon': {
          color: 'var(--color-03)',
        },
      }}
      MenuProps={{
        ...filterMenuProps,
        PaperProps: {
          ...filterMenuProps.PaperProps,
          sx: {
            ...filterMenuProps.PaperProps.sx,
            '& .MuiMenuItem-root:hover': {
              backgroundColor: 'var(--color-03)',
              color: 'var(--color-04)',
            },
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.value === 'all' && isTablet ? (
            <AlbumIcon sx={{ fontSize: 20, mr: 1 }} />
          ) : (
            option.label
          )}
        </MenuItem>
      ))}
    </Select>
  );
}

export default VideoSupportFilter;
