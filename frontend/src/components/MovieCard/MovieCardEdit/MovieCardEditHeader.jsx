import { Button, Box, TextField } from '@mui/material';

import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
    <div className="infos_bloc_1_modify">
      {/* Type + TMDB */}
      <div className="movieCard_Type_Line">
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
      </div>

      <div className="divider divider_movie_cover_modify_button2" />

      {/* Title */}
      <div className="box_item_form">
        <TextField
          label="Title"
          name="title"
          value={safeValue(movieData.title)}
          onChange={(e) => handleChange(e)}
          fullWidth
          sx={textFieldSx}
        />
      </div>

      <div className="divider" />

      {/* Focus */}
      <div className="box_item_form">
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

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('focus')}
        />
      </div>

      <div className="divider" />

      {/* Alt Title */}
      <div className="box_item_form">
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
            className="Btn_Refresh_items_MovieCard"
            onClick={() => refetchAltTitle(idTheMovieDb, { movieData, setMovieData })}
          />
        )}
      </div>

      {/*  */}
      <div className="box_item_form">
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

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('kinds')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchGenres(idTheMovieDb, {
                searchGenreInDatabase,
                createGenreInDatabase,
                setSelectedKinds,
              })
            }
          />
        )}
      </div>

      {/* Year */}
      <div className="box_item_form">
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
            className="Btn_Refresh_items_MovieCard"
            onClick={() => refetchYear(idTheMovieDb, { movieData, setMovieData })}
          />
        )}
      </div>
    </div>
  );
}

export default MovieCardEditHeader;
