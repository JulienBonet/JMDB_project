import { Box, IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CachedIcon from '@mui/icons-material/Cached';

function AdminItemsCardImage({
  image,
  itemName,
  isModify,
  fileInputRef,
  handleFileUpload,
  showUploadButton,
  handleUploadClick,
  handleResetImage,
}) {
  const adminCardItemImageSX = {
    padding: '0.5rem 1rem',
    border: 'solid 1px',
    borderRadius: '10px',
  };
  return (
    <>
      {image && (
        <Box
          component="img"
          src={image}
          alt={itemName}
          sx={{
            width: '100%',
            maxWidth: '250px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
      )}

      {isModify && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          {showUploadButton ? (
            <IconButton
              onClick={handleUploadClick}
              sx={{ ...adminCardItemImageSX, color: 'var(--color-03)' }}
            >
              <FileUploadIcon fontSize="medium" />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleResetImage}
              sx={{ ...adminCardItemImageSX, color: 'var(--color-01)' }}
            >
              <CachedIcon fontSize="medium" />
            </IconButton>
          )}
        </>
      )}
    </>
  );
}

export default AdminItemsCardImage;
