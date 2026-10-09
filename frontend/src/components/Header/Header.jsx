import { useNavigate } from 'react-router-dom';
import { Box, Button, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoJmdb from '../../assets/ico/logo_jmdb.png';
import NavBar from './NavBar/NavBar';
import NavBarBurger from './NavBarBurger/NavBarBurger';

function Header() {
  const navigate = useNavigate();

  const isDesktop = useMediaQuery('(min-width:1280px)');

  const handleClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const theme = createTheme({
    palette: {
      JmdbColorNav: {
        main: '#ffebcd',
        light: '#ffc45e',
        dark: '#e59100',
        contrastText: '#242105',
      },
    },
  });

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--color-05)',
        borderBottom: '1px solid var(--color-02)',
        p: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: '1rem',
        }}
      >
        <Box
          component="img"
          src={LogoJmdb}
          alt="Logo - Home"
          onClick={handleClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleClick();
            }
          }}
          role="button"
          tabIndex={0}
          sx={{
            width: '90px',
            cursor: 'pointer',
          }}
        />
      </Box>

      {isDesktop ? (
        <>
          <NavBar />

          <Box>
            <ThemeProvider theme={theme}>
              <Button color="JmdbColorNav" startIcon={<LogoutIcon />} onClick={handleLogout} />
            </ThemeProvider>
          </Box>
        </>
      ) : (
        <NavBarBurger />
      )}
    </Box>
  );
}

export default Header;
