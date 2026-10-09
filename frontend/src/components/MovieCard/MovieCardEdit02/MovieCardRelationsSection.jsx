import { Box } from '@mui/material';
// UI
import MovieRelationField from '../ui/MovieRelationField';
// SX
import { dividerSx } from '../constant/MovieCardEditStyle';

const MovieCardRelationsSection = ({
  isTvShow,
  idTheMovieDb,
  textFieldSx,

  selectedCountries,
  selectedDirectors,
  selectedScreenwriters,
  selectedMusic,
  selectedStudios,
  selectedCasting,
  selectedTags,

  getSelectedNames,
  handleOpenModal,

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

  searchStudioInDatabase,
  createStudioInDatabase,
  setSelectedStudios,

  searchCastingInDatabase,
  createCastingInDatabase,
  setSelectedCasting,

  searchTagInDatabase,
  createTagInDatabase,
  setSelectedTags,

  refetchCountries,
  refetchDirectors,
  refetchScreenwriters,
  refetchCompositors,
  refetchStudios,
  refetchCasting,
  refetchTags,
}) => {
  // -------------------
  // RETURN
  // -------------------
  return (
    <>
      {/* Pays (edit) */}
      <MovieRelationField
        id="Country_container_MovieCardEdit"
        label="Pays"
        value={getSelectedNames(selectedCountries)}
        modalType="country"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchCountries(idTheMovieDb, {
            searchCountryInDatabase,
            createCountryInDatabase,
            setSelectedCountries,
          })
        }
      />
      {/* end Pays (modify) */}

      <Box sx={{ ...dividerSx, height: '1px', my: 0.5 }} />

      {/* Réalisateur (modify) */}
      <MovieRelationField
        id="director_container_MovieCardEdit"
        label={isTvShow ? 'Créateur:' : 'Réalisateur:'}
        value={getSelectedNames(selectedDirectors)}
        modalType="directors"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchDirectors(idTheMovieDb, {
            searchDirectorInDatabase,
            createDirectorInDatabase,
            setSelectedDirectors,
          })
        }
      />
      {/* end Réalisateur (modify) */}

      {/* Scénariste (modify) */}
      {!isTvShow && (
        <MovieRelationField
          id="Screenwriter_container_MovieCardEdit"
          label="Scénariste(s)"
          value={getSelectedNames(selectedScreenwriters)}
          modalType="screenwriters"
          handleOpenModal={handleOpenModal}
          textFieldSx={textFieldSx}
          showRefresh={!!idTheMovieDb}
          onRefresh={() =>
            refetchScreenwriters(idTheMovieDb, {
              searchScreenwriterInDatabase,
              createScreenwriterInDatabase,
              setSelectedScreenwriters,
            })
          }
        />
      )}
      {/* end Scénariste (modify) */}

      {/* Compositeur (modify) */}
      <MovieRelationField
        id="Compositor_container_MovieCardEdit"
        label="Compositeur(s)"
        value={getSelectedNames(selectedMusic)}
        modalType="music"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchCompositors(idTheMovieDb, {
            searchCompositorInDatabase,
            createCompositorInDatabase,
            setSelectedMusic,
          })
        }
      />
      {/* end Compositeur (modify) */}

      {/* Studio (modify) */}
      <MovieRelationField
        id="Studio_container_MovieCardEdit"
        label="Studio(s)"
        value={getSelectedNames(selectedStudios)}
        modalType="studio"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchStudios(idTheMovieDb, {
            searchStudioInDatabase,
            createStudioInDatabase,
            setSelectedStudios,
          })
        }
      />
      {/* end Studio (modify) */}

      {/* Casting (modify) */}
      <MovieRelationField
        id="Casting_container_MovieCardEdit"
        label="Casting"
        value={getSelectedNames(selectedCasting)}
        modalType="casting"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchCasting(idTheMovieDb, {
            searchCastingInDatabase,
            createCastingInDatabase,
            setSelectedCasting,
          })
        }
      />
      {/* end Casting (modify) */}

      {/* Tags (modify) */}
      <MovieRelationField
        id="Tags_container_MovieCardEdit"
        label="Tag"
        value={getSelectedNames(selectedTags)}
        modalType="tags"
        handleOpenModal={handleOpenModal}
        textFieldSx={textFieldSx}
        showRefresh={!!idTheMovieDb}
        onRefresh={() =>
          refetchTags(idTheMovieDb, {
            searchTagInDatabase,
            createTagInDatabase,
            setSelectedTags,
          })
        }
      />
      {/* end Tags (modify) */}
    </>
  );
};

export default MovieCardRelationsSection;
