import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CachedIcon from '@mui/icons-material/Cached';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

function MovieCardCover({
  image,
  title,
  isModify,
  fileCoverRef,
  handleCoverUpload,
  showImageButton,
  showUploadButton,
  handleUploadClick,
  handleResetImage,
  idTheMovieDb,
  handleSyncFromTMDB,
}) {
  return (
    <div className="MovieCard_Cover_Position">
      <img className="MovieCard_cover" src={image} alt={`Cover ${title}`} />

      {isModify && (
        <>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleCoverUpload}
            ref={fileCoverRef}
            style={{ display: 'none' }}
          />

          {showImageButton && (
            <div className="movie_cover_modify_buttons_wrapper">
              <div className="movie_cover_modify_button">
                {showUploadButton ? (
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'var(--color-03)',
                      borderColor: 'var(--color-03)',
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: '10px',
                      '&:hover': {
                        borderColor: 'var(--color-06)',
                        color: 'var(--color-06)',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={handleUploadClick}
                  >
                    <FileUploadIcon />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'var(--color-01)',
                      borderColor: 'var(--color-01)',
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: '10px',
                      '&:hover': {
                        borderColor: 'var(--color-06)',
                        color: 'var(--color-06)',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={handleResetImage}
                  >
                    <CachedIcon />
                  </Button>
                )}
              </div>

              {idTheMovieDb && (
                <div className="movie_cover_modify_button">
                  <Button
                    variant="outlined"
                    sx={{
                      color: 'var(--color-02)',
                      borderColor: 'var(--color-02)',
                      transition: 'all 0.2s ease-in-out',
                      borderRadius: '10px',
                      '&:hover': {
                        borderColor: 'var(--color-06)',
                        color: 'var(--color-06)',
                        transform: 'scale(1.02)',
                      },
                    }}
                    onClick={handleSyncFromTMDB}
                  >
                    <CloudSyncIcon />
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="divider divider_movie_cover_modify_button" />
        </>
      )}
    </div>
  );
}

export default MovieCardCover;
