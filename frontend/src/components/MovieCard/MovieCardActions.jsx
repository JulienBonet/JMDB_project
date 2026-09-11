import {
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
  return (
    <>
      {isAdmin ? (
        <section className="Movie_editing_btn-container">
          {isModify ? (
            <section className="Item_Movie_Editing_Buttons">
              <UndoIcon className="item_movie_undo_ico" onClick={handleUndo} />

              <DoneOutlineIcon className="item_movie_done_ico" onClick={handleOpenUpdateConfirm} />
            </section>
          ) : (
            <section className="Item_Movie_Editing_Buttons">
              <Tooltip
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                placement="top"
              >
                <IconButton
                  onClick={handleToggleFavorite}
                  size="small"
                  className="item_movie_favorite_ico"
                  aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  sx={{
                    border: 'solid 1px',
                    borderRadius: '10px',
                    padding: '0.3rem 0.5rem',
                    color: isFavorite ? 'error.main' : 'whitesmoke',
                    transition: 'transform 0.15s ease, color 0.15s ease',
                    '&:hover': {
                      color: 'error.main',
                      transform: 'scale(1.15)',
                    },
                  }}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>

              <div className="Item_Movie_Editing_Buttons_2">
                <ModeIcon className="item_movie_mode_ico" onClick={isModifyMode} />

                <DeleteIcon
                  className="item_movie_delete_ico"
                  onClick={() => handleOpenDeleteConfirm(movieId)}
                />
              </div>
            </section>
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
        </section>
      ) : (
        <section className="Item_Movie_Editing_Buttons_user">
          <Tooltip
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            placement="top"
          >
            <IconButton
              onClick={toggleFavorite}
              size="small"
              className="item_movie_favorite_ico"
              aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              sx={{
                border: 'solid 1px',
                borderRadius: '10px',
                padding: '0.3rem 0.5rem',
                color: isFavorite ? 'error.main' : 'var(--color-01)',
                transition: 'transform 0.15s ease, color 0.15s ease',
                '&:hover': {
                  color: 'error.main',
                  transform: 'scale(1.15)',
                },
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </section>
      )}
    </>
  );
}

export default MovieCardActions;
