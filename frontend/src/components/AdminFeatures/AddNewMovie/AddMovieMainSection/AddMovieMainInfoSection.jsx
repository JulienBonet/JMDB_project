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
  return (
    <div className="Adm_l1a">
      {/* Control Admin Buttons */}
      <div className="SourceResearchItems">
        {/* recherche BTN */}
        <Button
          variant="contained"
          size="large"
          onClick={handleOpenModalMIE}
          sx={{ flexGrow: 0.5 }}
        >
          RECHERCHE
        </Button>

        <div className="SourceResearchItems_2">
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
        </div>
      </div>

      {/* movie TITLE */}
      <Box
        component="form"
        sx={{ '& > :not(style)': { width: '150ch' } }}
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
        sx={{ '& > :not(style)': { width: '100ch' } }}
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
        sx={{ flexGrow: 1 }}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        gap={2}
        p={2}
      >
        <div
          className={
            movie.isTvShow ? 'year_duration_Btn_AddNewtvShow' : 'year_duration_Btn_AddNewMovie'
          }
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
        </div>
      </Box>

      {/* movie PITCH */}
      <Box
        component="form"
        sx={{ '& > :not(style)': { width: '100ch' } }}
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
        sx={{ '& > :not(style)': { width: '100ch' } }}
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
        sx={{ '& > :not(style)': { width: '100ch' } }}
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
        sx={{ '& > :not(style)': { width: '100ch' } }}
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
    </div>
  );
}

export default AddMovieMainInfoSection;
