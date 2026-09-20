import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
import CircularProgress from '@mui/material/CircularProgress';

function AdminItemsCardActions({
  isEditing,
  isLoading = false,
  onReturn,
  onEdit,
  onValidate,
  onUndo,
}) {
  return (
    <div className="Info_Btn-Modify">
      {isEditing ? (
        <section className="Item_Editing_Buttons">
          {isLoading ? (
            <CircularProgress size={22} thickness={5} color="inherit" className="Item_loader_mui" />
          ) : (
            <DoneOutlineIcon className="Item_validateButton" onClick={onValidate} />
          )}

          <UndoIcon className="Item_UndoButton" onClick={onUndo} />
        </section>
      ) : (
        <section className="Item_Editing_Buttons">
          <KeyboardReturnIcon className="item_return_ico" onClick={onReturn} />
          <ModeIcon className="item_tools_ico" onClick={onEdit} />
        </section>
      )}
    </div>
  );
}

export default AdminItemsCardActions;
