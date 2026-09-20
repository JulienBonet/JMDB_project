// frontend/src/components/AdminFeatures/AddNewMovie/AddMovieRelationsSection.jsx
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
  return (
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
          value={idTheMovieDb}
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
            label={isTvShow ? 'Créateur(s)' : 'Réalisateur(s)'}
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
  );
}

export default AddMovieRelationsSection;
