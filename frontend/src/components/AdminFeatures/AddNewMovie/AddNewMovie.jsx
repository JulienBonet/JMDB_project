/* eslint-disable no-alert */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import TransferList from '../../TransferList/TransferList';
import MovieInfosEntrance from './MovieInfosEntrance';
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
import './addNewMovie.css';
// refactor
import { useTvSeasons } from '../../../hooks/useTvSeasons';
import { useMovieMedia } from '../../../hooks/useMovieMedia';
import { useAddMovieCover } from '../../../hooks/useAddMovieCover';
import { useTmdbMovieSelection } from '../../../hooks/useTmdbMovieSelection';
import { useTransferList } from '../../../hooks/useTransferList';
import { useAddMovieForm } from '../../../hooks/useAddMovieForm';
import { useAddMovieSubmit } from '../../../hooks/useAddMovieSubmit';
import TvSeasonEpisodeFields from './TvSeasonEpisodeFields';

function AddNewMovie() {
  // const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/images`;
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
  const initialCoverPreview = `${CLOUDINARY_BASE_URL}/00_cover_default.jpg`;

  const { openModal, data, dataType, handleOpenModal, handleCloseModal } = useTransferList();
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
  // -------------------
  // controle DEV
  // -------------------
  // useEffect(() => {
  //   console.info('data', data);
  //   console.info('movie', movie);
  // }, [movie, data]);

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

  //-----------------------------------------------
  // INPUT COVER
  //-----------------------------------------------

  const { fileCoverRef, selectedCoverFile, handleCoverChange, resetCoverFile } = useAddMovieCover({
    setCoverPreview,
  });

  //-----------------------------------------------
  // INPUT CHANGE
  //----------------------------------------------

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

  //-----------------------------------------------
  // FORM : ANNULATION - SOURCE - RESET
  //-----------------------------------------------

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

  //-----------------------------------------------
  // FORM SUBMIT
  //----------------------------------------------

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

  //-----------------------------------------------
  // MOVIE INFO ENTRANCE MODAL
  //-----------------------------------------------
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

  //-----------------------------------------------
  // ITEMS MODAL FETCH
  //-----------------------------------------------

  // --- GENERER LES NOMS
  const getSelectedNames = (items) => items.map((item) => item.name).join(', ');

  //-----------------------------------------------
  // INPUT FILE
  //-----------------------------------------------

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
            <div className="Adm_l1a">
              {/* Control Admin Buttons */}
              <div className="SourceResearchItems">
                {/* recherche BTN */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleOpenModalMIE()}
                  sx={{ flexGrow: 0.5 }}
                >
                  RECHERCHE
                </Button>
                <div className="SourceResearchItems_2">
                  {/* isTvShow Switch */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={movie.isTvShow}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          resetStates(isChecked);
                        }}
                      />
                    }
                    label="Série TV"
                  />
                  {/* resest field button */}
                  <IconButton
                    onClick={() => resetStates()}
                    sx={{
                      color: '#ff9900',
                      '&:hover': {
                        color: '#00d9c0',
                        backgroundColor: 'rgba(255, 170, 0, 0.1)',
                      },
                      border: 'solid 1px grey',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </div>
              </div>
              {/* movie TITLE */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '150ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
              >
                <TextField
                  name="title"
                  value={movie.title}
                  onChange={handleInputChange}
                  id="filled-basic"
                  label="Titre du film"
                  variant="outlined"
                />
              </Box>
              {/* movie alt TITLE */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
              >
                <TextField
                  name="altTitle"
                  sx={{ flexGrow: 1 }}
                  value={movie.altTitle}
                  onChange={handleInputChange}
                  id="filled-basic"
                  label="Titre alternatif"
                  variant="outlined"
                />
              </Box>
              {/* movie YEAR - DURATION */}
              <Box
                component="form"
                sx={{ flexGrow: 1 }}
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                gap={2}
                p={2}
              >
                <div
                  className={
                    movie.isTvShow
                      ? 'year_duration_Btn_AddNewtvShow'
                      : 'year_duration_Btn_AddNewMovie'
                  }
                >
                  {/* movie year */}
                  <TextField
                    name="year"
                    value={movie.year}
                    onChange={handleInputChange}
                    label="Année"
                    variant="outlined"
                    sx={{ flexGrow: 1 }}
                  />
                  {/* movie duration */}
                  {!movie?.isTvShow && (
                    <TextField
                      name="duration"
                      value={movie.duration}
                      onChange={handleInputChange}
                      label="Durée"
                      variant="outlined"
                      sx={{ flexGrow: 1 }}
                    />
                  )}
                  {/* Tv saison - epidsode - duration rendu la fonction renderTvSeasonEpisodeDurationFields */}
                  {movie?.isTvShow && (
                    <TvSeasonEpisodeFields
                      seasonsInfo={seasonsInfo}
                      movie={movie}
                      tvSeasons={tvSeasons}
                      nbTvEpisodes={nbTvEpisodes}
                      selectedSeasons={selectedSeasons}
                      setMovie={setMovie}
                      setTvSeasons={setTvSeasons}
                      setNbTvEpisodes={setNbTvEpisodes}
                      setSelectedSeasons={setSelectedSeasons}
                    />
                  )}
                </div>
              </Box>
              {/* movie PITCH */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
              >
                <TextField
                  name="pitch"
                  value={movie.pitch}
                  onChange={handleInputChange}
                  id="filled-basic"
                  label="pitch"
                  variant="outlined"
                />
              </Box>
              {/* movie STORY */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
              >
                <TextField
                  name="story"
                  value={movie.story}
                  onChange={handleInputChange}
                  id="outlined-multiline-static"
                  label="story"
                  multiline
                  rows={4}
                />
              </Box>
              {/* movie TRAILER */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
              >
                <TextField
                  name="trailer"
                  value={movie.trailer}
                  onChange={handleInputChange}
                  id="filled-basic"
                  label="trailer"
                  variant="outlined"
                />
              </Box>
              {/* movie COMMENTAIRE */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '100ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                onSubmit={handleFormSubmit}
              >
                <TextField
                  name="comment"
                  value={movie.comment} // Assurez-vous que ça soit `movie.comment`
                  onChange={handleInputChange} // Utiliser la même fonction pour gérer les changements
                  id="outlined-multiline-static"
                  label="Commentaire"
                  multiline
                  rows={4}
                />
              </Box>
            </div>
            <div className="Adm_l1b">
              {/* movie idTheMovieDb */}
              <Box
                component="form"
                sx={{ width: '30%' }}
                noValidate
                autoComplete="off"
                display="flex"
                gap={2}
                p={2}
              >
                <TextField
                  id="filled-basic"
                  label="Id MovieDb"
                  variant="outlined"
                  placeholder="movie/12345 ou tv/12345"
                  sx={{ flexGrow: 1 }}
                  value={movie.idTheMovieDb}
                  onChange={handleChangeMovieDb}
                />
              </Box>
              {/* movie KINDS */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Genre(s)"
                    value={getSelectedNames(selectedKinds)}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('kinds')}
                />
              </div>
              {/* movie DIRECTOR */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  {movie.isTvShow ? (
                    <TextField
                      id="outlined-read-only-input"
                      label="Créateur(s)"
                      value={getSelectedNames(selectedDirectors)}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  ) : (
                    <TextField
                      id="outlined-read-only-input"
                      label="Réalisateur(s)"
                      value={getSelectedNames(selectedDirectors)}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  )}
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('directors')}
                />
              </div>
              {/* movie SCREENWRITERS */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Scénariste(s)"
                    value={getSelectedNames(selectedScreenwriters)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('screenwriters')}
                />
              </div>
              {/* movie COMPOSITOR */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Compositeur(s)"
                    value={getSelectedNames(selectedMusic)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('music')}
                />
              </div>
              {/* movie CASTING */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Casting"
                    value={getSelectedNames(selectedCasting)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('casting')}
                />
              </div>
              {/* movie STUDIO */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Studio"
                    value={getSelectedNames(selectedStudios)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('studio')}
                />
              </div>
              {/* movie COUNTRY */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Pays"
                    value={getSelectedNames(selectedCountries)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('country')}
                />
              </div>
              {/* movie LANGUAGES */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Langues"
                    value={getSelectedNames(selectedLanguages)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('languages/sorted_id')}
                />
              </div>
              {/* movie TAG */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Tags"
                    value={getSelectedNames(selectedTags)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('tags/sorted_id')}
                />
              </div>
              {/* movie FOCUS */}
              <div className="adm-l1_item">
                <Box
                  component="form"
                  sx={{ flexGrow: 1 }}
                  noValidate
                  autoComplete="off"
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                >
                  <TextField
                    id="outlined-read-only-input"
                    label="Focus"
                    value={getSelectedNames(selectedFocus)}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Box>
                <AddCircleOutlineIcon
                  className="Btn_Add_itemsPopUp"
                  onClick={() => handleOpenModal('focus')}
                />
              </div>
            </div>
          </section>
        </section>
        <div className="dashed_secondary_bar" />

        <section className="Adm_l2">
          {/* movie FILE */}
          <div className="Adm_l2a">
            {/* movie SUPPORT */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-select-small-label">Support</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={movie.videoSupport || ''}
                label="Support"
                onChange={handleFormatSupportChange}
              >
                <MenuItem value="">
                  <em>choisir un support</em>
                </MenuItem>
                <MenuItem value="DVD original">DVD</MenuItem>
                <MenuItem value="DVD R/RW">DVD R/RW</MenuItem>
                <MenuItem value="Fichier multimédia">FICHIER MULTIMEDIA</MenuItem>
              </Select>
            </FormControl>
            {movie.videoSupport === 'Fichier multimédia' && (
              <>
                <div>
                  {/* movie VIDEOFORMAT */}
                  <Box
                    component="form"
                    sx={{ '& > :not(style)': { width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    display="flex"
                    alignItems="center"
                    gap={4}
                  >
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>format</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={movie.videoFormat || ''}
                        label="format"
                        onChange={formatsHandleChange}
                      >
                        <MenuItem value="">
                          <em>choisir un format</em>
                        </MenuItem>
                        <MenuItem value="avi">avi</MenuItem>
                        <MenuItem value="mkv">mkv</MenuItem>
                        <MenuItem value="mp4">mp4</MenuItem>
                      </Select>
                    </FormControl>
                    {/* movie FILESIZE */}
                    <TextField
                      label="File Size"
                      id="outlined-start-adornment"
                      sx={{ m: 1, width: '25ch' }}
                      value={movie.fileSize || ''}
                      onChange={(event) =>
                        setMovie((prev) => ({
                          ...prev,
                          fileSize: event.target.value,
                        }))
                      }
                    />
                  </Box>
                </div>
                {/* movie LOCAL PATH */}
                {movie.isTvShow ? (
                  <>
                    {/* Sélection d’un dossier complet */}
                    <Box display="flex" alignItems="center" gap={2} p={1} sx={{ flexGrow: 1 }}>
                      <TextField
                        label="Dossier sélectionné"
                        variant="outlined"
                        value={movie.path || ''}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />

                      {/* Input caché pour sélectionner un dossier */}
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        webkitdirectory="true"
                        multiple
                        onChange={handleFolderChange}
                      />

                      <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                        Sélectionner un dossier
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                    component="form"
                    sx={{ flexgrow: 1 }}
                    noValidate
                    autoComplete="off"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    p={1}
                  >
                    {/* Champ pour le chemin du dossier */}
                    <TextField
                      label="Chemin du dossier"
                      variant="outlined"
                      value={movie.path || ''}
                      onChange={(e) => {
                        const userPathInput = e.target.value;
                        const cleanedPath = userPathInput
                          .replace(/^[A-Za-z]:[\\/]+/, '')
                          .replace(/[\\/]+$/, '');

                        setMovie((prev) => ({
                          ...prev,
                          path: userPathInput,
                          location: selectedFile ? `${cleanedPath}\\${selectedFile.name}` : '',
                        }));
                      }}
                      fullWidth
                    />
                    {/* Sélection d’un fichier unique */}{' '}
                    <TextField
                      label="Fichier sélectionné"
                      variant="outlined"
                      value={selectedFile ? selectedFile.name : ''}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        } else {
                          console.warn('fileInputRef is not attached to any input element');
                        }
                      }}
                    >
                      Sélectionner un fichier vidéo
                    </Button>
                    {/* Input caché pour le vrai fichier */}
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </Box>
                )}
                {/* movie VERSION (vostfr or multi) */}
                <FormControl sx={{ m: 1 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">version:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  >
                    <FormControlLabel value="none" control={<Radio />} label="none" />
                    <FormControlLabel value="VOSTFR" control={<Radio />} label="VOSTFR" />
                    <FormControlLabel value="MULTI" control={<Radio />} label="MULTI" />
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </div>
          {/* movie COVER */}
          <div className="Adm_l2b">
            <img className="preview_cover" src={coverPreview} alt="Couverture" />
            <input
              type="file"
              name="cover"
              style={{ display: 'none' }}
              onChange={handleCoverChange}
              ref={fileCoverRef}
              accept="image/*"
            />
            <button type="button" onClick={() => fileCoverRef.current.click()}>
              Sélectionner une image
            </button>
          </div>
        </section>

        <div className="dashed_secondary_bar" />
        <section className="Adm_l3">
          {/* VALIDATION */}
          <ThemeProvider theme={theme}>
            <Stack spacing={2} direction="row">
              <Button onClick={handleFormSubmit} size="large" variant="outlined" color="validBtn">
                VALIDER
              </Button>
              <Button onClick={handleReturn} size="large" variant="outlined" color="abortBtn">
                ANNULER
              </Button>
            </Stack>
          </ThemeProvider>

          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isSubmitting} // Affiche le Backdrop pendant la soumission
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </section>
      </section>
      {/* transfert Lists */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={transferListStyle}>
          <div
            onClick={handleCloseModal}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleCloseModal();
              }
            }}
            role="button"
            tabIndex={0}
            className="modal_closed_btn_MovieItemList"
          >
            &#91; Fermer &#93;
          </div>

          <Container>
            {openModal && dataType && (
              <TransferList
                dataType={dataType}
                items={data || []}
                selectedKinds={selectedKinds}
                onSelectedKindsUpdate={setSelectedKinds}
                selectedDirectors={selectedDirectors}
                onSelectedDirectorsUpdate={setSelectedDirectors}
                selectedScreenwriters={selectedScreenwriters}
                onSelectedScreenwritersUpdate={setSelectedScreenwriters}
                selectedMusic={selectedMusic}
                onSelectedMusicUpdate={setSelectedMusic}
                selectedCasting={selectedCasting}
                onSelectedCastingUpdate={setSelectedCasting}
                selectedStudios={selectedStudios}
                onSelectedStudiosUpdate={setSelectedStudios}
                selectedCountries={selectedCountries}
                onSelectedCountriesUpdate={setSelectedCountries}
                selectedLanguages={selectedLanguages}
                onSelectedLanguagesUpdate={setSelectedLanguages}
                selectedTags={selectedTags}
                onSelectedTagsUpdate={setSelectedTags}
                selectedFocus={selectedFocus}
                onSelectedFocusUpdate={setSelectedFocus}
              />
            )}
          </Container>
        </Box>
      </Modal>
      {/* MIE modal */}
      <Modal
        open={openModalMIE}
        onClose={handleCloseModalMIE}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleMIEmodal}>
          <MovieInfosEntrance
            title={movie.title}
            onMovieClick={handleTmdbMovieClick}
            handleCloseModalMIE={handleCloseModalMIE}
          />
        </Box>
      </Modal>
    </main>
  );
}

export default AddNewMovie;
