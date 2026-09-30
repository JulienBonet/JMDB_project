import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';

import { CircularProgress, Stack, IconButton } from '@mui/material';

function AdminItemsCardActions({
  isEditing,
  isLoading = false,
  onReturn,
  onEdit,
  onValidate,
  onUndo,
}) {
  const actionButtonSx = {
    border: '1px solid',
    borderRadius: '10px',
  };

  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        pt: {
          xs: 1,
          lg: 2,
        },
        justifyContent: {
          xs: 'center',
          lg: 'flex-start',
        },
      }}
    >
      {isEditing ? (
        <>
          {isLoading ? (
            <CircularProgress size={22} thickness={5} color="inherit" />
          ) : (
            <IconButton
              onClick={onValidate}
              sx={{
                ...actionButtonSx,
                color: 'greenyellow',
              }}
            >
              <DoneOutlineIcon />
            </IconButton>
          )}

          <IconButton
            onClick={onUndo}
            sx={{
              ...actionButtonSx,
              color: 'rgb(255, 89, 0)',
            }}
          >
            <UndoIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={onReturn}
            sx={{
              ...actionButtonSx,
              color: 'whitesmoke',
            }}
          >
            <KeyboardReturnIcon />
          </IconButton>

          <IconButton
            onClick={onEdit}
            sx={{
              ...actionButtonSx,
              color: 'var(--color-02)',
            }}
          >
            <ModeIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
}

export default AdminItemsCardActions;
