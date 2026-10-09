/* eslint-disable react/prop-types */

// -----------------------------
// COLUMN 2 - MAIN SECTION FORM
// -----------------------------

import { Box, TextField } from '@mui/material';
import MovieRelationField from './MovieRelationField';

function AddMovieRelationsSection({
  idTheMovieDb,
  handleChangeMovieDb,
  isTvShow,
  getSelectedNames,
  handleOpenModal,
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
  const relations = [
    {
      id: 'AdM_kinds_item',
      label: 'Genre(s)',
      selected: selectedKinds,
      modal: 'kinds',
    },
    {
      id: 'AdM_Directors_item',
      label: isTvShow ? 'Créateur(s)' : 'Réalisateur(s)',
      selected: selectedDirectors,
      modal: 'directors',
    },
    {
      id: 'AdM_Screenwriters_item',
      label: 'Scénariste(s)',
      selected: selectedScreenwriters,
      modal: 'screenwriters',
    },
    {
      id: 'AdM_Compositors_item',
      label: 'Compositeur(s)',
      selected: selectedMusic,
      modal: 'music',
    },
    {
      id: 'AdM_Casting_item',
      label: 'Casting',
      selected: selectedCasting,
      modal: 'casting',
    },
    {
      id: 'AdM_Studios_item',
      label: 'Studio',
      selected: selectedStudios,
      modal: 'studio',
    },
    {
      id: 'AdM_Countries_item',
      label: 'Pays',
      selected: selectedCountries,
      modal: 'country',
    },
    {
      id: 'AdM_Languages_item',
      label: 'Langues',
      selected: selectedLanguages,
      modal: 'languages/sorted_id',
    },
    {
      id: 'AdM_Tags_item',
      label: 'Tags',
      selected: selectedTags,
      modal: 'tags/sorted_id',
    },
    {
      id: 'AdM_Focus_item',
      label: 'Focus',
      selected: selectedFocus,
      modal: 'focus',
    },
  ];

  return (
    <Box
      id="AdM_Main_column_2"
      sx={{
        width: {
          xs: '95%',
          lg: '40%',
        },
        p: 2,
      }}
    >
      {/* Movie TMDB ID */}
      <Box
        component="form"
        id="AdM_idTheMovieDb"
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
          value={idTheMovieDb}
          onChange={handleChangeMovieDb}
        />{' '}
      </Box>

      {/* Movie relations */}
      {relations.map((relation) => (
        <MovieRelationField
          key={relation.id}
          id={relation.id}
          label={relation.label}
          value={getSelectedNames(relation.selected)}
          onAdd={() => handleOpenModal(relation.modal)}
        />
      ))}
    </Box>
  );
}

export default AddMovieRelationsSection;
