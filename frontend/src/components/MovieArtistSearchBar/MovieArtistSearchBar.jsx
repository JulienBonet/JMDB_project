/* eslint-disable react/prop-types */
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ToggleSortedButton from '../ToggleSortedBtn/ToggleSortedButton';

function MovieArtistSearchBar({
  placeholder,
  search,
  onSearchChange,
  openSideBar,
  setOpenSideBar,
  selectedItem,
}) {
  return (
    <Box
      component="section"
      id="MovieArtist_Header"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        py: 2,
        gap: 2,
        height: '3rem',
      }}
    >
      <Box
        id="MovieArtist_SearchBar"
        sx={{
          width: {
            xs: '70%',
            sm: '60%',
            md: '450px',
          },
          maxWidth: '450px',
        }}
      >
        <TextField
          value={search}
          onChange={onSearchChange}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#aaa' }} />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={() => onSearchChange({ target: { value: '' } })} size="small">
                  <ClearIcon sx={{ color: '#888' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: '#f5f5f5',
              '& fieldset': { borderColor: '#ccc' },
              '&:hover fieldset': { borderColor: 'var(--color-02)' },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--color-02)',
                boxShadow: '0 0 8px rgba(0,0,0,0.1)',
              },
            },
            input: {
              color: '#333',
              '&::placeholder': { color: '#aaa', opacity: 1 },
            },
          }}
        />
      </Box>

      <ToggleSortedButton active={!!selectedItem} onClick={() => setOpenSideBar(!openSideBar)} />
    </Box>
  );
}

export default MovieArtistSearchBar;
