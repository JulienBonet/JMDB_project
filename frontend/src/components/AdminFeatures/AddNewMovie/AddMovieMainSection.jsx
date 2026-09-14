import { Box, Button, FormControlLabel, IconButton, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Switch from '@mui/material/Switch';

import TvSeasonEpisodeFields from './TvSeasonEpisodeFields';

function AddMovieMainSection({
  movie,
  setMovie,
  handleInputChange,
  handleOpenModalMIE,
  resetStates,
  handleChangeMovieDb,
  handleOpenModal,
  getSelectedNames,
  seasonsInfo,
  tvSeasons,
  nbTvEpisodes,
  selectedSeasons,
  setTvSeasons,
  setNbTvEpisodes,
  setSelectedSeasons,
  handleFormSubmit,
  selectedKinds,
  selectedDirectors,
  selectedScreenwriters,
  selectedMusic,
  selectedCasting,
  selectedStudios,
  selectedCountries,
  selectedLanguages,
  selectedTags,
  selectedFocus,
}) {
  return (
    <section className="Adm_l1">
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

      <div className="Adm_l1b">
        {/* movie idTheMovieDb */}
        <Box
          component="form"
          sx={{ width: '30%' }}
          noValidate
          autoComplete="off"
          display="flex"
          gap={2}
          p={2}
        >
          <TextField
            id="filled-basic"
            label="Id MovieDb"
            variant="outlined"
            placeholder="movie/12345 ou tv/12345"
            sx={{ flexGrow: 1 }}
            value={movie.idTheMovieDb}
            onChange={handleChangeMovieDb}
          />
        </Box>

        {/* movie KINDS */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Genre(s)"
              value={getSelectedNames(selectedKinds)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('kinds')}
          />
        </div>

        {/* movie DIRECTOR */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label={movie.isTvShow ? 'Créateur(s)' : 'Réalisateur(s)'}
              value={getSelectedNames(selectedDirectors)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('directors')}
          />
        </div>

        {/* movie SCREENWRITERS */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Scénariste(s)"
              value={getSelectedNames(selectedScreenwriters)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('screenwriters')}
          />
        </div>

        {/* movie COMPOSITOR */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Compositeur(s)"
              value={getSelectedNames(selectedMusic)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('music')}
          />
        </div>

        {/* movie CASTING */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Casting"
              value={getSelectedNames(selectedCasting)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('casting')}
          />
        </div>

        {/* movie STUDIO */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Studio"
              value={getSelectedNames(selectedStudios)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('studio')}
          />
        </div>

        {/* movie COUNTRY */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Pays"
              value={getSelectedNames(selectedCountries)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('country')}
          />
        </div>

        {/* movie LANGUAGES */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Langues"
              value={getSelectedNames(selectedLanguages)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('languages/sorted_id')}
          />
        </div>

        {/* movie TAG */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Tags"
              value={getSelectedNames(selectedTags)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('tags/sorted_id')}
          />
        </div>

        {/* movie FOCUS */}
        <div className="adm-l1_item">
          <Box
            component="form"
            sx={{ flexGrow: 1 }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
          >
            <TextField
              id="outlined-read-only-input"
              label="Focus"
              value={getSelectedNames(selectedFocus)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp"
            onClick={() => handleOpenModal('focus')}
          />
        </div>
      </div>
    </section>
  );
}

export default AddMovieMainSection;
