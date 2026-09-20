// frontend/src/components/MovieCard/MovieCardEdit02.jsx
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
// component
import MovieCardRelationsSection from './MovieCardRelationsSection';
import MovieCardMediaSection from './MovieCardMediaSection';

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
    <div className="MC_line2_modify">
      <div className="divider" />

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

      <div className="divider" />

      {/* Résumé (modify) */}
      <div className="box_item_form">
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
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchStory(idTheMovieDb, {
                movieData,
                setMovieData,
              })
            }
          />
        )}
      </div>
      {/* end Résumé (modify) */}

      <div className="divider" />

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

      <div className="divider" />

      {/* trailer (modify) */}
      <div className="box_item_form">
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
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchTrailer(idTheMovieDb, {
                setMovieData,
                setTrailerMessage,
              })
            }
          />
        )}
      </div>

      {trailerMessage && (
        <Alert severity="info" sx={{ mt: 1, width: '50%' }}>
          {trailerMessage}
        </Alert>
      )}
      {/* end trailer (modify) */}

      <div className="divider" />

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

      <div className="divider" />

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
    </div>
  );
};

export default MovieCardEdit02;
