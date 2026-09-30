export const labelSx = {
  fontFamily: 'var(--font-05)',
  color: 'var(--color-02)',
  fontSize: 'medium',
  flexShrink: 0,
};

export const infoSx = {
  fontFamily: 'var(--font-06)',
  color: 'var(--color-01)',
  fontSize: 'medium',
};

export const inputSx = {
  '& .MuiInputBase-input': {
    color: 'var(--color-01)',
  },

  // État normal
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-01)',
  },

  // Hover
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-06)',
  },

  // Focus
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-06)',
  },
};

export const pitchDisplaySx = {
  fontFamily: 'var(--font-06)',
  fontSize: 'medium',
  color: 'var(--color-01)',
  border: 'solid var(--color-01) 1px',
  padding: '10px',
  borderRadius: '10px',
};

export const validateIconSx = (isBusy) => ({
  p: 1,
  border: '1px solid',
  borderRadius: '10px',
  cursor: isBusy ? 'default' : 'pointer',
  color: 'greenyellow',
  opacity: isBusy ? 0.6 : 1,
  pointerEvents: isBusy ? 'none' : 'auto',
});

export const undoIconSx = {
  p: 1,
  border: '1px solid',
  borderRadius: '10px',
  cursor: 'pointer',
  color: 'rgb(255, 89, 0)',
};
