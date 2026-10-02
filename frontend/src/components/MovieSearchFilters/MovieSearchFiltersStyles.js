export const filterSelectSx = {
  height: '40px',
  textAlign: 'center',
  fontFamily: 'var(--font-02)',
  color: 'var(--color-02)',
  backgroundColor: 'var(--color-04)',
  border: '1px solid white',
  width: 'auto',
  fontSize: 'medium',
  fontWeight: 'bold',
  borderRadius: '10px',
  cursor: 'pointer',
  '& .MuiSelect-select': {
    paddingY: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiSelect-icon': { color: 'var(--color-02)' },
  '& fieldset': { border: 'none' },
};

export const filterMenuProps = {
  PaperProps: {
    sx: {
      backgroundColor: 'var(--color-04)',
      color: 'var(--color-01)',
      fontFamily: 'var(--font-02)',
      border: '1px solid white',
      '& .MuiMenuItem-root': {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },
      '& .MuiMenuItem-root:hover': {
        backgroundColor: '#ffa500',
        color: '#242105',
      },
    },
  },
};
