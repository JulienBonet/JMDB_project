import { useLoaderData } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import collectionIco from '../../assets/ico/focus_collection.png';
import MovieFocusThumbnail from '../../components/MovieFocusThumbnail/MovieFocusThumbnail';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
import FocusCard from '../../components/FocusCard/FocusCard';
import './movieFocus.css';
import './movieFocusMediaqueries.css';
// refacto
import useMovieFocusPage from '../../hooks/useMovieFocusPage';

function MovieCollection() {
  const themaData = useLoaderData();
  const {
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
  } = useMovieFocusPage({
    mode: 'focus',
    category: 3,
    initialData: themaData,
  });

  //------------------------------------------
  // RETURN
  //------------------------------------------
  return (
    <main className="Main_movieFocusPage">
      {/* barre */}
      <section className="search_bar_container_MF">
        <div className="search_bar_content_selectefFocus_MF">
          {selectedFocus ? (
            <>
              <IconButton
                onClick={() => setSelectedFocus('')}
                sx={{
                  color: 'var(--color-01)',
                  border: '1px solid var(--color-01)',
                  borderRadius: '8px',
                  padding: '6px',
                  '&:hover': {
                    backgroundColor: 'var(--color-05)',
                    borderColor: 'var(--color-01)',
                  },
                }}
                aria-label="Retour"
              >
                <KeyboardReturnIcon />
              </IconButton>
              <div className="SelectFocus_Title">
                <h1 className="h1_titlePage_MF">{selectedFocus.name}</h1>
                <IconButton
                  title="en savoir +"
                  onClick={openModal}
                  sx={{ color: 'var(--color-01)' }}
                  aria-label="info +"
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
              </div>
              <ToggleSortedButton
                active={!!films}
                onClick={() => setOpenMovieSideBar(!openMovieSideBar)}
              />
            </>
          ) : (
            <>
              <img src={collectionIco} alt="Thémas" className="thema_icon" />
              <h1 className="h1_titlePage_MF">COLLECTIONS</h1>
              <ToggleSortedButton
                active={!!themaData}
                onClick={() => setOpenSideBar(!openSideBar)}
              />
            </>
          )}
        </div>
      </section>
      <div className="dashed_secondary_bar" />
      {/* contenu */}
      <section className="main_content_MF">
        {!selectedFocus ? (
          <>
            <SideActionBar
              onAlphabeticClick={handleSortedAlphabeticalFocus}
              onResetClick={handleResetFocus}
              openSideBar={openSideBar}
              origin={origin}
            />
            <div className="thumbnails_container_MF">
              {Focus.map((f) => (
                <MovieFocusThumbnail key={f.id} data={f} onClick={() => handleClickFocus(f)} />
              ))}
            </div>
          </>
        ) : (
          <>
            <SideActionBar
              onAlphabeticClick={handleSortedAlphabeticalMovies}
              onChronologicClick={handleSortedChronologicalMovies}
              onResetClick={handleResetMovies}
              openSideBar={openMovieSideBar}
              origin="movies"
            />
            <div className="Movies_thumbnails_container_MF">
              {films.map((movie) => (
                <MovieThumbnail
                  key={movie.id}
                  data={movie}
                  onUpdateMovie={handleUpdateMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              ))}
            </div>
          </>
        )}
      </section>
      {/* modal */}
      {selectedFocus && (
        <Modal open={openFocusModal} onClose={closeModal} className="Focus_Modal">
          <Box>
            <Container maxWidth="800px" className="Focus_Modal_container">
              <div
                onClick={closeModal}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModal();
                  }
                }}
                role="button"
                tabIndex={0}
                className="focus_modal_closed_btn"
              >
                X Fermer
              </div>
              <FocusCard selectedFocus={selectedFocus} origin={origin} />
            </Container>
          </Box>
        </Modal>
      )}
    </main>
  );
}

export default MovieCollection;
