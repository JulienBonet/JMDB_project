// frontend/src/components/MovieCard/MovieCardEdit02/MovieCardMediaSection.jsx
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';

const MovieCardMediaSection = ({
  isTvShow,
  movieData,
  setMovieData,
  safeValue,
  handleChange,
  textFieldSx,
  handleFormatSupportChange,
  fileInputRef,
  handleFolderChange,
  selectedFile,
  handleFileChange,
  version,
  handleVersionChange,
}) => {
  return (
    <>
      {/* Support (modify) */}
      <FormControl sx={textFieldSx}>
        <InputLabel>Support</InputLabel>

        <Select
          id="demo-select-small"
          name="videoSupport"
          value={safeValue(movieData.videoSupport)}
          label="Support"
          onChange={handleFormatSupportChange}
        >
          <MenuItem value="DVD original">DVD original</MenuItem>
          <MenuItem value="DVD R/RW">DVD R/RW</MenuItem>
          <MenuItem value="Fichier multimédia">Fichier multimédia</MenuItem>
        </Select>
      </FormControl>

      {movieData.videoSupport === 'Fichier multimédia' && (
        <>
          {isTvShow ? (
            // ----- CAS SÉRIE (dossier complet)
            <Box display="flex" alignItems="center" gap={2} p={1} sx={textFieldSx}>
              <TextField
                label="Dossier sélectionné"
                variant="outlined"
                value={safeValue(movieData.path)}
                InputProps={{ readOnly: true }}
                fullWidth
              />

              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                multiple
                onChange={handleFolderChange}
                webkitdirectory=""
              />

              <Button
                variant="outlined"
                sx={{
                  color: 'var(--color-03)',
                  borderColor: 'var(--color-03)',
                  '&:hover': {
                    color: 'var(--color-06)',
                    borderColor: 'var(--color-06)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                Sélectionner un dossier
              </Button>
            </Box>
          ) : (
            // ----- CAS FILM (fichier unique)
            <Box
              component="form"
              sx={textFieldSx}
              noValidate
              autoComplete="off"
              display="flex"
              flexDirection="column"
              gap={2}
              p={1}
            >
              <TextField
                label="Chemin du dossier"
                variant="outlined"
                value={safeValue(movieData.path)}
                onChange={(e) => {
                  const inputPath = e.target.value;

                  const cleaned = inputPath.replace(/^[A-Za-z]:[\\/]+/, '').replace(/[\\/]+$/, '');

                  setMovieData((prev) => ({
                    ...prev,
                    path: inputPath,
                    location: selectedFile ? `${cleaned}\\${selectedFile.name}` : '',
                  }));
                }}
                fullWidth
              />

              <TextField
                label="Fichier sélectionné"
                variant="outlined"
                value={selectedFile ? selectedFile.name : ''}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <Button
                variant="outlined"
                sx={{
                  color: 'var(--color-03)',
                  borderColor: 'var(--color-03)',
                  '&:hover': {
                    color: 'var(--color-06)',
                    borderColor: 'var(--color-06)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                Sélectionner un fichier vidéo
              </Button>

              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Box>
          )}

          {/* Champ commun : taille du fichier */}
          <TextField
            label="Taille du fichier"
            name="fileSize"
            value={safeValue(movieData.fileSize)}
            onChange={(e) => handleChange(e)}
            fullWidth
            type="text"
            sx={textFieldSx}
          />

          <FormControl sx={{ m: 1, color: 'white' }}>
            <FormLabel
              sx={{
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              }}
            >
              version:
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={version}
              onChange={handleVersionChange}
            >
              <FormControlLabel
                value="none"
                control={<Radio sx={{ color: 'white' }} />}
                label="none"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />

              <FormControlLabel
                value="VOSTFR"
                control={<Radio sx={{ color: 'white' }} />}
                label="VOSTFR"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />

              <FormControlLabel
                value="MULTI"
                control={<Radio sx={{ color: 'white' }} />}
                label="MULTI"
                sx={{
                  color: 'white',
                  '& .MuiRadio-root.Mui-checked': {
                    color: 'var(--color-03)',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </>
      )}
      {/* end Support (modify) */}
    </>
  );
};

export default MovieCardMediaSection;
