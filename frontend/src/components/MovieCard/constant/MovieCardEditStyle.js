export const textFieldSx = {
  width: '80%',
  '& .MuiInputLabel-root': { color: 'white' },
  '& .MuiInputBase-input': { color: 'white' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'white' },
    '&:hover fieldset': { borderColor: 'orange' },
    '&.Mui-focused fieldset': { borderColor: 'cyan' },
  },
};

export const editContainerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyConten: 'flex-start',
  gap: 2,
};

export const movieInfoMovieCardviewSx = {
  fontFamily: 'var(--font-06)',
  fontSize: '0.9rem',
  color: 'var(--color-01)',
};

export const spanInfoMovieCardviewSx = { fontWeight: 'bold' };

export const addIconSx = {
  cursor: 'pointer',
  color: 'whitesmoke',
  '&:hover': {
    transform: 'rotate(-15deg) scale(1.3)',
  },
};

export const refreshIconSx = {
  cursor: 'pointer',
  color: 'var(--color-02)',
  '&:hover': {
    transform: 'rotate(-15deg) scale(1.3)',
    animation: 'bounce 0.5s ease-in-out',
  },
};

export const dividerSx = {
  backgroundColor: 'whitesmoke',
  width: '100%',
  height: '1px',
};

export const dividerDashedSx = {
  width: '100%',
  borderTop: '1px dashed whitesmoke',
  my: 0.5,
};
