// frontend/src/components/MovieCard/MovieCardEdit02.jsx
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
// component
import MovieCardRelationsSection from './MovieCardRelationsSection';

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
      <FormControl sx={textFieldSx}>
        <InputLabel>Support</InputLabel>

        <Select
          id="demo-select-small"
          name="videoSupport"
          value={safeValue(movieData.videoSupport)}
          label="Support"
          onChange={handleFormatSupportChange}
        >
          <MenuItem value="DVD original">DVD original</MenuItem>
          <MenuItem value="DVD R/RW">DVD R/RW</MenuItem>
          <MenuItem value="Fichier multimédia">Fichier multimédia</MenuItem>
        </Select>
      </FormControl>

      {movieData.videoSupport === 'Fichier multimédia' && (
        <>
          {isTvShow ? (
            // ----- CAS SÉRIE (dossier complet)
            <Box display="flex" alignItems="center" gap={2} p={1} sx={textFieldSx}>
              <TextField
                label="Dossier sélectionné"
                variant="outlined"
                value={safeValue(movieData.path)}
                InputProps={{ readOnly: true }}
                fullWidth
              />

              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                multiple
                onChange={handleFolderChange}
                webkitdirectory=""
              />

              <Button
                variant="outlined"
                sx={{
                  color: 'var(--color-03)',
                  borderColor: 'var(--color-03)',
                  '&:hover': {
                    color: 'var(--color-06)',
                    borderColor: 'var(--color-06)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                Sélectionner un dossier
              </Button>
            </Box>
          ) : (
            // ----- CAS FILM (fichier unique)
            <Box
              component="form"
              sx={textFieldSx}
              noValidate
              autoComplete="off"
              display="flex"
              flexDirection="column"
              gap={2}
              p={1}
            >
              <TextField
                label="Chemin du dossier"
                variant="outlined"
                value={safeValue(movieData.path)}
                onChange={(e) => {
                  const inputPath = e.target.value;

                  const cleaned = inputPath.replace(/^[A-Za-z]:[\\/]+/, '').replace(/[\\/]+$/, '');

                  setMovieData((prev) => ({
                    ...prev,
                    path: inputPath,
                    location: selectedFile ? `${cleaned}\\${selectedFile.name}` : '',
                  }));
                }}
                fullWidth
              />

              <TextField
                label="Fichier sélectionné"
                variant="outlined"
                value={selectedFile ? selectedFile.name : ''}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <Button
                variant="outlined"
                sx={{
                  color: 'var(--color-03)',
                  borderColor: 'var(--color-03)',
                  '&:hover': {
                    color: 'var(--color-06)',
                    borderColor: 'var(--color-06)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                Sélectionner un fichier vidéo
              </Button>

              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Box>
          )}

          {/* Champ commun : taille du fichier */}
          <TextField
            label="Taille du fichier"
            name="fileSize"
            value={safeValue(movieData.fileSize)}
            onChange={(e) => handleChange(e)}
            fullWidth
            type="text"
            sx={textFieldSx}
          />

          <FormControl sx={{ m: 1, color: 'white' }}>
            <FormLabel
              sx={{
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              }}
            >
              version:
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={version}
              onChange={handleVersionChange}
            >
              <FormControlLabel
                value="none"
                control={<Radio sx={{ color: 'white' }} />}
                label="none"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />

              <FormControlLabel
                value="VOSTFR"
                control={<Radio sx={{ color: 'white' }} />}
                label="VOSTFR"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />

              <FormControlLabel
                value="MULTI"
                control={<Radio sx={{ color: 'white' }} />}
                label="MULTI"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </>
      )}
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
