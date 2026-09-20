/* eslint-disable no-alert */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// style
import './addNewMovie.css';
// services
import {
  searchGenreInDatabase,
  createGenreInDatabase,
  searchStudioInDatabase,
  createStudioInDatabase,
  searchCountryInDatabase,
  createCountryInDatabase,
  searchLanguageInDatabase,
  createLanguageInDatabase,
  searchDirectorInDatabase,
  createDirectorInDatabase,
  searchScreenwriterInDatabase,
  createScreenwriterInDatabase,
  searchCompositorInDatabase,
  createCompositorInDatabase,
  searchCastingInDatabase,
  createCastingInDatabase,
  searchTagInDatabase,
  createTagInDatabase,
} from '../../../services/movieRelationService';
// hooks
import { useTvSeasons } from '../../../hooks/useTvSeasons';
import { useMovieMedia } from '../../../hooks/useMovieMedia';
import { useAddMovieCover } from '../../../hooks/useAddMovieCover';
import { useTmdbMovieSelection } from '../../../hooks/useTmdbMovieSelection';
import { useTransferList } from '../../../hooks/useTransferList';
import { useAddMovieForm } from '../../../hooks/useAddMovieForm';
import { useAddMovieSubmit } from '../../../hooks/useAddMovieSubmit';
// component
import AddMovieMediaSection from './AddMovieMediaSection';
import AddMovieTransferListModal from './AddMovieTransferListModal';
import MovieInfosEntranceModal from './MovieInfosEntranceModal';
import AddMovieActions from './AddMovieActions';
import AddMovieMainSection from './AddMovieMainSection/AddMovieMainSection';

function AddNewMovie() {
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
  const initialCoverPreview = `${CLOUDINARY_BASE_URL}/00_cover_default.jpg`;

  const { openModal, data, dataType, handleOpenModal, handleCloseModal } = useTransferList();

  // states
  const [coverPreview, setCoverPreview] = useState(initialCoverPreview);
  const [openModalMIE, setOpenModalMIE] = useState(false);
  const [selectedKinds, setSelectedKinds] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedScreenwriters, setSelectedScreenwriters] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedCasting, setSelectedCasting] = useState([]);
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [version, setVersion] = useState('none');
  const [tmdbSeasonsInfo, setTmdbSeasonsInfo] = useState([]);
  const [movie, setMovie] = useState({
    title: '',
    altTitle: '',
    year: '',
    duration: 0,
    pitch: '',
    story: '',
    comment: '',
    posterUrl: '',
    trailer: '',
    location: '',
    videoFormat: '',
    videoSupport: '',
    fileSize: '',
    idTheMovieDb: '',
    idIMDB: '',
    isTvShow: false,
    nbTvSeasons: '',
    tvSeasons: '',
    nbTvEpisodes: null,
    episodeDuration: 0,
  });

  // TV SHOW LOGICS
  const {
    selectedSeasons,
    setSelectedSeasons,
    seasonsInfo,
    tvSeasons,
    setTvSeasons,
    nbTvEpisodes,
    setNbTvEpisodes,
  } = useTvSeasons({
    isModify: false,
    isTvShow: movie.isTvShow,
    movieData: movie,
    setMovieData: setMovie,
    externalSeasonsInfo: tmdbSeasonsInfo,
  });

  const {
    fileInputRef,
    selectedFile,
    handleFileChange,
    handleFolderChange,
    handleFormatSupportChange,
  } = useMovieMedia(movie, setMovie);

  // INPUT COVER

  const { fileCoverRef, selectedCoverFile, handleCoverChange, resetCoverFile } = useAddMovieCover({
    setCoverPreview,
  });

  // INPUT CHANGE

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'idIMDb') {
      setMovie((prevMovie) => ({ ...prevMovie, [name]: parseInt(value, 10) }));
    } else if (name === 'location') {
      setMovie((prevMovie) => ({
        ...prevMovie,
        [name]: event.target.files[0],
      }));
    } else {
      setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
    }
  };

  // FORM : ANNULATION - SOURCE - RESET

  const navigate = useNavigate();

  const { handleReturn, handleChangeMovieDb, resetStates } = useAddMovieForm({
    navigate,
    setMovie,
    setSelectedKinds,
    setSelectedDirectors,
    setSelectedCasting,
    setSelectedScreenwriters,
    setSelectedMusic,
    setSelectedStudios,
    setSelectedCountries,
    setSelectedLanguages,
    setSelectedTags,
    setSelectedFocus,
    setCoverPreview,
    initialCoverPreview,
    resetCoverFile,
    setTmdbSeasonsInfo,
    setSelectedSeasons,
    setTvSeasons,
    setNbTvEpisodes,
    setVersion,
  });

  // FORM SUBMIT

  const { isSubmitting, handleFormSubmit } = useAddMovieSubmit({
    movie,
    version,
    selectedFocus,
    selectedKinds,
    selectedDirectors,
    selectedCasting,
    selectedScreenwriters,
    selectedMusic,
    selectedStudios,
    selectedCountries,
    selectedLanguages,
    selectedTags,
    selectedCoverFile,
    handleReturn,
  });

  // MOVIE INFO ENTRANCE MODAL

  const handleOpenModalMIE = () => {
    if (movie.title) {
      setOpenModalMIE(true);
    } else {
      toast.warn('Saisir un titre à rechercher');
    }
  };

  const handleCloseModalMIE = () => {
    setOpenModalMIE(false);
  };

  const { handleTmdbMovieClick } = useTmdbMovieSelection({
    resetStates,
    setTmdbSeasonsInfo,
    setMovie,
    movie,
    tvSeasons,
    searchGenreInDatabase,
    createGenreInDatabase,
    setSelectedKinds,
    searchStudioInDatabase,
    createStudioInDatabase,
    setSelectedStudios,
    searchCountryInDatabase,
    createCountryInDatabase,
    setSelectedCountries,
    searchLanguageInDatabase,
    createLanguageInDatabase,
    setSelectedLanguages,
    searchDirectorInDatabase,
    createDirectorInDatabase,
    setSelectedDirectors,
    searchScreenwriterInDatabase,
    createScreenwriterInDatabase,
    setSelectedScreenwriters,
    searchCompositorInDatabase,
    createCompositorInDatabase,
    setSelectedMusic,
    searchCastingInDatabase,
    createCastingInDatabase,
    setSelectedCasting,
    searchTagInDatabase,
    createTagInDatabase,
    setSelectedTags,
    setCoverPreview,
  });

  // ITEMS MODAL FETCH --- GENERER LES NOMS

  const getSelectedNames = (items) => items.map((item) => item.name).join(', ');

  // INPUT FILE

  const formatsHandleChange = (event) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      videoFormat: event.target.value,
    }));
  };

  //-----------------------------------------------
  // BUTTON STYLE
  //-----------------------------------------------

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1e1612',
      },
      secondary: {
        main: '#00d9c0',
      },
      validBtn: {
        main: '#076834',
      },
      abortBtn: {
        main: '#ad1f2b',
      },
    },
  });

  //-----------------------------------------------
  // MODALS STYLE
  //-----------------------------------------------
  const transferListStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 0,
    pb: 4,
    px: 0,
  };

  const styleMIEmodal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
  };

  //-----------------------------------------------
  // RETURN
  //-----------------------------------------------
  return (
    <main>
      <section className="Adm_form_box">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleReturn}>
            <CloseIcon />
          </IconButton>
        </div>
        <section className="Adm_l0">
          <h1 className="AdM_main_title">ADD NEW MOVIE</h1>
          <div className="AdM_main_title_bar" />
          <section className="Adm_l1">
            <AddMovieMainSection
              movie={movie}
              setMovie={setMovie}
              handleInputChange={handleInputChange}
              handleOpenModalMIE={handleOpenModalMIE}
              resetStates={resetStates}
              handleChangeMovieDb={handleChangeMovieDb}
              handleOpenModal={handleOpenModal}
              getSelectedNames={getSelectedNames}
              seasonsInfo={seasonsInfo}
              tvSeasons={tvSeasons}
              nbTvEpisodes={nbTvEpisodes}
              selectedSeasons={selectedSeasons}
              setTvSeasons={setTvSeasons}
              setNbTvEpisodes={setNbTvEpisodes}
              setSelectedSeasons={setSelectedSeasons}
              selectedKinds={selectedKinds}
              selectedDirectors={selectedDirectors}
              selectedScreenwriters={selectedScreenwriters}
              selectedMusic={selectedMusic}
              selectedCasting={selectedCasting}
              selectedStudios={selectedStudios}
              selectedCountries={selectedCountries}
              selectedLanguages={selectedLanguages}
              selectedTags={selectedTags}
              selectedFocus={selectedFocus}
              setSelectedKinds={setSelectedKinds}
              setSelectedDirectors={setSelectedDirectors}
              setSelectedScreenwriters={setSelectedScreenwriters}
              setSelectedMusic={setSelectedMusic}
              setSelectedCasting={setSelectedCasting}
              setSelectedStudios={setSelectedStudios}
              setSelectedCountries={setSelectedCountries}
              setSelectedLanguages={setSelectedLanguages}
              setSelectedTags={setSelectedTags}
              setSelectedFocus={setSelectedFocus}
              handleFormSubmit={handleFormSubmit}
            />
          </section>
        </section>

        <div className="dashed_secondary_bar" />

        <AddMovieMediaSection
          movie={movie}
          setMovie={setMovie}
          version={version}
          setVersion={setVersion}
          coverPreview={coverPreview}
          fileCoverRef={fileCoverRef}
          handleCoverChange={handleCoverChange}
          fileInputRef={fileInputRef}
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleFolderChange={handleFolderChange}
          handleFormatSupportChange={handleFormatSupportChange}
          formatsHandleChange={formatsHandleChange}
        />

        <div className="dashed_secondary_bar" />

        {/* VALIDATION */}
        <AddMovieActions
          theme={theme}
          handleFormSubmit={handleFormSubmit}
          handleReturn={handleReturn}
          isSubmitting={isSubmitting}
        />
      </section>
      {/* transfert Lists */}
      <AddMovieTransferListModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        transferListStyle={transferListStyle}
        data={data}
        dataType={dataType}
        selectedKinds={selectedKinds}
        selectedDirectors={selectedDirectors}
        selectedCasting={selectedCasting}
        selectedScreenwriters={selectedScreenwriters}
        selectedMusic={selectedMusic}
        selectedStudios={selectedStudios}
        selectedCountries={selectedCountries}
        selectedLanguages={selectedLanguages}
        selectedTags={selectedTags}
        selectedFocus={selectedFocus}
        setSelectedKinds={setSelectedKinds}
        setSelectedDirectors={setSelectedDirectors}
        setSelectedCasting={setSelectedCasting}
        setSelectedScreenwriters={setSelectedScreenwriters}
        setSelectedMusic={setSelectedMusic}
        setSelectedStudios={setSelectedStudios}
        setSelectedCountries={setSelectedCountries}
        setSelectedLanguages={setSelectedLanguages}
        setSelectedTags={setSelectedTags}
        setSelectedFocus={setSelectedFocus}
      />
      {/* MIE modal */}
      <MovieInfosEntranceModal
        openModalMIE={openModalMIE}
        handleCloseModalMIE={handleCloseModalMIE}
        styleMIEmodal={styleMIEmodal}
        title={movie.title}
        onMovieClick={handleTmdbMovieClick}
      />
    </main>
  );
}

export default AddNewMovie;
