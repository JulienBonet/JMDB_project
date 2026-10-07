export const thumbnailContainerSx = (homepage) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',

  width: homepage
    ? {
        xs: '13rem',
        sm: '15rem',
      }
    : {
        xs: '8rem',
        sm: '9rem',
        md: '11rem',
        lg: '13rem',
      },

  height: homepage
    ? {
        xs: '16rem',
        sm: '16rem',
      }
    : {
        xs: '14rem',
        md: '14rem',
        lg: '18rem',
      },

  gap: 2,
  m: '10px',
  mb: 2,
});

export const thumbnailCoverSX = (homepage) => ({
  height: homepage ? '12rem' : '13rem',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',

  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'brightness(1.20)',
  },
});

export const thumbnailTitleSx = {
  fontFamily: 'var(--font-02)',
  fontWeight: 'bold',
  color: 'var(--color-01)',
  textAlign: 'center',
  m: 0,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',

  '&:hover': {
    filter: 'brightness(1.20)',
  },
};
