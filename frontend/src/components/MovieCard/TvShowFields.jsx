import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
// SX
import { dividerSx } from './constant/MovieCardEditStyle';

const TvShowFields = ({
  selectedSeasons,
  setSelectedSeasons,
  seasonsInfo,
  tvSeasons,
  setTvSeasons,
  nbTvEpisodes,
  setNbTvEpisodes,
  movieData,
  setMovieData,
  textFieldSx,
}) => {
  const renderEpisodeDurationFields = () => (
    <>
      <TextField
        name="tvSeasons"
        label="Saisons sélectionnées"
        value={tvSeasons}
        onChange={(e) => {
          const { value } = e.target;
          setTvSeasons(value);
          setMovieData((prev) => ({ ...prev, tvSeasons: value }));
        }}
        sx={textFieldSx}
      />

      <TextField
        name="nbTvEpisodes"
        label="Nombre d'épisodes"
        type="number"
        value={nbTvEpisodes || ''}
        onChange={(e) => {
          const value = Number(e.target.value);
          setNbTvEpisodes(value);
          setMovieData((prev) => ({ ...prev, nbTvEpisodes: value }));
        }}
        sx={textFieldSx}
      />

      <TextField
        name="episodeDuration"
        label="Durée d’un épisode (min)"
        type="number"
        value={movieData.episodeDuration || ''}
        onChange={(e) => {
          const value = Number(e.target.value);

          setMovieData((prev) => {
            const updated = { ...prev, episodeDuration: value };

            if (nbTvEpisodes > 0) {
              updated.duration = nbTvEpisodes * value;
            }

            return updated;
          });
        }}
        sx={textFieldSx}
      />

      <TextField
        name="duration"
        label="Durée totale (minutes)"
        value={movieData.duration || ''}
        InputProps={{ readOnly: true }}
        sx={textFieldSx}
      />
    </>
  );

  if (seasonsInfo.length > 0) {
    return (
      <>
        <Box sx={{ ...dividerSx, my: 1 }} />

        <FormControl sx={textFieldSx}>
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
            {seasonsInfo.map((season) => (
              <MenuItem key={season.season_number} value={season.season_number}>
                <Checkbox
                  checked={
                    Array.isArray(selectedSeasons) && selectedSeasons.includes(season.season_number)
                  }
                />

                <ListItemText
                  primary={`Saison ${season.season_number} (${season.episode_count} épisodes)`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {renderEpisodeDurationFields()}
      </>
    );
  }

  return renderEpisodeDurationFields();
};

export default TvShowFields;
