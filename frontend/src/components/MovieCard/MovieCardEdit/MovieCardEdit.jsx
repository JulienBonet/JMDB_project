import TextField from '@mui/material/TextField';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import MovieCardEditHeader from './MovieCardEditHeader';
import TvShowFields from '../TvShowFields';

const MovieCardEdit = ({
  isTvShow,
  idTheMovieDb,
  movieData,
  setMovieData,
  safeValue,
  handleChange,
  textFieldSx,
  selectedFocus,
  selectedKinds,
  handleOpenModal,
  getSelectedNames,
  refetchMovieTMDB,
  searchGenreInDatabase,
  createGenreInDatabase,
  setSelectedKinds,
  searchStudioInDatabase,
  createStudioInDatabase,
  setSelectedStudios,
  searchCountryInDatabase,
  createCountryInDatabase,
  setSelectedCountries,
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
  setImage,
  setShowUploadButton,
  setShowImageButton,
  refetchAltTitle,
  refetchGenres,
  refetchYear,
  refetchDuration,
  selectedSeasons,
  setSelectedSeasons,
  seasonsInfo,
  tvSeasons,
  setTvSeasons,
  nbTvEpisodes,
  setNbTvEpisodes,
}) => {
  return (
    <div className="infos_bloc_1_modify">
      {/* Type + TMDB - Title - Focus - Alt Title - Genre(s) - Year */}
      <MovieCardEditHeader
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
      />
      {/* END Type + TMDB - Title - Focus - Alt Title - Genre(s) - Year */}

      {/* TV saison - episode /+/ duration (modify) */}
      {isTvShow ? (
        <TvShowFields
          selectedSeasons={selectedSeasons}
          setSelectedSeasons={setSelectedSeasons}
          seasonsInfo={seasonsInfo}
          tvSeasons={tvSeasons}
          setTvSeasons={setTvSeasons}
          nbTvEpisodes={nbTvEpisodes}
          setNbTvEpisodes={setNbTvEpisodes}
          movieData={movieData}
          setMovieData={setMovieData}
          textFieldSx={textFieldSx}
        />
      ) : (
        <div className="box_item_form">
          <TextField
            label="Durée (minutes)"
            name="duration"
            value={safeValue(movieData.duration)}
            onChange={(e) =>
              setMovieData((prev) => ({
                ...prev,
                duration: e.target.value,
              }))
            }
            fullWidth
            type="number"
            sx={textFieldSx}
          />

          {idTheMovieDb && (
            <CloudSyncIcon
              className="Btn_Refresh_items_MovieCard"
              onClick={() =>
                refetchDuration(idTheMovieDb, {
                  movieData,
                  setMovieData,
                })
              }
            />
          )}
        </div>
      )}
      {/* END TV saison - episode /+/ duration */}
    </div>
  );
};

export default MovieCardEdit;
