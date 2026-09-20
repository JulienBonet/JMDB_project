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
  return (
    <>
      {image && <img className="ItemImage" src={image} alt={itemName} />}

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
            <FileUploadIcon className="Item_uploadButton" onClick={handleUploadClick} />
          ) : (
            <CachedIcon className="Item_reset_img_Button" onClick={handleResetImage} />
          )}
        </>
      )}
    </>
  );
}

export default AdminItemsCardImage;
