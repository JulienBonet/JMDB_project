import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '25px',
        backgroundColor: 'var(--color-05)',
        borderTop: '1px solid var(--color-02)',
      }}
    />
  );
}

export default Footer;
