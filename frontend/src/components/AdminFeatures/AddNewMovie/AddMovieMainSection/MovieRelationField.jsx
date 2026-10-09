import { Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function MovieRelationField({ id, label, value, onAdd }) {
  return (
    <Box id={id} sx={{ display: 'flex', alignItems: 'center' }}>
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
          id={`${id}_field`}
          label={label}
          value={value}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Box>

      <AddCircleOutlineIcon
        sx={{
          cursor: 'pointer',
          '&:hover': { opacity: 0.7 },
        }}
        onClick={onAdd}
      />
    </Box>
  );
}

export default MovieRelationField;
