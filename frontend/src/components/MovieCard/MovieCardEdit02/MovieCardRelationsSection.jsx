// frontend/src/components/MovieCard/MovieCardRelationsSection.jsx
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

const MovieCardRelationsSection = ({
  isTvShow,
  idTheMovieDb,
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
}) => {
  return (
    <>
      {/* Pays (modify) */}
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
            label="Pays"
            value={getSelectedNames(selectedCountries)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('country')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchCountries(idTheMovieDb, {
                searchCountryInDatabase,
                createCountryInDatabase,
                setSelectedCountries,
              })
            }
          />
        )}
      </div>
      {/* end Pays (modify) */}

      <div className="divider" />

      {/* Réalisateur (modify) */}
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
            label={isTvShow ? 'Créateur:' : 'Réalisateur:'}
            value={getSelectedNames(selectedDirectors)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('directors')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchDirectors(idTheMovieDb, {
                searchDirectorInDatabase,
                createDirectorInDatabase,
                setSelectedDirectors,
              })
            }
          />
        )}
      </div>
      {/* end Réalisateur (modify) */}

      {/* Scénariste (modify) */}
      {!isTvShow && (
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
              label="Scénariste(s)"
              value={getSelectedNames(selectedScreenwriters)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Box>

          <AddCircleOutlineIcon
            className="Btn_Add_itemsPopUp_MovieCard"
            onClick={() => handleOpenModal('screenwriters')}
          />

          {idTheMovieDb && (
            <CloudSyncIcon
              className="Btn_Refresh_items_MovieCard"
              onClick={() =>
                refetchScreenwriters(idTheMovieDb, {
                  searchScreenwriterInDatabase,
                  createScreenwriterInDatabase,
                  setSelectedScreenwriters,
                })
              }
            />
          )}
        </div>
      )}
      {/* end Scénariste (modify) */}

      {/* Compositeur (modify) */}
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
            label="Compositeur(s)"
            value={getSelectedNames(selectedMusic)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('music')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchCompositors(idTheMovieDb, {
                searchCompositorInDatabase,
                createCompositorInDatabase,
                setSelectedMusic,
              })
            }
          />
        )}
      </div>
      {/* end Compositeur (modify) */}

      {/* Studio (modify) */}
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
            label="Studio(s)"
            value={getSelectedNames(selectedStudios)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('studio')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchStudios(idTheMovieDb, {
                searchStudioInDatabase,
                createStudioInDatabase,
                setSelectedStudios,
              })
            }
          />
        )}
      </div>
      {/* end Studio (modify) */}

      {/* Casting (modify) */}
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
            label="Casting"
            value={getSelectedNames(selectedCasting)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('casting')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchCasting(idTheMovieDb, {
                searchCastingInDatabase,
                createCastingInDatabase,
                setSelectedCasting,
              })
            }
          />
        )}
      </div>
      {/* end Casting (modify) */}

      {/* Tags (modify) */}
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
            label="Tag"
            value={getSelectedNames(selectedTags)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon
          className="Btn_Add_itemsPopUp_MovieCard"
          onClick={() => handleOpenModal('tags')}
        />

        {idTheMovieDb && (
          <CloudSyncIcon
            className="Btn_Refresh_items_MovieCard"
            onClick={() =>
              refetchTags(idTheMovieDb, {
                searchTagInDatabase,
                createTagInDatabase,
                setSelectedTags,
              })
            }
          />
        )}
      </div>
      {/* end Tags (modify) */}
    </>
  );
};

export default MovieCardRelationsSection;
