// MovieRelationField.jsx

import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

import { editContainerSx, addIconSx, refreshIconSx } from '../constant/MovieCardEditStyle';

function MovieRelationField({
  id,
  label,
  value,
  modalType,
  handleOpenModal,
  textFieldSx,
  onRefresh,
  showRefresh,
}) {
  return (
    <Box id={id} sx={editContainerSx}>
      <Box
        component="form"
        sx={textFieldSx}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
      >
        <TextField label={label} value={value} InputProps={{ readOnly: true }} fullWidth />
      </Box>

      <AddCircleOutlineIcon onClick={() => handleOpenModal(modalType)} sx={addIconSx} />

      {showRefresh && <CloudSyncIcon onClick={onRefresh} sx={refreshIconSx} />}
    </Box>
  );
}

export default MovieRelationField;
