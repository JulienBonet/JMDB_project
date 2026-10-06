import {
  Box,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
// icons
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MovieCardActions({
  isAdmin,
  isModify,
  isFavorite,
  isUpdating,
  isConfirmUpdateOpen,
  isConfirmDeleteOpen,
  handleToggleFavorite,
  handleUndo,
  handleOpenUpdateConfirm,
  handleCloseUpdateConfirm,
  handleUpdateMovie,
  handleOpenDeleteConfirm,
  handleCloseDeleteConfirm,
  handleDeleteMovie,
  isModifyMode,
  movieId,
  toggleFavorite,
}) {
  // ----------------
  // SX
  // ----------------
  const undoIconBtnSx = {
    cursor: 'pointer',
    padding: '0.3rem 0.5rem',
    border: 'solid 1px',
    borderRadius: '10px',
    color: 'whitesmoke',
  };
  const submitMovieEditBtnSx = {
    cursor: 'pointer',
    padding: '0.3rem 0.5rem',
    border: 'solid 1px',
    borderRadius: '10px',
    color: 'greenyellow',
  };

  const favoriteBtnSx = {
    border: 'solid 1px',
    borderRadius: '10px',
    padding: '0.3rem 0.5rem',
    color: isFavorite ? 'error.main' : 'whitesmoke',
    transition: 'transform 0.15s ease, color 0.15s ease',
    '&:hover': {
      color: 'error.main',
      transform: 'scale(1.15)',
    },
  };

  const actionBtnMovieCardSx = {
    cursor: 'pointer',
    padding: '0.3rem 0.5rem',
    border: 'solid 1px',
    borderRadius: '10px',
    color: 'var(--color-02)',
  };

  // ----------------
  // RETURN
  // ----------------
  return (
    <>
      {isAdmin ? (
        <Box
          component="section"
          id="Movie_editing_btn-container"
          sx={{
            mt: 2,
          }}
        >
          {isModify ? (
            // ADMIN MODE
            <Box
              component="section"
              id="Editing_Buttons_Item_Movie_EditMode"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                gap: 2,
                alignItems: 'center',
              }}
            >
              <UndoIcon sx={undoIconBtnSx} onClick={handleUndo} />

              <DoneOutlineIcon sx={submitMovieEditBtnSx} onClick={handleOpenUpdateConfirm} />
            </Box>
          ) : (
            <Box
              component="section"
              id="Editing_Buttons_Item_Movie_viewMode"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: { xs: 3, sm: 2 },
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Tooltip
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                placement="top"
              >
                <IconButton
                  onClick={handleToggleFavorite}
                  size="small"
                  aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  sx={favoriteBtnSx}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <Box
                id="Item_Movie_Editing_Buttons_2"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <ModeIcon sx={actionBtnMovieCardSx} onClick={isModifyMode} />

                <DeleteIcon
                  sx={actionBtnMovieCardSx}
                  onClick={() => handleOpenDeleteConfirm(movieId)}
                />
              </Box>
            </Box>
          )}

          <Dialog open={isConfirmUpdateOpen} onClose={handleCloseUpdateConfirm}>
            <DialogTitle>Confirmer la mise à jour</DialogTitle>

            <DialogContent>
              <DialogContentText>Es-tu sûr de vouloir mettre à jour ce film ?</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseUpdateConfirm} color="primary">
                Annuler
              </Button>

              <Button onClick={handleUpdateMovie} color="primary" autoFocus>
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={isConfirmDeleteOpen} onClose={handleCloseDeleteConfirm}>
            <DialogTitle>Confirmer Delete</DialogTitle>

            <DialogContent>
              <DialogContentText>Es-tu sûr de vouloir effacer ce film ?</DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDeleteConfirm} color="primary">
                Annuler
              </Button>

              <Button onClick={handleDeleteMovie} color="primary" autoFocus>
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>

          <Backdrop
            sx={(theme) => ({
              color: '#fff',
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={isUpdating}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box> // END ADMIN MODE
      ) : (
        // USER MODE
        <Box
          component="section"
          id="Item_Movie_Editing_Buttons_user"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            placement="top"
          >
            <IconButton
              onClick={toggleFavorite}
              size="small"
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              sx={favoriteBtnSx}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box> // END USER MODE
      )}
    </>
  );
}

export default MovieCardActions;
