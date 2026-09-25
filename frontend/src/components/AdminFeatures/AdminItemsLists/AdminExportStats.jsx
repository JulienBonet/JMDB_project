import {
  Button,
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Hooks
import useAdminStats from '../../../hooks/useAdminStats';
import useAdminExportCsv from '../../../hooks/useAdminExportCsv';

function AdminExportStats() {
  const { stats, loading } = useAdminStats();

  // --------------
  // STATS & EXPORT CSV
  // --------------
  const { isExportingCsv, handleExportCsv } = useAdminExportCsv();

  if (loading) {
    return <p>Chargement des stats...</p>;
  }

  // --------------
  // SX
  // --------------
  const buttonSx = (bgColor, hoverColor) => ({
    backgroundColor: bgColor,
    color: '#fff',
    fontWeight: 400,
    fontFamily: 'var(--font-01)',
    '&:hover': {
      backgroundColor: hoverColor,
    },
    '& .MuiCircularProgress-root': {
      color: '#fff',
    },
    padding: '8px 24px',
    borderRadius: 2,
    textTransform: 'none',
  });

  const infoStatsSX = () => ({
    fontSize: {
      xs: '1rem',
      sm: '1.1rem',
      md: '1.25rem',
      lg: 'x-large',
    },
    fontFamily: 'var(--font-02)',
    color: 'var(--color-05)',
    marginBottom: '0.5rem',
  });

  const spanInfoStatsSX = () => ({
    fontWeight: 'bold',
  });

  const accordionSX = () => ({
    backgroundColor: 'aliceblue',
    border: 'solid 1px var(--color-04)',
    borderRadius: '10px',
  });

  // --------------
  // RETURN
  // --------------
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        p: 4,
        gap: 4,
      }}
    >
      {/* STATS */}
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          border: '1px solid black',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'var(--font-01)',
            textAlign: 'center',
            fontSize: {
              xs: '1.5rem',
              md: '2rem',
            },
          }}
        >
          Statistiques générales
        </Typography>

        {/* Accordions */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            py: 4,
          }}
        >
          {/* INFOS FILMS */}
          <Accordion sx={accordionSX}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Total films:
                </Box>{' '}
                {stats.totalMovies}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Fichier multimedia:
                </Box>{' '}
                {stats.totalMediaFiles}
              </Typography>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  DVD original:
                </Box>{' '}
                {stats.totalDVDOriginal}
              </Typography>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  DVD R/RW:
                </Box>{' '}
                {stats.totalDVDRRW}
              </Typography>
              {/* dashed bar */}
              <Box
                sx={{
                  borderBottom: '1px dashed',
                  borderColor: 'var(--color-05)',
                  my: 2,
                }}
              />
              {/* end dashed bar */}
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Total poids fichiers:
                </Box>{' '}
                {Number(stats.totalSizeTB || 0).toFixed(2)} To
              </Typography>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Total durée (H):
                </Box>{' '}
                {stats.totalDurationHours} heures
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* END INFOS FILMS */}

          {/* INFOS GENRES */}
          <Accordion sx={accordionSX}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Total genres:
                </Box>{' '}
                {stats.totalGenres}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {stats.genresByCount.map((g) => (
                <Typography key={g.name} sx={infoStatsSX()}>
                  <Box component="span" sx={spanInfoStatsSX()}>
                    {g.name}:
                  </Box>{' '}
                  {g.movieCount} films
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          {/* END INFOS GENRES */}

          {/* INFOS FOCUS */}
          <Accordion sx={accordionSX}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={infoStatsSX()}>
                <Box component="span" sx={spanInfoStatsSX()}>
                  Total focus:
                </Box>{' '}
                {stats?.totalFocus || 0}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {stats?.focusByCategory?.length > 0 ? (
                stats.focusByCategory.map((fc) => (
                  <Typography key={fc.categoryName} sx={infoStatsSX()}>
                    <Box component="span" sx={spanInfoStatsSX()}>
                      {fc.categoryName}:
                    </Box>{' '}
                    {fc.focusCount}
                  </Typography>
                ))
              ) : (
                <Typography sx={infoStatsSX()}>Aucun focus disponible</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
        {/* END INFOS FOCUS */}

        {/* INFOS ARTISTS */}
        <Box
          sx={{
            mb: 4,
            border: '1px solid black',
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography sx={infoStatsSX()}>
            <Box component="span" sx={spanInfoStatsSX()}>
              Total réalisateurs:
            </Box>{' '}
            {stats.totalDirectors}
          </Typography>
          <Typography sx={infoStatsSX()}>
            <Box component="span" sx={spanInfoStatsSX()}>
              Total scénaristes:
            </Box>{' '}
            {stats.totalScreenwriters}
          </Typography>
          <Typography sx={infoStatsSX()}>
            <Box component="span" sx={spanInfoStatsSX()}>
              Total compositeurs:
            </Box>{' '}
            {stats.totalComposers}
          </Typography>
          <Typography sx={infoStatsSX()}>
            <Box component="span" sx={spanInfoStatsSX()}>
              Total studios:
            </Box>{' '}
            {stats.totalStudios}
          </Typography>
          <Typography sx={infoStatsSX()}>
            <Box component="span" sx={spanInfoStatsSX()}>
              Total tags:
            </Box>{' '}
            {stats.totalTags}
          </Typography>
        </Box>
      </Box>
      {/* END INFOS ARTISTS */}

      {/* EXPORT BUTTONS */}
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '80%',
          border: '1px solid black',
          borderRadius: 2,
          p: 2,
        }}
      >
        <Stack direction="column" spacing={3}>
          {/* BOUTON EXPORT CSV */}
          <Button
            sx={{
              ...buttonSx('#1976d2', '#115293'),
              color: '#fff',
              '&.Mui-disabled': {
                color: '#fff',
                backgroundColor: '#1976d2',
              },
            }}
            onClick={handleExportCsv}
            disabled={isExportingCsv}
            startIcon={
              isExportingCsv ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : null
            }
          >
            {isExportingCsv ? 'Export CSV en cours...' : 'Exporter CSV'}
          </Button>
        </Stack>
      </Box>
      {/* END EXPORT BUTTONS */}
    </Box>
  );
}

export default AdminExportStats;
