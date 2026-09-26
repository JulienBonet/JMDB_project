// -----------------------------
// COLUMN 1 - MAIN SECTION FORM
// -----------------------------

import { Box, Button, FormControlLabel, IconButton, TextField } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Switch from '@mui/material/Switch';

import TvSeasonEpisodeFields from './TvSeasonEpisodeFields';

function AddMovieMainInfoSection({
  movie,
  setMovie,
  handleInputChange,
  handleOpenModalMIE,
  resetStates,
  seasonsInfo,
  tvSeasons,
  nbTvEpisodes,
  selectedSeasons,
  setTvSeasons,
  setNbTvEpisodes,
  setSelectedSeasons,
  handleFormSubmit,
}) {
  const itemMainInfosSX = { '& > :not(style)': { width: '150ch' } };

  return (
    <Box
      id="AdM_Main_column_1"
      sx={{
        width: {
          xs: '95%',
          lg: '40%',
        },
        p: 2,
      }}
    >
      {/* Control Admin Buttons */}
      <Box
        id="AdM_SourceResearchItems"
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {/* recherche BTN */}
        <Button
          variant="contained"
          size="large"
          onClick={handleOpenModalMIE}
          sx={{ flexGrow: 0.5 }}
        >
          RECHERCHE
        </Button>

        <Box
          id="AdM_SourceResearchItems"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            borderRadius: 2,
            px: 1,
            gap: 2,
          }}
        >
          {/* isTvShow Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={movie.isTvShow}
                onChange={(event) => {
                  const isChecked = event.target.checked;
                  resetStates(isChecked);
                }}
              />
            }
            label="Série TV"
          />

          {/* reset field button */}
          <IconButton
            onClick={() => resetStates()}
            sx={{
              color: '#ff9900',
              '&:hover': {
                color: '#00d9c0',
                backgroundColor: 'rgba(255, 170, 0, 0.1)',
              },
              border: 'solid 1px grey',
              alignSelf: 'flex-end',
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Box>
      </Box>

      {/* movie TITLE */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <TextField
          name="title"
          value={movie.title}
          onChange={handleInputChange}
          id="filled-basic"
          label="Titre du film"
          variant="outlined"
        />
      </Box>

      {/* movie alt TITLE */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <TextField
          name="altTitle"
          sx={{ flexGrow: 1 }}
          value={movie.altTitle}
          onChange={handleInputChange}
          id="filled-basic"
          label="Titre alternatif"
          variant="outlined"
        />
      </Box>

      {/* movie YEAR - DURATION */}
      <Box
        component="form"
        id="AdM_Year_Duration"
        sx={{ flexGrow: 1 }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
      >
        <Box
          id="AdM_Movie_toggle_TvShow"
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {/* movie year */}
          <TextField
            name="year"
            value={movie.year}
            onChange={handleInputChange}
            label="Année"
            variant="outlined"
            sx={{ flexGrow: 1 }}
          />

          {/* movie duration */}
          {!movie.isTvShow && (
            <TextField
              name="duration"
              value={movie.duration}
              onChange={handleInputChange}
              label="Durée"
              variant="outlined"
              sx={{ flexGrow: 1 }}
            />
          )}

          {/* TV season / episode / duration */}
          {movie.isTvShow && (
            <TvSeasonEpisodeFields
              seasonsInfo={seasonsInfo}
              movie={movie}
              tvSeasons={tvSeasons}
              nbTvEpisodes={nbTvEpisodes}
              selectedSeasons={selectedSeasons}
              setMovie={setMovie}
              setTvSeasons={setTvSeasons}
              setNbTvEpisodes={setNbTvEpisodes}
              setSelectedSeasons={setSelectedSeasons}
            />
          )}
        </Box>
      </Box>

      {/* movie PITCH */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <TextField
          name="pitch"
          value={movie.pitch}
          onChange={handleInputChange}
          id="filled-basic"
          label="pitch"
          variant="outlined"
        />
      </Box>

      {/* movie STORY */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <TextField
          name="story"
          value={movie.story}
          onChange={handleInputChange}
          id="outlined-multiline-static"
          label="story"
          multiline
          rows={4}
        />
      </Box>

      {/* movie TRAILER */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <TextField
          name="trailer"
          value={movie.trailer}
          onChange={handleInputChange}
          id="filled-basic"
          label="trailer"
          variant="outlined"
        />
      </Box>

      {/* movie COMMENTAIRE */}
      <Box
        component="form"
        sx={itemMainInfosSX}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        onSubmit={handleFormSubmit}
      >
        <TextField
          name="comment"
          value={movie.comment}
          onChange={handleInputChange}
          id="outlined-multiline-static"
          label="Commentaire"
          multiline
          rows={4}
        />
      </Box>
    </Box>
  );
}

export default AddMovieMainInfoSection;
