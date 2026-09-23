import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function AdminSearchField({ value, onChange, placeholder }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={() => onChange('')} size="small">
              <ClearIcon sx={{ color: '#888' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          backgroundColor: '#f5f5f5',
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: 'var(--color-03)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--color-03)',
            boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          },
        },
        input: {
          color: '#333',
          '&::placeholder': {
            color: '#aaa',
            opacity: 1,
          },
        },
      }}
    />
  );
}

export default AdminSearchField;
