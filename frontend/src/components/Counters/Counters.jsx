import { Box, Typography } from '@mui/material';

const COUNTER_LABELS = {
  directors: 'réalisateurs',
  casting: 'acteurs',
  screenwriters: 'scénaristes',
  music: 'compositeurs',
  studio: 'studios',
  tags: 'tags',
};

function Counters({ countAmount, origin }) {
  const label = COUNTER_LABELS[origin];

  if (!label) return null;

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontFamily: 'var(--font-06)',
          fontSize: { xs: 'small', lg: '1rem' },
          textAlign: 'center',
          color: 'var(--color-02)',
          padding: '10px 1rem',
          border: '1px solid white',
          borderTop: 0,
          margin: 0,
        }}
      >
        <Box component="span" sx={{ color: 'var(--color-01)' }}>
          {countAmount}{' '}
        </Box>{' '}
        {label}{' '}
      </Typography>{' '}
    </Box>
  );
}

export default Counters;
