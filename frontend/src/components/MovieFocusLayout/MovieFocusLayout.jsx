import { Typography, Box, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// components
import MovieFocusThumbnail from '../MovieFocusThumbnail/MovieFocusThumbnail';
import MovieThumbnail from '../MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../StickySideBar/StickySideBar';
import FocusCard from '../FocusCard/FocusCard';

function MovieFocusLayout({
  icon,
  alt,
  title,
  Focus,
  selectedFocus,
  films,
  openSideBar,
  openMovieSideBar,
  openFocusModal,
  origin,

  setSelectedFocus,
  setOpenSideBar,
  setOpenMovieSideBar,

  handleSortedAlphabeticalFocus,
  handleSortedChronologicalFocus,
  handleResetFocus,
  handleClickFocus,
  handleSortedAlphabeticalMovies,
  handleSortedChronologicalMovies,
  handleResetMovies,
  handleUpdateMovie,
  handleDeleteMovie,

  openModal,
  closeModal,

  initialData,
  showChronologicalFocus = false,
  infoButtonTitle,
}) {
  return (
    <Box
      component="main"
      id="MovieFocusLayout_Main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <Box
        component="section"
        id="MovieFocus_Header"
        sx={{
          flex: '0 0 auto',
        }}
      >
        <Box
          id="MovieFocus_HeaderContent"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '5rem',
            px: 4,
            gap: 1,
          }}
        >
          {selectedFocus ? (
            <>
              {/* selected focus return ico */}
              <IconButton
                onClick={() => setSelectedFocus('')}
                sx={{
                  color: 'var(--color-01)',
                  border: '1px solid var(--color-01)',
                  borderRadius: '8px',
                  padding: '6px',
                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  },
                  '&:hover': {
                    backgroundColor: 'var(--color-05)',
                    borderColor: 'var(--color-01)',
                  },
                }}
                aria-label="Retour"
              >
                <KeyboardReturnIcon />
              </IconButton>
              {/* end selected focus return ico */}

              {/* selected focus title SECTION */}
              <Box
                id="SelectFocus_Title"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 1, sm: 4 },
                }}
              >
                {/* selected focus title */}
                <Typography
                  id="SelectedFocus_HeaderTitle"
                  component="h1"
                  sx={{
                    fontFamily: 'var(--font-02)',
                    color: 'var(--color-01)',
                    fontSize: { xs: 'medium', sm: 'xx-large' },
                    textAlign: 'center',
                  }}
                >
                  {selectedFocus.name}
                </Typography>
                {/* selected focus title */}

                {/* selected focus info button */}
                <IconButton
                  onClick={openModal}
                  sx={{ display: { xs: 'none', md: 'flex' }, color: 'var(--color-01)' }}
                  aria-label="info +"
                  title={infoButtonTitle}
                >
                  <InfoOutlinedIcon
                    sx={{
                      fontSize: '2rem',
                      animation: 'infoPulse 1.2s ease-out 1',
                      '@keyframes infoPulse': {
                        '0%': {
                          transform: 'scale(0.8)',
                          opacity: 0,
                        },
                        '50%': {
                          transform: 'scale(1.25)',
                          opacity: 1,
                        },
                        '100%': {
                          transform: 'scale(1)',
                        },
                      },
                      transition: '0.2s ease',
                      '&:hover': {
                        color: 'var(--color-03)',
                        transform: 'scale(1.15)',
                      },
                    }}
                  />
                </IconButton>
                {/* selected focus info button */}
              </Box>
              {/* end selected focus title SECTION */}

              {/* toggle Btn */}
              <ToggleSortedButton
                active={!!films}
                onClick={() => setOpenMovieSideBar(!openMovieSideBar)}
              />
              {/* end toggle Btn */}
            </>
          ) : (
            <>
              {/* Thema ico */}
              <Box component="img" id="focus_ico" src={icon} alt={alt} sx={{ height: '3rem' }} />
              {/* Thema ico */}

              {/* thema title */}
              <Typography
                id="FocusList_HeaderTitle"
                component="h1"
                sx={{
                  fontFamily: 'var(--font-02)',
                  color: 'var(--color-01)',
                  fontSize: { xs: 'large', sm: 'xx-large' },
                }}
              >
                {title}
              </Typography>
              {/* thema title */}

              {/* toggle Btn */}
              <ToggleSortedButton
                active={!!initialData}
                onClick={() => setOpenSideBar(!openSideBar)}
              />
              {/* toggle Btn */}
            </>
          )}
        </Box>
      </Box>

      <div className="dashed_secondary_bar" />

      {/* END HEADER */}

      {/* contenu */}
      <Box
        component="section"
        id="MovieFocus_Content"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflowY: 'auto',
        }}
      >
        {!selectedFocus ? (
          <>
            {/* sorted sticky bar */}
            <SideActionBar
              onAlphabeticClick={handleSortedAlphabeticalFocus}
              {...(showChronologicalFocus && {
                onChronologicClick: handleSortedChronologicalFocus,
              })}
              onResetClick={handleResetFocus}
              openSideBar={openSideBar}
              origin={origin}
            />
            {/* end sorted sticky bar */}

            {/* focus list */}
            <Box
              id="SelectedFocus_MoviesContainer"
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 4,
                justifyItems: 'center',
                py: 4,
                width: '90%',
                mx: 'auto',
              }}
            >
              {Focus.map((f) => (
                <MovieFocusThumbnail key={f.id} data={f} onClick={() => handleClickFocus(f)} />
              ))}
            </Box>
            {/* focus list */}
          </>
        ) : (
          <>
            {/* sorted sticky bar */}
            <SideActionBar
              onAlphabeticClick={handleSortedAlphabeticalMovies}
              onChronologicClick={handleSortedChronologicalMovies}
              onResetClick={handleResetMovies}
              openSideBar={openMovieSideBar}
              origin="movies"
            />
            {/* end sorted sticky bar */}

            {/* Movies list */}
            <Box
              id="SelectedFocusMovies_MoviesContainer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                py: 4,
                width: '90%',
                mx: 'auto',
              }}
            >
              {films.map((movie) => (
                <MovieThumbnail
                  key={movie.id}
                  data={movie}
                  onUpdateMovie={handleUpdateMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              ))}
            </Box>
            {/* end Movies list */}
          </>
        )}
      </Box>

      {/* MODAL FOCUS INFOS */}
      {selectedFocus && (
        <Modal
          open={openFocusModal}
          onClose={closeModal}
          sx={{
            p: 3,
            mx: '5%',
            display: 'flex',
            justifyContent: 'center',
            maxHeight: '100dvh',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              onClick={closeModal}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  closeModal();
                }
              }}
              role="button"
              tabIndex={0}
              sx={{
                textAlign: 'right',
                fontFamily: 'var(--font-04)',
                fontWeight: 600,
                color: 'var(--color-02)',
                cursor: 'pointer',
                p: 2,
                width: {
                  xs: '90%',
                  md: '800px',
                  lg: '900px',
                  xl: '1200px',
                },
              }}
            >
              X Fermer
            </Box>

            <FocusCard selectedFocus={selectedFocus} origin={origin} />
          </Box>
        </Modal>
      )}
      {/* END MODAL FOCUS INFOS */}
    </Box>
  );
}

export default MovieFocusLayout;
