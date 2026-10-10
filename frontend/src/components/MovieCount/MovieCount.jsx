import { Box, Typography } from '@mui/material';

function MovieCount({ movieAmount, variant = 'default' }) {
  const isArtist = variant === 'artist';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: 'var(--font-06)',
          fontSize: {
            xs: isArtist ? 'xx-small' : 'small',
            sm: isArtist ? 'small' : 'medium',
            md: '1rem',
          },
          textAlign: 'center',
          color: 'var(--color-01)',
          lineHeight: 1,
          py: '10px',
          border: '1px solid white',
          borderTop: 0,
          borderRadius: '0 0 20px 20px',
          bgcolor: isArtist ? 'var(--color-04)' : 'transparent',
          width: {
            xs: isArtist ? '70%' : '50%',
            sm: isArtist ? '40%' : '30%',
            md: isArtist ? '30%' : '25%',
            lg: isArtist ? '25%' : '20%',
            xl: isArtist ? '20%' : '20%',
          },
        }}
      >
        NOMBRE DE FILMS :{' '}
        <Box
          component="span"
          sx={{
            color: 'var(--color-06)',
          }}
        >
          {movieAmount}
        </Box>
      </Typography>
    </Box>
  );
}

export default MovieCount;
