// -----------------------------
// COLUMN 2 - MAIN SECTION FORM
// -----------------------------

import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddMovieRelationsSection({
  idTheMovieDb,
  handleChangeMovieDb,
  isTvShow,
  getSelectedNames,
  handleOpenModal,
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
  //-----------------------------------------------
  // SX
  //-----------------------------------------------
  const itemRelationSx = {
    display: 'flex',
    alignItems: 'center',
  };

  const itemBtnPopUpSx = {
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7,
    },
  };

  return (
    <Box
      id="AdM_Main_column_2"
      sx={{
        width: {
          xs: '95%',
          lg: '40%',
        },
        p: 2,
      }}
    >
      {/* movie idTheMovieDb */}
      <Box
        component="form"
        id="AdM_idTheMovieDb"
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
          value={idTheMovieDb}
          onChange={handleChangeMovieDb}
        />
      </Box>

      {/* movie KINDS */}
      <Box id="AdM_kinds_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('kinds')} />
      </Box>

      {/* movie DIRECTOR */}
      <Box id="AdM_Directors_item" sx={itemRelationSx}>
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
            label={isTvShow ? 'Créateur(s)' : 'Réalisateur(s)'}
            value={getSelectedNames(selectedDirectors)}
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </Box>

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('directors')} />
      </Box>

      {/* movie SCREENWRITERS */}
      <Box id="AdM_Screenwriters_item" sx={itemRelationSx}>
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
          sx={itemBtnPopUpSx}
          onClick={() => handleOpenModal('screenwriters')}
        />
      </Box>

      {/* movie COMPOSITOR */}
      <Box id="AdM_Compositors_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('music')} />
      </Box>

      {/* movie CASTING */}
      <Box id="AdM_Casting_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('casting')} />
      </Box>

      {/* movie STUDIO */}
      <Box id="AdM_Studios_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('studio')} />
      </Box>

      {/* movie COUNTRY */}
      <Box id="AdM_Countries_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('country')} />
      </Box>

      {/* movie LANGUAGES */}
      <Box id="AdM_Languages_item" sx={itemRelationSx}>
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
          sx={itemRelationSx}
          onClick={() => handleOpenModal('languages/sorted_id')}
        />
      </Box>

      {/* movie TAG */}
      <Box id="AdM_Tags_item" sx={itemRelationSx}>
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
          sx={itemBtnPopUpSx}
          onClick={() => handleOpenModal('tags/sorted_id')}
        />
      </Box>

      {/* movie FOCUS */}
      <Box id="AdM_Focus_item" sx={itemRelationSx}>
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

        <AddCircleOutlineIcon sx={itemBtnPopUpSx} onClick={() => handleOpenModal('focus')} />
      </Box>
    </Box>
  );
}

export default AddMovieRelationsSection;
