import { Box, TextField, Alert, Checkbox } from '@mui/material';
//icons
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
// component
import MovieCardRelationsSection from './MovieCardRelationsSection';
import MovieCardMediaSection from './MovieCardMediaSection';
// SX
import { editContainerSx, refreshIconSx, dividerSx } from '../constant/MovieCardEditStyle';

const MovieCardEdit02 = ({
  isTvShow,
  idTheMovieDb,
  movieData,
  setMovieData,
  safeValue,
  handleChange,
  textFieldSx,

  selectedCountries,
  selectedDirectors,
  selectedScreenwriters,
  selectedMusic,
  selectedStudios,
  selectedCasting,
  selectedTags,

  getSelectedNames,
  handleOpenModal,

  searchCountryInDatabase,
  createCountryInDatabase,
  setSelectedCountries,

  searchDirectorInDatabase,
  createDirectorInDatabase,
  setSelectedDirectors,

  searchScreenwriterInDatabase,
  createScreenwriterInDatabase,
  setSelectedScreenwriters,

  searchCompositorInDatabase,
  createCompositorInDatabase,
  setSelectedMusic,

  searchStudioInDatabase,
  createStudioInDatabase,
  setSelectedStudios,

  searchCastingInDatabase,
  createCastingInDatabase,
  setSelectedCasting,

  searchTagInDatabase,
  createTagInDatabase,
  setSelectedTags,

  refetchCountries,
  refetchDirectors,
  refetchScreenwriters,
  refetchCompositors,
  refetchStudios,
  refetchCasting,
  refetchTags,
  refetchStory,
  refetchTrailer,

  handleFormatSupportChange,

  fileInputRef,
  handleFolderChange,
  selectedFile,
  handleFileChange,

  version,
  handleVersionChange,

  trailerMessage,
  setTrailerMessage,

  allowEdit,
  setAllowEdit,
}) => {
  return (
    <Box
      id="MovieCardEdit02"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        gap: 2,
      }}
    >
      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Pays (modify)\|Réalisateur (modify)\|Scénariste (modify)\|Compositeur (modify)\
      |Studio (modify)\|Casting (modify)\|Tags (modify) */}
      <MovieCardRelationsSection
        isTvShow={isTvShow}
        idTheMovieDb={idTheMovieDb}
        textFieldSx={textFieldSx}
        selectedCountries={selectedCountries}
        selectedDirectors={selectedDirectors}
        selectedScreenwriters={selectedScreenwriters}
        selectedMusic={selectedMusic}
        selectedStudios={selectedStudios}
        selectedCasting={selectedCasting}
        selectedTags={selectedTags}
        getSelectedNames={getSelectedNames}
        handleOpenModal={handleOpenModal}
        searchCountryInDatabase={searchCountryInDatabase}
        createCountryInDatabase={createCountryInDatabase}
        setSelectedCountries={setSelectedCountries}
        searchDirectorInDatabase={searchDirectorInDatabase}
        createDirectorInDatabase={createDirectorInDatabase}
        setSelectedDirectors={setSelectedDirectors}
        searchScreenwriterInDatabase={searchScreenwriterInDatabase}
        createScreenwriterInDatabase={createScreenwriterInDatabase}
        setSelectedScreenwriters={setSelectedScreenwriters}
        setSelectedMusic={setSelectedMusic}
        searchCompositorInDatabase={searchCompositorInDatabase}
        createCompositorInDatabase={createCompositorInDatabase}
        searchStudioInDatabase={searchStudioInDatabase}
        createStudioInDatabase={createStudioInDatabase}
        setSelectedStudios={setSelectedStudios}
        searchCastingInDatabase={searchCastingInDatabase}
        createCastingInDatabase={createCastingInDatabase}
        setSelectedCasting={setSelectedCasting}
        searchTagInDatabase={searchTagInDatabase}
        createTagInDatabase={createTagInDatabase}
        setSelectedTags={setSelectedTags}
        refetchCountries={refetchCountries}
        refetchDirectors={refetchDirectors}
        refetchScreenwriters={refetchScreenwriters}
        refetchCompositors={refetchCompositors}
        refetchStudios={refetchStudios}
        refetchCasting={refetchCasting}
        refetchTags={refetchTags}
      />
      {/* END Pays (modify)\|Réalisateur (modify)\|Scénariste (modify)\|Compositeur (modify)\
      |Studio (modify)\|Casting (modify)\|Tags (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Résumé (modify) */}
      <Box id="story_container_MovieCardEdit" sx={editContainerSx}>
        <TextField
          label="Résumé"
          name="story"
          value={safeValue(movieData.story)}
          onChange={(e) => handleChange(e)}
          multiline
          fullWidth
          sx={textFieldSx}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            sx={refreshIconSx}
            onClick={() =>
              refetchStory(idTheMovieDb, {
                movieData,
                setMovieData,
              })
            }
          />
        )}
      </Box>
      {/* end Résumé (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Support (modify) */}
      <MovieCardMediaSection
        isTvShow={isTvShow}
        movieData={movieData}
        setMovieData={setMovieData}
        safeValue={safeValue}
        handleChange={handleChange}
        textFieldSx={textFieldSx}
        handleFormatSupportChange={handleFormatSupportChange}
        fileInputRef={fileInputRef}
        handleFolderChange={handleFolderChange}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        version={version}
        handleVersionChange={handleVersionChange}
      />
      {/* end Support (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* trailer (modify) */}
      <Box id="trailer_container_MovieCardEdit" sx={editContainerSx}>
        <TextField
          label="trailer"
          name="trailer"
          value={safeValue(movieData.trailer)}
          onChange={handleChange}
          fullWidth
          sx={textFieldSx}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            sx={refreshIconSx}
            onClick={() =>
              refetchTrailer(idTheMovieDb, {
                setMovieData,
                setTrailerMessage,
              })
            }
          />
        )}
      </Box>

      {trailerMessage && (
        <Alert severity="info" sx={{ mt: 1, width: '50%' }}>
          {trailerMessage}
        </Alert>
      )}
      {/* end trailer (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Commentaire (modify) */}
      <TextField
        label="Commentaire"
        name="comment"
        value={safeValue(movieData.comment)}
        onChange={(e) => handleChange(e)}
        multiline
        fullWidth
        sx={textFieldSx}
      />
      {/* end Commentaire (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* IMDB ID (modify) */}
      {movieData.idTheMovieDb ? (
        <div>
          <TextField
            label="id IMDB"
            name="idTheMovieDb"
            value={movieData.idTheMovieDb}
            onChange={handleChange}
            placeholder="Ex: tt0111161"
            fullWidth
            sx={textFieldSx}
            disabled={!allowEdit}
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
                checked={allowEdit}
                onChange={(e) => setAllowEdit(e.target.checked)}
              />
            }
            label="Autoriser la saisie manuelle de l'ID IMDb"
            sx={{ color: 'white' }}
          />
        </div>
      ) : (
        <TextField
          label="id IMDB"
          name="idTheMovieDb"
          placeholder="movie/9255 or tv/90228"
          value={movieData.idTheMovieDb}
          onChange={handleChange}
          fullWidth
          sx={textFieldSx}
        />
      )}
      {/* IMDB ID (modify) */}
    </Box>
  );
};

export default MovieCardEdit02;
