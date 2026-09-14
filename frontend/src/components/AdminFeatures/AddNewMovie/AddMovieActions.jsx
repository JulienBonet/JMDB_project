import { Backdrop, Button, CircularProgress, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function AddMovieActions({ theme, handleFormSubmit, handleReturn, isSubmitting }) {
  return (
    <section className="Adm_l3">
      {/* VALIDATION */}
      <ThemeProvider theme={theme}>
        <Stack spacing={2} direction="row">
          <Button onClick={handleFormSubmit} size="large" variant="outlined" color="validBtn">
            VALIDER
          </Button>

          <Button onClick={handleReturn} size="large" variant="outlined" color="abortBtn">
            ANNULER
          </Button>
        </Stack>
      </ThemeProvider>

      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </section>
  );
}

export default AddMovieActions;
