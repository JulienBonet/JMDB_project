/* eslint-disable react/prop-types */
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

function AlphabeticBtn({ onClick, origin, selectedItems }) {
  const expanded = selectedItems !== '';

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
          '& svg': {
            color: 'var(--color-01)',
            transition: 'color 0.3s ease, transform 0.3s ease',
          },
          '&:hover svg': {
            color: 'var(--color-06)',
          },
          '&:active svg': {
            color: 'var(--color-02)',
            transform: 'rotate(20deg)',
          },
          '&:disabled svg': {
            color: 'var(--color-04)',
          },
          '@media (min-width: 1440px) and (max-width: 1902px)': {
            width: '20%',
          },
          '@media (min-width: 1280px) and (max-width: 1439px)': {
            width: '25%',
          },
          '@media (min-width: 1024px) and (max-width: 1279px)': {
            width: '25%',
            ...(origin === 'artists' && { fontSize: 'x-small' }),
          },
          '@media (min-width: 768px) and (max-width: 1023px)': {
            ...(origin !== 'artists' && {
              width: '30%',
              fontSize: 'small',
            }),
          },
        }}
      >
        <SortByAlphaIcon
          sx={{
            fontSize: '1.8rem',
            color: expanded ? '#242105' : 'gray',
          }}
        />{' '}
      </Button>{' '}
    </ThemeProvider>
  );
}

export default AlphabeticBtn;
