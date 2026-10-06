import { Box, Button } from '@mui/material';
// icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CachedIcon from '@mui/icons-material/Cached';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
// SX
import { dividerSx } from './constant/MovieCardEditStyle';

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
  // --------------
  // SX
  // --------------

  const uploadCoverButtonSX = {
    color: 'var(--color-03)',
    borderColor: 'var(--color-03)',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '10px',
    '&:hover': {
      borderColor: 'var(--color-06)',
      color: 'var(--color-06)',
      transform: 'scale(1.02)',
    },
  };

  const resetCoverButtonSx = {
    color: 'var(--color-01)',
    borderColor: 'var(--color-01)',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '10px',
    '&:hover': {
      borderColor: 'var(--color-06)',
      color: 'var(--color-06)',
      transform: 'scale(1.02)',
    },
  };

  const syncCoverButtonSx = {
    color: 'var(--color-02)',
    borderColor: 'var(--color-02)',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '10px',
    '&:hover': {
      borderColor: 'var(--color-06)',
      color: 'var(--color-06)',
      transform: 'scale(1.02)',
    },
  };

  // -----------------
  // RETURN
  // -----------------
  return (
    <Box
      id="MovieCard_Cover_Position"
      sx={{
        mr: { xs: 0, lg: 4 },
        mb: { xs: 4, lg: 2 },
        display: { xs: 'flex', lg: 'block' },
        flexDirection: { xs: 'column', lg: 'unset' },
        justifyContent: { xs: 'center', lg: 'unset' },
        alignItems: { xs: 'center', lg: 'unset' },
      }}
    >
      {/* COVER */}
      <Box
        component="img"
        src={image}
        alt={`Cover ${title}`}
        sx={{
          width: 233,
          height: 350,
        }}
      />
      {/* COVER */}

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
            <Box
              id="movie_cover_edit_buttons_wrapper"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 4, md: '10px' },
              }}
            >
              <Box
                id="movie_cover_edit_buttons"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 1,
                }}
              >
                {showUploadButton ? (
                  <Button
                    id="uploadCover_MovieCard"
                    variant="outlined"
                    sx={uploadCoverButtonSX}
                    onClick={handleUploadClick}
                  >
                    <FileUploadIcon />
                  </Button>
                ) : (
                  <Button
                    id="resetCover_MovieCard"
                    variant="outlined"
                    sx={resetCoverButtonSx}
                    onClick={handleResetImage}
                  >
                    <CachedIcon />
                  </Button>
                )}
              </Box>

              {idTheMovieDb && (
                <Box
                  id="movie_cover_edit_buttons_idTheMovieDb"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 1,
                  }}
                >
                  <Button
                    id="syncTMDBCover_MovieCard"
                    variant="outlined"
                    sx={syncCoverButtonSx}
                    onClick={handleSyncFromTMDB}
                  >
                    <CloudSyncIcon />
                  </Button>
                </Box>
              )}
            </Box>
          )}

          <Box
            id="backDivider_Cover_MovieCard"
            sx={{
              ...dividerSx,
              display: { xs: 'flex', lg: 'none' },
              mt: { xs: '1.5rem', lg: 0 },
            }}
          />
        </>
      )}
    </Box>
  );
}

export default MovieCardCover;
