import { Box, Button, FormControlLabel, IconButton, TextField } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Switch from '@mui/material/Switch';

import TvSeasonEpisodeFields from '../TvSeasonEpisodeFields';
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
    <section className="Adm_l1">
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
    </section>
  );
}

export default AddMovieMainSection;
