import { Button, Box, TextField } from '@mui/material';
// icons
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// SX
import {
  editContainerSx,
  addIconSx,
  refreshIconSx,
  dividerSx,
} from '../constant/MovieCardEditStyle';

function MovieCardEditHeader({
  isTvShow,
  idTheMovieDb,
  movieData,
  setMovieData,
  safeValue,
  handleChange,
  textFieldSx,
  selectedFocus,
  selectedKinds,
  handleOpenModal,
  getSelectedNames,
  refetchMovieTMDB,
  searchGenreInDatabase,
  createGenreInDatabase,
  setSelectedKinds,
  searchStudioInDatabase,
  createStudioInDatabase,
  setSelectedStudios,
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
  searchCastingInDatabase,
  createCastingInDatabase,
  setSelectedCasting,
  searchTagInDatabase,
  createTagInDatabase,
  setSelectedTags,
  setImage,
  setShowUploadButton,
  setShowImageButton,
  refetchAltTitle,
  refetchGenres,
  refetchYear,
}) {
  const handleSyncMovieFromTMDB = () => {
    const confirmReload = window.confirm(
      '⚠️ Êtes-vous sûr de vouloir recharger les informations du film ?\nLes données actuelles seront remplacées.'
    );

    if (!confirmReload) return;

    refetchMovieTMDB(idTheMovieDb, {
      movieData,
      setMovieData,
      searchGenreInDatabase,
      createGenreInDatabase,
      setSelectedKinds,
      searchStudioInDatabase,
      createStudioInDatabase,
      setSelectedStudios,
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
      searchCastingInDatabase,
      createCastingInDatabase,
      setSelectedCasting,
      searchTagInDatabase,
      createTagInDatabase,
      setSelectedTags,
      setImage,
      setShowUploadButton,
      setShowImageButton,
    });
  };

  return (
    <Box
      id="MovieCardEditHeader"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.3rem',
        width: '100%',
      }}
    >
      {/* Type + TMDB */}
      <Box
        id="TypeLine_MovieCardEditHeader"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {!isTvShow ? (
          <MovieOutlinedIcon sx={{ color: 'white', mr: 1 }} fontSize="large" />
        ) : (
          <TvOutlinedIcon sx={{ color: 'white' }} fontSize="large" />
        )}

        {idTheMovieDb && (
          <Button
            variant="outlined"
            sx={{
              color: 'var(--color-02)',
              borderColor: 'var(--color-02)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: 'var(--color-03)',
                color: 'var(--color-03)',
                transform: 'scale(1.02)',
              },
            }}
            onClick={handleSyncMovieFromTMDB}
          >
            <CloudSyncIcon sx={{ mr: 1 }} /> Recharger les infos
          </Button>
        )}
      </Box>
      {/* end Type + TMDB */}

      {/* divider */}
      <Box
        id="divider_MovieCardEditHeader"
        sx={{
          ...dividerSx,
          display: { xs: 'flex' },
          height: '1px',
          my: 0.5,
        }}
      />
      {/* end divider */}

      {/* Title */}
      <Box id="title_container_MovieCardEdit" sx={editContainerSx}>
        <TextField
          label="Title"
          name="title"
          value={safeValue(movieData.title)}
          onChange={(e) => handleChange(e)}
          fullWidth
          sx={textFieldSx}
        />
      </Box>
      {/* end Title */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Focus */}
      <Box id="focus_container_MovieCardEdit" sx={editContainerSx}>
        <Box
          component="form"
          sx={textFieldSx}
          noValidate
          autoComplete="off"
          display="flex"
          alignItems="center"
        >
          <TextField
            id="outlined-read-only-input"
            label="Focus"
            value={getSelectedNames(selectedFocus)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon sx={addIconSx} onClick={() => handleOpenModal('focus')} />
      </Box>
      {/* end Focus */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Alt Title */}
      <Box id="altTitle_container_MovieCardEdit" sx={editContainerSx}>
        <TextField
          label="Alt Title"
          name="altTitle"
          value={safeValue(movieData.altTitle)}
          onChange={(e) => handleChange(e)}
          fullWidth
          sx={textFieldSx}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            sx={refreshIconSx}
            onClick={() => refetchAltTitle(idTheMovieDb, { movieData, setMovieData })}
          />
        )}
      </Box>

      {/* genres */}
      <Box id="genres_container_MovieCardEdit" sx={editContainerSx}>
        <Box
          component="form"
          sx={textFieldSx}
          noValidate
          autoComplete="off"
          display="flex"
          alignItems="center"
        >
          <TextField
            id="outlined-read-only-input"
            label="Genre(s)"
            value={getSelectedNames(selectedKinds)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon sx={addIconSx} onClick={() => handleOpenModal('kinds')} />

        {idTheMovieDb && (
          <CloudSyncIcon
            sx={refreshIconSx}
            onClick={() =>
              refetchGenres(idTheMovieDb, {
                searchGenreInDatabase,
                createGenreInDatabase,
                setSelectedKinds,
              })
            }
          />
        )}
      </Box>
      {/* end genres */}

      {/* Year */}
      <Box id="year_container_MovieCardEdit" sx={editContainerSx}>
        <TextField
          label="Year"
          name="year"
          value={safeValue(movieData.year)}
          onChange={(e) => handleChange(e)}
          fullWidth
          type="number"
          sx={textFieldSx}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            sx={refreshIconSx}
            onClick={() => refetchYear(idTheMovieDb, { movieData, setMovieData })}
          />
        )}
      </Box>
      {/* end Year */}
    </Box>
  );
}

export default MovieCardEditHeader;
