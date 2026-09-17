import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import focusCastingIco from '../../assets/ico/focus_casting.png';
import MovieFocusThumbnail from '../../components/MovieFocusThumbnail/MovieFocusThumbnail';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
import FocusCard from '../../components/FocusCard/FocusCard';
import './movieFocus.css';
import './movieFocusMediaqueries.css';
// refactor
import {
  getArtistFocusSorted,
  getArtistMovies,
  getArtistMoviesSorted,
} from '../../services/artistService';

function MovieThema() {
  const themaData = useLoaderData();
  const [Focus, setFocus] = useState(themaData);
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [films, setFilms] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openMovieSideBar, setOpenMovieSideBar] = useState(false);
  const [sortFocusAsc, setSortFocusAsc] = useState(true);
  const [sortMoviesAsc, setSortMoviesAsc] = useState(true);
  const [sortMoviesYearAsc, setSortMoviesYearAsc] = useState(true);
  const [openFocusModal, setOpenFocusModal] = useState(false);

  const origin = 'ArtistFocus';

  //------------------------------------------
  // SORTED THEMAS
  //------------------------------------------
  const handleSortedAlphabeticalFocus = async () => {
    const sort = sortFocusAsc ? 0 : 1;

    const data = await getArtistFocusSorted('casting', sort);
    setFocus(data);

    setSortFocusAsc(!sortFocusAsc);
  };

  const handleSortedChronologicalFocus = async () => {
    const sort = sortFocusAsc ? 2 : 3;

    const data = await getArtistFocusSorted('casting', sort);
    setFocus(data);

    setSortFocusAsc(!sortFocusAsc);
  };

  const handleResetFocus = () => {
    setFocus(themaData);
  };

  //------------------------------------------
  // SELECTION D'UNE THEMA - FETCH DES FILMS
  //------------------------------------------
  const handleClickFocus = async (f) => {
    setSelectedFocus(f);

    const data = await getArtistMovies('casting', f.id);
    setFilms(data);
  };

  //------------------------------------------
  // SORTED MOVIES
  //------------------------------------------
  const handleSortedAlphabeticalMovies = async () => {
    if (!selectedFocus) return;

    const sort = sortMoviesAsc ? 0 : 1;
    const data = await getArtistMoviesSorted('casting', selectedFocus.id, sort);

    setFilms(data);
    setSortMoviesAsc(!sortMoviesAsc);
  };

  const handleSortedChronologicalMovies = async () => {
    if (!selectedFocus) return;

    const sort = sortMoviesYearAsc ? 2 : 3;
    const data = await getArtistMoviesSorted('casting', selectedFocus.id, sort);

    setFilms(data);
    setSortMoviesYearAsc(!sortMoviesYearAsc);
  };

  const handleResetMovies = async () => {
    if (!selectedFocus) return;

    const data = await getArtistMovies('casting', selectedFocus.id);
    setFilms(data);

    setSortMoviesAsc(true);
    setSortMoviesYearAsc(true);
  };
  //------------------------------------------
  // OPEN / CLOSED MODAL
  //------------------------------------------
  const openModal = () => {
    setOpenFocusModal(true);
  };

  const closeModal = () => {
    setOpenFocusModal(false);
  };

  //------------------------------------------
  // MAJ DU CONTENU
  //------------------------------------------
  const handleUpdateMovie = (updatedMovie) => {
    setFilms((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
  };

  const handleDeleteMovie = (movieId) => {
    setFilms((prev) => prev.filter((movie) => movie.id !== movieId));
  };

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
                  onClick={openModal}
                  sx={{
                    color: 'var(--color-01)',
                  }}
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
              <img src={focusCastingIco} alt="Les stard" className="thema_icon" />
              <h1 className="h1_titlePage_MF">LES STARS</h1>
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
              onChronologicClick={handleSortedChronologicalFocus}
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

export default MovieThema;
