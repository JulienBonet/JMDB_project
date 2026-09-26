import { Box } from '@mui/material';
import AddMovieRelationsSection from './AddMovieRelationsSection';
import AddMovieMainInfoSection from './AddMovieMainInfoSection';

function AddMovieMainSection({
  movie,
  setMovie,
  handleInputChange,
  handleOpenModalMIE,
  resetStates,
  handleChangeMovieDb,
  handleOpenModal,
  getSelectedNames,
  seasonsInfo,
  tvSeasons,
  nbTvEpisodes,
  selectedSeasons,
  setTvSeasons,
  setNbTvEpisodes,
  setSelectedSeasons,
  handleFormSubmit,
  selectedKinds,
  selectedDirectors,
  selectedScreenwriters,
  selectedMusic,
  selectedCasting,
  selectedStudios,
  selectedCountries,
  selectedLanguages,
  selectedTags,
  selectedFocus,
}) {
  return (
    <Box
      component="section"
      id="AdM_Main_columns_1_2"
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
      }}
    >
      {/* COLUMN 1 - MAIN SECTION FORM */}
      <AddMovieMainInfoSection
        movie={movie}
        setMovie={setMovie}
        handleInputChange={handleInputChange}
        handleOpenModalMIE={handleOpenModalMIE}
        resetStates={resetStates}
        seasonsInfo={seasonsInfo}
        tvSeasons={tvSeasons}
        nbTvEpisodes={nbTvEpisodes}
        selectedSeasons={selectedSeasons}
        setTvSeasons={setTvSeasons}
        setNbTvEpisodes={setNbTvEpisodes}
        setSelectedSeasons={setSelectedSeasons}
        handleFormSubmit={handleFormSubmit}
      />
      {/* END COLUMN 1 - MAIN SECTION FORM */}

      {/* COLUMN 2 - MAIN SECTION FORM */}
      <AddMovieRelationsSection
        idTheMovieDb={movie.idTheMovieDb}
        handleChangeMovieDb={handleChangeMovieDb}
        isTvShow={movie.isTvShow}
        getSelectedNames={getSelectedNames}
        handleOpenModal={handleOpenModal}
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
      />
      {/* END COLUMN 2 - MAIN SECTION FORM */}
    </Box>
  );
}

export default AddMovieMainSection;
