/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function ChronologicBtn({ onClick, origin, selectedItems }) {
  const expanded = selectedItems !== '';
  const isArtist = origin === 'artists';

  const theme = createTheme({
    palette: {
      sortedBtn: {
        main: '#ffebcd',
        light: '#ffa500',
        dark: '#e59100',
        contrastText: '#242105',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="sortedBtn"
        onClick={onClick}
        disabled={!expanded}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',

          ...(isArtist && {
            width: '15%',
            lineHeight: 0,
          }),

          '& svg': {
            color: 'var(--color-01)',
            transition: 'color 0.3s ease, transform 0.3s ease',
          },

          '&:hover svg': {
            color: 'var(--color-06)',
          },

          '&:active svg': {
            color: 'var(--color-02)',
            transform: 'rotate(-20deg)',
          },

          '&:disabled svg': {
            color: 'gray',
          },
        }}
      >
        <AccessTimeFilledIcon />
      </Button>
    </ThemeProvider>
  );
}

export default ChronologicBtn;
