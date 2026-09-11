/* eslint-disable react/no-unknown-property */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState } from 'react';
import { toast } from 'react-toastify';
import './movieCard.css';
import './movieCardMediaQueries.css';
import './movieCard_videoPlayer_MediaQueries.css';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Modal from '@mui/material/Modal';
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
import { useMovieActions } from '../../hooks/useMovieActions';
import { useMovieRelations } from '../../hooks/useMovieRelations';
import { useTvSeasons } from '../../hooks/useTvSeasons';
import MovieCardActions from './MovieCardActions';

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
  const [version, setVersion] = useState(movie.vostfr ? 'VOSTFR' : movie.multi ? 'MULTI' : 'none');
  const [trailerMessage, setTrailerMessage] = useState('');
  // movie data
  const { movieData, setMovieData, refetchMovieData } = useMovieData(movie, origin);
  const { genres, countries, directors, screenwriters, music, studios, casting, tags, focus } =
    movieData;
  const {
    selectedKinds,
    selectedDirectors,
    selectedCasting,
    selectedScreenwriters,
    selectedMusic,
    selectedStudios,
    selectedCountries,
    selectedTags,
    selectedFocus,
    setSelectedKinds,
    setSelectedDirectors,
    setSelectedCasting,
    setSelectedScreenwriters,
    setSelectedMusic,
    setSelectedStudios,
    setSelectedCountries,
    setSelectedTags,
    setSelectedFocus,
    fetchByNames,
    getSelectedNames,
  } = useMovieRelations({
    genres,
    directors,
    casting,
    screenwriters,
    music,
    studios,
    countries,
    tags,
    focus,
  });

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
  // TV SHOW : SAISONS - EPISODES - DUREE
  //-----------------------------------------------

  const {
    selectedSeasons,
    setSelectedSeasons,
    seasonsInfo,
    tvSeasons,
    setTvSeasons,
    nbTvEpisodes,
    setNbTvEpisodes,
  } = useTvSeasons({
    isModify,
    isTvShow,
    idTheMovieDb,
    movieData,
    setMovieData,
  });

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
  // UPDATE / DELETE MOVIE
  //-----------------------------------------------

  const {
    isConfirmUpdateOpen,
    isUpdating,
    handleOpenUpdateConfirm,
    handleCloseUpdateConfirm,
    handleUpdateMovie,
    isConfirmDeleteOpen,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
    handleDeleteMovie,
  } = useMovieActions({
    movieData,
    selectedKinds,
    selectedDirectors,
    selectedCasting,
    selectedScreenwriters,
    selectedMusic,
    selectedStudios,
    selectedCountries,
    selectedTags,
    selectedFocus,
    fileCoverRef,
    handleUpdateImage,
    setMovieData,
    onUpdateMovie,
    onDeleteMovie,
    closeModifyMode,
    closeModal,
  });

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
        <MovieCardActions
          isAdmin={isAdmin}
          isModify={isModify}
          isFavorite={isFavorite}
          isUpdating={isUpdating}
          isConfirmUpdateOpen={isConfirmUpdateOpen}
          isConfirmDeleteOpen={isConfirmDeleteOpen}
          handleToggleFavorite={handleToggleFavorite}
          handleUndo={handleUndo}
          handleOpenUpdateConfirm={handleOpenUpdateConfirm}
          handleCloseUpdateConfirm={handleCloseUpdateConfirm}
          handleUpdateMovie={handleUpdateMovie}
          handleOpenDeleteConfirm={handleOpenDeleteConfirm}
          handleCloseDeleteConfirm={handleCloseDeleteConfirm}
          handleDeleteMovie={handleDeleteMovie}
          isModifyMode={isModifyMode}
          movieId={movieData.id}
          toggleFavorite={toggleFavorite}
        />
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
                onSelectedKindsUpdate={setSelectedKinds}
                selectedDirectors={selectedDirectors}
                onSelectedDirectorsUpdate={setSelectedDirectors}
                selectedCasting={selectedCasting}
                onSelectedCastingUpdate={setSelectedCasting}
                selectedScreenwriters={selectedScreenwriters}
                onSelectedScreenwritersUpdate={setSelectedScreenwriters}
                selectedMusic={selectedMusic}
                onSelectedMusicUpdate={setSelectedMusic}
                selectedStudios={selectedStudios}
                onSelectedStudiosUpdate={setSelectedStudios}
                selectedCountries={selectedCountries}
                onSelectedCountriesUpdate={setSelectedCountries}
                selectedTags={selectedTags}
                onSelectedTagsUpdate={setSelectedTags}
                selectedFocus={selectedFocus}
                onSelectedFocusUpdate={setSelectedFocus}
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
