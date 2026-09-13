import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';

function TvSeasonEpisodeFields({
  seasonsInfo,
  movie,
  tvSeasons,
  nbTvEpisodes,
  selectedSeasons,
  setMovie,
  setTvSeasons,
  setNbTvEpisodes,
  setSelectedSeasons,
}) {
  const renderEpisodeAndDurationFields = (isReadOnly = false) => (
    // on garde l'option (isReadOnly = false) si on veut bloquer certains champs plus tard
    <>
      <TextField
        name="tvSeasons"
        label="Saisons sélectionnées"
        value={tvSeasons || ''}
        onChange={(e) => {
          const { value } = e.target;
          setTvSeasons(value);
          setMovie((prev) => ({ ...prev, tvSeasons: value }));
        }}
        sx={{ flexGrow: 1 }}
      />

      <TextField
        name="nbTvEpisodes"
        label="Nombre d’épisodes"
        type="number"
        value={nbTvEpisodes || ''}
        onChange={(e) => {
          const value = Number(e.target.value);
          setNbTvEpisodes(value);
          setMovie((prev) => ({ ...prev, nbTvEpisodes: value }));
        }}
        InputProps={{ readOnly: isReadOnly }}
        sx={{ flexGrow: 1 }}
      />

      <TextField
        name="episodeDuration"
        type="number"
        label="Durée d’un épisode (min)"
        value={movie.episodeDuration || ''}
        onChange={(e) => {
          const value = Number(e.target.value);

          setMovie((prev) => ({
            ...prev,
            episodeDuration: value,
          }));
        }}
        InputProps={{ readOnly: isReadOnly }}
        sx={{ flexGrow: 1 }}
      />

      <TextField
        name="duration"
        label="Durée totale (minutes)"
        value={movie.duration || ''}
        InputProps={{ readOnly: true }}
        sx={{ flexGrow: 1 }}
      />
    </>
  );

  // --- Mode API ---
  if (seasonsInfo.length > 0) {
    return (
      <>
        <FormControl sx={{ flexGrow: 1 }}>
          <InputLabel id="season-select-label">Saisons</InputLabel>

          <Select
            labelId="season-select-label"
            multiple
            value={Array.isArray(selectedSeasons) ? selectedSeasons : []}
            onChange={(e) => {
              let { value } = e.target;

              if (!Array.isArray(value)) {
                value = [value];
              }

              value = value.map((v) => Number(v));

              setSelectedSeasons(value);
            }}
            input={<OutlinedInput label="Saisons" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {Array.from({ length: movie.nbTvSeasons || 0 }, (_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                <Checkbox
                  checked={Array.isArray(selectedSeasons) && selectedSeasons.includes(i + 1)}
                />
                <ListItemText primary={`Saison ${i + 1}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {renderEpisodeAndDurationFields()}
      </>
    );
  }

  // --- Mode manuel ---
  return (
    <>
      <TextField
        name="tvSeasons"
        label="Saisons sélectionnées"
        value={tvSeasons || ''}
        onChange={(e) => {
          const { value } = e.target;
          setTvSeasons(value);
          setMovie((prev) => ({ ...prev, tvSeasons: value }));
        }}
        sx={{ flexGrow: 1 }}
      />

      {renderEpisodeAndDurationFields()}
    </>
  );
}

export default TvSeasonEpisodeFields;
