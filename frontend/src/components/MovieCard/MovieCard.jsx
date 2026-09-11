/* eslint-disable react/no-unknown-property */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './movieCard.css';
import './movieCardMediaQueries.css';
import './movieCard_videoPlayer_MediaQueries.css';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../Context/AuthContext';
import TransferList from '../TransferList/TransferList';
import {
  refetchMovieTMDB,
  // refetchTitle,
  refetchAltTitle,
  refetchYear,
  refetchDuration,
  refetchStory,
  refetchGenres,
  refetchCountries,
  refetchDirectors,
  refetchScreenwriters,
  refetchCompositors,
  refetchStudios,
  refetchCasting,
  refetchTags,
  refetchTrailer,
  refetchMovieCoverFromTMDB,
} from '../../utils/refetchMovieTMDB';
import purgeOrphanRecords from '../../utils/purgeOrphanRecords';
import {
  searchGenreInDatabase,
  createGenreInDatabase,
  createStudioInDatabase,
  searchStudioInDatabase,
  searchCountryInDatabase,
  createCountryInDatabase,
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
} from '../../utils/movieEntranceSearchInsert';
// refacto
import { getSeasons } from '../../services/tmdbService';
import { updateMovie, deleteMovie, getByName } from '../../services/movieService';
import {
  parseTvSeasons,
  formatTvSeasons,
  calculateTotalEpisodes,
  calculateTotalDuration,
} from '../../utils/tvShowUtils';
import MovieCardView from './MovieCardView';
import MovieCardView02 from './MovieCardView02';
import MovieCardEdit from './MovieCardEdit';
import MovieCardEdit02 from './MovieCardEdit02';
import { useTransferList } from '../../hooks/useTransferList';
import { useTrailer } from '../../hooks/useTrailer';
import { useFavorites } from '../../hooks/useFavorites';
import { useMovieData } from '../../hooks/useMovieData';
import { useMovieCover } from '../../hooks/useMovieCover';
import MovieCardCover from './MovieCardCover';
import { useMovieMedia } from '../../hooks/useMovieMedia';

function MovieCard({ movie, origin, closeModal, onUpdateMovie, onDeleteMovie, onFavoriteRemoved }) {
  const { isAdmin } = useAuth();
  const { user } = useAuth();

  // const DEFAULT_COVER = "00_cover_default.jpg";
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  const getImageUrl = (publicId) => {
    if (!publicId) return getImageUrl('00_cover_default.jpg');
    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  };

  const [isModify, setIsModify] = useState(false);
  const [allowEdit, setAllowEdit] = useState(false);
  const [selectedKinds, setSelectedKinds] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedCasting, setSelectedCasting] = useState([]);
  const [selectedScreenwriters, setSelectedScreenwriters] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [version, setVersion] = useState(movie.vostfr ? 'VOSTFR' : movie.multi ? 'MULTI' : 'none');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [trailerMessage, setTrailerMessage] = useState('');
  // movie data
  const { movieData, setMovieData, refetchMovieData } = useMovieData(movie, origin);
  const { genres, countries, directors, screenwriters, music, studios, casting, tags, focus } =
    movieData;

  const { idTheMovieDb } = movie;
  const isTvShow = movieData.isTvShow === 1;
  const tvSeason = movieData.tvSeasons;
  const safeValue = (val) => val ?? '';

  //-----------------------------------------------
  // UX FIELDS
  //-----------------------------------------------

  const textFieldSx = {
    width: '80%',
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'orange' },
      '&.Mui-focused fieldset': { borderColor: 'cyan' },
    },
  };

  //-----------------------------------------------
  // TRAILER
  //-----------------------------------------------

  const {
    isTrailerVisible,
    isTrailerLoading,
    toggleTrailerVideo,
    handleTrailerReady,
    handleTrailerStart,
  } = useTrailer();

  //-----------------------------------------------
  // FAVORITE
  //-----------------------------------------------

  const { isFavorite, toggleFavorite } = useFavorites(user?.id, movie?.id);

  const handleToggleFavorite = async () => {
    try {
      const added = await toggleFavorite();

      if (added === null) return;

      onFavoriteRemoved?.();

      if (added) {
        toast.success('Ajouté aux favoris ❤️');
      } else {
        toast.info('Retiré des favoris');
      }
    } catch (err) {
      console.error('Erreur favoris', err);
      toast.error('Erreur favoris');
    }
  };

  //-----------------------------------------------
  // MODIFY MODE - modifier champs TextField
  //-----------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idTheMovieDb' && value && !/^(movie|tv)\/\d*$/.test(value)) {
      return; // ignore les caractères invalides pendant la saisie
    }

    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  //-----------------------------------------------
  // MODIFY MODE - modifier  VOSTFR MULTI
  //-----------------------------------------------

  const handleVersionChange = (event) => {
    const selectedVersion = event.target.value;
    setVersion(selectedVersion);

    // Met à jour movieData en fonction de la version sélectionnée
    setMovieData((prevData) => ({
      ...prevData,
      vostfr: selectedVersion === 'VOSTFR' ? 1 : 0,
      multi: selectedVersion === 'MULTI' ? 1 : 0,
    }));
  };

  //-----------------------------------------------
  // MODIFY MODE - MODIFICATION DE L'AFFICHE
  //-----------------------------------------------

  const {
    image,
    setImage,
    showUploadButton,
    setShowUploadButton,
    showImageButton,
    setShowImageButton,
    fileCoverRef,
    handleCoverUpload,
    handleUploadClick,
    handleResetImage,
    handleUpdateImage,
  } = useMovieCover({
    movie,
    isModify,
    getImageUrl,
  });

  //-----------------------------------------------
  // GESTION DES FIELDS SAISONS - EPISODES - DUREE
  //-----------------------------------------------

  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [seasonsInfo, setSeasonsInfo] = useState([]);
  const [tvSeasons, setTvSeasons] = useState(movieData.tvSeasons || '');
  const [nbTvEpisodes, setNbTvEpisodes] = useState(movieData.nbTvEpisodes || 0);

  // Parse tvSeasons de movieData dès le mode modify
  useEffect(() => {
    if (!isModify || !isTvShow) return;

    // On attend que movieData.tvSeasons soit défini (et non vide)
    if (!movieData.tvSeasons) return;

    const parsed = parseTvSeasons(movieData.tvSeasons);

    setSelectedSeasons(parsed);
  }, [isModify, isTvShow, movieData.tvSeasons]);

  // Récupération des infos season episodes TMDB
  useEffect(() => {
    if (!isModify || !isTvShow || !idTheMovieDb) return;

    const fetchSeasonsInfo = async () => {
      try {
        const [mediaType, movieId] = idTheMovieDb.split('/');
        const data = await getSeasons(mediaType, movieId);

        if (data.seasons && data.seasons.length > 0) {
          setSeasonsInfo(data.seasons);
        }
      } catch (err) {
        console.error('Erreur récupération saisons via backend :', err);
        setSeasonsInfo([]);
      }
    };

    fetchSeasonsInfo();
  }, [isModify, isTvShow, idTheMovieDb]);

  // Mise à jour du nombre total d’épisodes
  useEffect(() => {
    if (!isTvShow) return;

    if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
      setNbTvEpisodes(0);
      setMovieData((prev) => ({ ...prev, nbTvEpisodes: 0 }));
      return;
    }

    const totalEpisodes = calculateTotalEpisodes(selectedSeasons, seasonsInfo);

    setNbTvEpisodes(totalEpisodes);
    setMovieData((prev) => ({ ...prev, nbTvEpisodes: totalEpisodes }));
  }, [selectedSeasons, seasonsInfo, isTvShow]);

  // Mise à jour de la durée totale
  useEffect(() => {
    if (!isTvShow) return;

    if (!movieData.episodeDuration || movieData.episodeDuration === 0) {
      setMovieData((prev) => ({ ...prev, duration: '' }));
      return;
    }

    if (nbTvEpisodes > 0) {
      const total = calculateTotalDuration(nbTvEpisodes, movieData.episodeDuration);
      setMovieData((prev) => ({ ...prev, duration: total }));
    } else {
      setMovieData((prev) => ({ ...prev, duration: '' }));
    }
  }, [nbTvEpisodes, movieData.episodeDuration, isTvShow]);

  // Mise à jour automatique de tvSeasons selon les saisons sélectionnées
  useEffect(() => {
    if (!isTvShow) return;

    if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
      setTvSeasons('');
      setMovieData((prev) => ({ ...prev, tvSeasons: '' }));
      return;
    }

    const displayValue = formatTvSeasons(selectedSeasons);

    setTvSeasons(displayValue);
    setMovieData((prev) => ({ ...prev, tvSeasons: displayValue }));
  }, [selectedSeasons, isTvShow]);

  //-----------------------------------------------
  // INPUT FILE
  //-----------------------------------------------
  const {
    fileInputRef,
    selectedFile,
    handleFileChange,
    handleFolderChange,
    handleFormatSupportChange,
  } = useMovieMedia(movieData, setMovieData);

  //-----------------------------------------------
  // TRANSFERT LIST
  //-----------------------------------------------
  const { openModal, data, dataType, handleOpenModal, handleCloseModal } = useTransferList();

  const transferListStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 0,
    pb: 4,
    px: 0,
  };

  // FONCTION GÉNÉRIQUE FETCH PAR NOM
  const fetchByNames = async (namesString, endpoint, setter) => {
    if (!namesString) return;
    try {
      const namesArray = namesString.split(', ').map(async (name) => {
        try {
          return await getByName(endpoint, name);
        } catch (err) {
          console.warn(`Error fetching ${endpoint} ${name}:`, err);
          return null;
        }
      });

      const result = (await Promise.all(namesArray)).filter(Boolean);
      setter(result);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  // FONCTION GÉNÉRIQUE POUR NOMS
  const getSelectedNames = (list) => list.map((item) => item.name).join(', ');

  // UTILITAIRE POUR CRÉER UN HOOK DE FETCH AUTOMATIQUE
  const useAutoFetch = (value, endpoint, setter) => {
    useEffect(() => {
      fetchByNames(value, endpoint, setter);
    }, [value]);
  };

  // UTILISATION POUR CHAQUE TYPE
  useAutoFetch(genres, 'kind', setSelectedKinds);
  useAutoFetch(directors, 'director', setSelectedDirectors);
  useAutoFetch(casting, 'casting', setSelectedCasting);
  useAutoFetch(screenwriters, 'screenwriter', setSelectedScreenwriters);
  useAutoFetch(music, 'music', setSelectedMusic);
  useAutoFetch(studios, 'studio', setSelectedStudios);
  useAutoFetch(countries, 'country', setSelectedCountries);
  useAutoFetch(tags, 'tags', setSelectedTags);
  useAutoFetch(focus, 'focus', setSelectedFocus);

  // HANDLERS POUR CHAQUE TYPE
  const handleSelectedKindsUpdate = setSelectedKinds;
  const handleSelectedDirectorsUpdate = setSelectedDirectors;
  const handleSelectedCastingUpdate = setSelectedCasting;
  const handleSelectedScreenwritersUpdate = setSelectedScreenwriters;
  const handleSelectedMusicUpdate = setSelectedMusic;
  const handleSelectedStudiosUpdate = setSelectedStudios;
  const handleSelectedCountriesUpdate = setSelectedCountries;
  const handleSelectedTagsUpdate = setSelectedTags;
  const handleSelectedFocusUpdate = setSelectedFocus;

  //-----------------------------------------------
  // UPDATE MODE
  //-----------------------------------------------

  const isModifyMode = () => {
    setIsModify(true);
  };

  const closeModifyMode = () => {
    purgeOrphanRecords();

    setIsModify(false);
  };

  const handleUndo = () => {
    refetchMovieData(); // recharge les infos du film
    setImage(getImageUrl(movie.cover));

    // re-fetch des listes sélectionnées via la fonction générique
    fetchByNames(genres, 'kind', setSelectedKinds);
    fetchByNames(directors, 'director', setSelectedDirectors);
    fetchByNames(casting, 'casting', setSelectedCasting);
    fetchByNames(screenwriters, 'screenwriter', setSelectedScreenwriters);
    fetchByNames(music, 'music', setSelectedMusic);
    fetchByNames(studios, 'studio', setSelectedStudios);
    fetchByNames(countries, 'country', setSelectedCountries);
    fetchByNames(tags, 'tags', setSelectedTags);
    fetchByNames(focus, 'focus', setSelectedFocus);

    closeModifyMode();
  };

  //-----------------------------------------------
  // UPDATE MOVIE
  //-----------------------------------------------
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenUpdateConfirm = () => setIsConfirmUpdateOpen(true);
  const handleCloseUpdateConfirm = () => setIsConfirmUpdateOpen(false);

  const handleUpdateMovie = async () => {
    setIsConfirmUpdateOpen(false);

    setIsUpdating(true); // Affiche le Backdrop

    try {
      // Mettre à jour l'image (s'il y a un fichier sélectionné)
      if (fileCoverRef.current.files[0]) {
        await handleUpdateImage();
      }

      // Mettre à jour les autres informations du film
      const payload = {
        title: movieData.title,
        altTitle: movieData.altTitle,
        year: movieData.year,
        duration: movieData.duration || null,
        trailer: movieData.trailer,
        story: movieData.story,
        location: movieData.location,
        videoFormat: movieData.videoFormat,
        videoSupport: movieData.videoSupport,
        fileSize: movieData.fileSize,
        vostfr: movieData.vostfr,
        multi: movieData.multi,
        comment: movieData.comment,
        genres: selectedKinds.map((genre) => genre.id),
        directors: selectedDirectors.map((director) => director.id),
        castings: selectedCasting.map((cast) => cast.id),
        screenwriters: selectedScreenwriters.map((screenwriter) => screenwriter.id),
        musics: selectedMusic.map((compositor) => compositor.id),
        studios: selectedStudios.map((studio) => studio.id),
        countries: selectedCountries.map((country) => country.id),
        tags: selectedTags.map((tag) => tag.id),
        focus: selectedFocus.map((f) => f.id),
        isTvShow: movieData.isTvShow,
        tvSeasons: movieData.tvSeasons || null,
        nbTvEpisodes: movieData.nbTvEpisodes || null,
        episodeDuration: movieData.episodeDuration || null,
        idTheMovieDb: movieData.idTheMovieDb,
      };

      const updatedMovie = await updateMovie(movieData.id, payload);

      toast.success('Film mis à jour avec succès');

      const newMovie = Array.isArray(updatedMovie) ? updatedMovie[0] : updatedMovie;

      setMovieData(newMovie);
      onUpdateMovie(newMovie);
      closeModifyMode();

      if (typeof closeModal === 'function') {
        closeModal();
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du film et de l'image", error);
    } finally {
      setIsUpdating(false); // Masque le Backdrop une fois terminé
    }
  };

  // DELETE MOVIE

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  const handleOpenDeleteConfirm = (id) => {
    setMovieIdToDelete(id); // Stocke l'ID du film à supprimer
    setIsConfirmDeleteOpen(true); // Ouvre le dialogue
  };

  const handleCloseDeleteConfirm = () => {
    setIsConfirmDeleteOpen(false);
    setMovieIdToDelete(null);
  };

  const handleDeleteMovie = async () => {
    if (!movieIdToDelete) return;

    setIsConfirmDeleteOpen(false);

    try {
      await deleteMovie(movieData.id);

      toast.info('Film supprimé avec succès');
      onDeleteMovie(movieData.id);
      if (typeof closeModal === 'function') {
        closeModal();
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression du film');
      console.error('Erreur durant la suppression:', error);
    }
  };

  //-----------------------------------------------
  // SYNC COVER FROM TMDB
  //-----------------------------------------------

  const handleSyncFromTMDB = async () => {
    const confirmReplace = window.confirm(
      "Êtes-vous sûr de vouloir remplacer définitivement l'image ?"
    );

    if (!confirmReplace) return;

    await refetchMovieCoverFromTMDB(idTheMovieDb, {
      movieId: movieData.id,
      setImage,
      setShowImageButton,
    });
  };

  //-----------------------------------------------
  // RETURN
  //-----------------------------------------------

  return (
    <article className="MovieCard">
      <div className="MovieCard_container">
        <section className="MC_line1">
          {/* COVER BLOCK */}
          <MovieCardCover
            image={image}
            title={movieData.title}
            isModify={isModify}
            fileCoverRef={fileCoverRef}
            handleCoverUpload={handleCoverUpload}
            showImageButton={showImageButton}
            showUploadButton={showUploadButton}
            handleUploadClick={handleUploadClick}
            handleResetImage={handleResetImage}
            idTheMovieDb={idTheMovieDb}
            handleSyncFromTMDB={handleSyncFromTMDB}
          />
          {/* END COVER BLOCK */}

          {/* INFO BLOCK 1 */}
          {isModify ? (
            // BLOCK 1 MODIFY MODE
            <MovieCardEdit
              isTvShow={isTvShow}
              idTheMovieDb={idTheMovieDb}
              movieData={movieData}
              setMovieData={setMovieData}
              safeValue={safeValue}
              handleChange={handleChange}
              textFieldSx={textFieldSx}
              selectedFocus={selectedFocus}
              selectedKinds={selectedKinds}
              handleOpenModal={handleOpenModal}
              getSelectedNames={getSelectedNames}
              refetchMovieTMDB={refetchMovieTMDB}
              searchGenreInDatabase={searchGenreInDatabase}
              createGenreInDatabase={createGenreInDatabase}
              setSelectedKinds={setSelectedKinds}
              searchStudioInDatabase={searchStudioInDatabase}
              createStudioInDatabase={createStudioInDatabase}
              setSelectedStudios={setSelectedStudios}
              searchCountryInDatabase={searchCountryInDatabase}
              createCountryInDatabase={createCountryInDatabase}
              setSelectedCountries={setSelectedCountries}
              searchDirectorInDatabase={searchDirectorInDatabase}
              createDirectorInDatabase={createDirectorInDatabase}
              setSelectedDirectors={setSelectedDirectors}
              searchScreenwriterInDatabase={searchScreenwriterInDatabase}
              createScreenwriterInDatabase={createScreenwriterInDatabase}
              setSelectedScreenwriters={setSelectedScreenwriters}
              searchCompositorInDatabase={searchCompositorInDatabase}
              createCompositorInDatabase={createCompositorInDatabase}
              setSelectedMusic={setSelectedMusic}
              searchCastingInDatabase={searchCastingInDatabase}
              createCastingInDatabase={createCastingInDatabase}
              setSelectedCasting={setSelectedCasting}
              searchTagInDatabase={searchTagInDatabase}
              createTagInDatabase={createTagInDatabase}
              setSelectedTags={setSelectedTags}
              setImage={setImage}
              setShowUploadButton={setShowUploadButton}
              setShowImageButton={setShowImageButton}
              refetchAltTitle={refetchAltTitle}
              refetchGenres={refetchGenres}
              refetchYear={refetchYear}
              refetchDuration={refetchDuration}
              selectedSeasons={selectedSeasons}
              setSelectedSeasons={setSelectedSeasons}
              seasonsInfo={seasonsInfo}
              tvSeasons={tvSeasons}
              setTvSeasons={setTvSeasons}
              nbTvEpisodes={nbTvEpisodes}
              setNbTvEpisodes={setNbTvEpisodes}
            />
          ) : (
            // END BLOCK 1 MODIFY MODE

            // BLOCK 1 LISTEN MODE
            <MovieCardView
              movieData={movieData}
              isTvShow={isTvShow}
              tvSeason={tvSeason}
              isTrailerVisible={isTrailerVisible}
              isTrailerLoading={isTrailerLoading}
              genres={genres}
              countries={countries}
              directors={directors}
              screenwriters={screenwriters}
              music={music}
              studios={studios}
              casting={casting}
              handleTrailerReady={handleTrailerReady}
              handleTrailerStart={handleTrailerStart}
            />
          )}
        </section>
        {/* END INFO BLOCK 1 */}

        {/* INFO BLOCK 2 */}
        <section>
          {isModify ? (
            // BLOCK 2 MODIFY MODE
            <MovieCardEdit02
              isTvShow={isTvShow}
              idTheMovieDb={idTheMovieDb}
              movieData={movieData}
              setMovieData={setMovieData}
              safeValue={safeValue}
              handleChange={handleChange}
              textFieldSx={textFieldSx}
              selectedCountries={selectedCountries}
              selectedDirectors={selectedDirectors}
              selectedScreenwriters={selectedScreenwriters}
              selectedMusic={selectedMusic}
              selectedStudios={selectedStudios}
              selectedCasting={selectedCasting}
              selectedTags={selectedTags}
              getSelectedNames={getSelectedNames}
              handleOpenModal={handleOpenModal}
              searchCountryInDatabase={searchCountryInDatabase}
              createCountryInDatabase={createCountryInDatabase}
              setSelectedCountries={setSelectedCountries}
              searchDirectorInDatabase={searchDirectorInDatabase}
              createDirectorInDatabase={createDirectorInDatabase}
              setSelectedDirectors={setSelectedDirectors}
              searchScreenwriterInDatabase={searchScreenwriterInDatabase}
              createScreenwriterInDatabase={createScreenwriterInDatabase}
              setSelectedScreenwriters={setSelectedScreenwriters}
              searchCompositorInDatabase={searchCompositorInDatabase}
              createCompositorInDatabase={createCompositorInDatabase}
              setSelectedMusic={setSelectedMusic}
              searchStudioInDatabase={searchStudioInDatabase}
              createStudioInDatabase={createStudioInDatabase}
              setSelectedStudios={setSelectedStudios}
              searchCastingInDatabase={searchCastingInDatabase}
              createCastingInDatabase={createCastingInDatabase}
              setSelectedCasting={setSelectedCasting}
              searchTagInDatabase={searchTagInDatabase}
              createTagInDatabase={createTagInDatabase}
              setSelectedTags={setSelectedTags}
              refetchCountries={refetchCountries}
              refetchDirectors={refetchDirectors}
              refetchScreenwriters={refetchScreenwriters}
              refetchCompositors={refetchCompositors}
              refetchStudios={refetchStudios}
              refetchCasting={refetchCasting}
              refetchTags={refetchTags}
              refetchStory={refetchStory}
              refetchTrailer={refetchTrailer}
              handleFormatSupportChange={handleFormatSupportChange}
              fileInputRef={fileInputRef}
              handleFolderChange={handleFolderChange}
              selectedFile={selectedFile}
              handleFileChange={handleFileChange}
              version={version}
              handleVersionChange={handleVersionChange}
              trailerMessage={trailerMessage}
              setTrailerMessage={setTrailerMessage}
              allowEdit={allowEdit}
              setAllowEdit={setAllowEdit}
            />
          ) : (
            // BLOCK 2 LISTEN MODE
            <MovieCardView02
              movieData={movieData}
              isTrailerVisible={isTrailerVisible}
              focus={focus}
              isAdmin={isAdmin}
              toggleTrailerVideo={toggleTrailerVideo}
            />
          )}
          {/* END INFO BLOCK 2 */}
        </section>

        {!isAdmin && <section style={{ height: '2rem' }} />}

        {/* EDITING BUTTON */}
        {isAdmin ? (
          <section className="Movie_editing_btn-container">
            {isModify ? (
              <section className="Item_Movie_Editing_Buttons">
                <UndoIcon className="item_movie_undo_ico" onClick={() => handleUndo()} />
                <DoneOutlineIcon
                  className="item_movie_done_ico"
                  onClick={handleOpenUpdateConfirm}
                />
              </section>
            ) : (
              <section className="Item_Movie_Editing_Buttons">
                <Tooltip
                  title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  placement="top"
                >
                  <IconButton
                    onClick={handleToggleFavorite}
                    size="small"
                    className="item_movie_favorite_ico"
                    aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    sx={{
                      border: 'solid 1px',
                      borderRadius: '10px',
                      padding: '0.3rem 0.5rem',
                      color: isFavorite ? 'error.main' : 'whitesmoke',
                      transition: 'transform 0.15s ease, color 0.15s ease',
                      '&:hover': {
                        color: 'error.main',
                        transform: 'scale(1.15)',
                      },
                    }}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
                <div className="Item_Movie_Editing_Buttons_2">
                  <ModeIcon className="item_movie_mode_ico" onClick={() => isModifyMode()} />
                  <DeleteIcon
                    className="item_movie_delete_ico"
                    onClick={() => handleOpenDeleteConfirm(movieData.id)}
                  />
                </div>
              </section>
            )}

            <Dialog open={isConfirmUpdateOpen} onClose={handleCloseUpdateConfirm}>
              <DialogTitle>Confirmer la mise à jour</DialogTitle>
              <DialogContent>
                <DialogContentText>Es-tu sûr de vouloir mettre à jour ce film ?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseUpdateConfirm} color="primary">
                  Annuler
                </Button>
                <Button onClick={handleUpdateMovie} color="primary" autoFocus>
                  Confirmer
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={isConfirmDeleteOpen} onClose={handleCloseDeleteConfirm}>
              <DialogTitle>Confirmer Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>Es-tu sûr de vouloir effacer ce film ?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteConfirm} color="primary">
                  Annuler
                </Button>
                <Button onClick={handleDeleteMovie} color="primary" autoFocus>
                  Confirmer
                </Button>
              </DialogActions>
            </Dialog>

            <Backdrop
              sx={(theme) => ({
                color: '#fff',
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={isUpdating} // Contrôle l'affichage avec isUpdating
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </section>
        ) : (
          <section className="Item_Movie_Editing_Buttons_user">
            <Tooltip
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              placement="top"
            >
              <IconButton
                onClick={toggleFavorite}
                size="small"
                className="item_movie_favorite_ico"
                aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                sx={{
                  border: 'solid 1px',
                  borderRadius: '10px',
                  padding: '0.3rem 0.5rem',
                  color: isFavorite ? 'error.main' : 'var(--color-01)',
                  transition: 'transform 0.15s ease, color 0.15s ease',
                  '&:hover': {
                    color: 'error.main',
                    transform: 'scale(1.15)',
                  },
                }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </section>
        )}
        {/* END EDITING BUTTON */}

        {/* MODAL TRANSFERT LIST */}
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
              <TransferList
                dataType={dataType}
                items={data}
                selectedKinds={selectedKinds}
                onSelectedKindsUpdate={handleSelectedKindsUpdate}
                selectedDirectors={selectedDirectors}
                onSelectedDirectorsUpdate={handleSelectedDirectorsUpdate}
                selectedCasting={selectedCasting}
                onSelectedCastingUpdate={handleSelectedCastingUpdate}
                selectedScreenwriters={selectedScreenwriters}
                onSelectedScreenwritersUpdate={handleSelectedScreenwritersUpdate}
                selectedMusic={selectedMusic}
                onSelectedMusicUpdate={handleSelectedMusicUpdate}
                selectedStudios={selectedStudios}
                onSelectedStudiosUpdate={handleSelectedStudiosUpdate}
                selectedCountries={selectedCountries}
                onSelectedCountriesUpdate={handleSelectedCountriesUpdate}
                selectedTags={selectedTags}
                onSelectedTagsUpdate={handleSelectedTagsUpdate}
                selectedFocus={selectedFocus}
                onSelectedFocusUpdate={handleSelectedFocusUpdate}
              />
            </Container>
          </Box>
        </Modal>
        {/* END MODAL TRANSFERT LIST */}
      </div>
    </article>
  ); // end return
}

export default MovieCard;
