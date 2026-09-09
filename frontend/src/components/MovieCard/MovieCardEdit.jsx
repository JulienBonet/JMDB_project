import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import TvShowFields from './TvShowFields';

const MovieCardEdit = ({
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
  refetchDuration,
  selectedSeasons,
  setSelectedSeasons,
  seasonsInfo,
  tvSeasons,
  setTvSeasons,
  nbTvEpisodes,
  setNbTvEpisodes,
}) => {
  return (
    <div className="infos_bloc_1_modify">
      {/* Line ICO type + general Refresh button (modify) */}
      <div className="movieCard_Type_Line">
        {/* ICO movie or tvShow type (modify) */}
        {!isTvShow ? (
          <MovieOutlinedIcon sx={{ color: 'white', mr: 1 }} fontSize="large" />
        ) : (
          <TvOutlinedIcon sx={{ color: 'white' }} fontSize="large" />
        )}
        {/* ENd ICO movie or tvShow type (modify) */}

        {/* Bouton TMDB synchro général (modify) */}
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
            onClick={() => {
              const confirmReload = window.confirm(
                '⚠️ Êtes-vous sûr de vouloir recharger les informations du film ?\nLes données actuelles seront remplacées.'
              );

              if (confirmReload) {
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
              }
            }}
          >
            <CloudSyncIcon sx={{ mr: 1 }} /> Recharger les infos
          </Button>
        )}
        {/* END Bouton TMDB synchro général (modify) */}
      </div>

      {/* ENd Line ICO type + general Refresh button (modify) */}
      <div className="divider divider_movie_cover_modify_button2" />

      {/* Title (modify) */}
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
      {/* END Title (modify) */}

      <div className="divider" />

      {/* focus (modify) */}
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

      {/* END focus (modify) */}

      {/* Alt Title (modify) */}
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
      {/* END Alt Title (modify) */}

      {/* Genre(s) (modify) */}
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
      {/* END Genre(s) (modify) */}

      {/* Year (modify) */}
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
      {/* END Year (modify) */}

      {/* TV saison - episode /+/ duration (modify) */}
      {isTvShow ? (
        <TvShowFields
          selectedSeasons={selectedSeasons}
          setSelectedSeasons={setSelectedSeasons}
          seasonsInfo={seasonsInfo}
          tvSeasons={tvSeasons}
          setTvSeasons={setTvSeasons}
          nbTvEpisodes={nbTvEpisodes}
          setNbTvEpisodes={setNbTvEpisodes}
          movieData={movieData}
          setMovieData={setMovieData}
          textFieldSx={textFieldSx}
        />
      ) : (
        <div className="box_item_form">
          <TextField
            label="Durée (minutes)"
            name="duration"
            value={safeValue(movieData.duration)}
            onChange={(e) =>
              setMovieData((prev) => ({
                ...prev,
                duration: e.target.value,
              }))
            }
            fullWidth
            type="number"
            sx={textFieldSx}
          />

          {idTheMovieDb && (
            <CloudSyncIcon
              className="Btn_Refresh_items_MovieCard"
              onClick={() =>
                refetchDuration(idTheMovieDb, {
                  movieData,
                  setMovieData,
                })
              }
            />
          )}
        </div>
      )}
      {/* END TV saison - episode /+/ duration */}
    </div>
  );
};

export default MovieCardEdit;
