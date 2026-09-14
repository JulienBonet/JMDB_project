import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';

function AddMovieMediaSection({
  movie,
  setMovie,
  version,
  setVersion,
  coverPreview,
  fileCoverRef,
  handleCoverChange,
  fileInputRef,
  selectedFile,
  handleFileChange,
  handleFolderChange,
  handleFormatSupportChange,
  formatsHandleChange,
}) {
  return (
    <section className="Adm_l2">
      {/* movie FILE */}
      <div className="Adm_l2a">
        {/* movie SUPPORT */}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-select-small-label">Support</InputLabel>

          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={movie.videoSupport || ''}
            label="Support"
            onChange={handleFormatSupportChange}
          >
            <MenuItem value="">
              <em>choisir un support</em>
            </MenuItem>
            <MenuItem value="DVD original">DVD</MenuItem>
            <MenuItem value="DVD R/RW">DVD R/RW</MenuItem>
            <MenuItem value="Fichier multimédia">FICHIER MULTIMEDIA</MenuItem>
          </Select>
        </FormControl>

        {movie.videoSupport === 'Fichier multimédia' && (
          <>
            <div>
              {/* movie VIDEOFORMAT */}
              <Box
                component="form"
                sx={{ '& > :not(style)': { width: '25ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap={4}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>format</InputLabel>

                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={movie.videoFormat || ''}
                    label="format"
                    onChange={formatsHandleChange}
                  >
                    <MenuItem value="">
                      <em>choisir un format</em>
                    </MenuItem>
                    <MenuItem value="avi">avi</MenuItem>
                    <MenuItem value="mkv">mkv</MenuItem>
                    <MenuItem value="mp4">mp4</MenuItem>
                  </Select>
                </FormControl>

                {/* movie FILESIZE */}
                <TextField
                  label="File Size"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  value={movie.fileSize || ''}
                  onChange={(event) =>
                    setMovie((prev) => ({
                      ...prev,
                      fileSize: event.target.value,
                    }))
                  }
                />
              </Box>
            </div>

            {/* movie LOCAL PATH */}
            {movie.isTvShow ? (
              <>
                {/* Sélection d’un dossier complet */}
                <Box display="flex" alignItems="center" gap={2} p={1} sx={{ flexGrow: 1 }}>
                  <TextField
                    label="Dossier sélectionné"
                    variant="outlined"
                    value={movie.path || ''}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />

                  {/* Input caché pour sélectionner un dossier */}
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    webkitdirectory="true"
                    multiple
                    onChange={handleFolderChange}
                  />

                  <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                    Sélectionner un dossier
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                component="form"
                sx={{ flexgrow: 1 }}
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                gap={2}
                p={1}
              >
                {/* Champ pour le chemin du dossier */}
                <TextField
                  label="Chemin du dossier"
                  variant="outlined"
                  value={movie.path || ''}
                  onChange={(e) => {
                    const userPathInput = e.target.value;
                    const cleanedPath = userPathInput
                      .replace(/^[A-Za-z]:[\\/]+/, '')
                      .replace(/[\\/]+$/, '');

                    setMovie((prev) => ({
                      ...prev,
                      path: userPathInput,
                      location: selectedFile ? `${cleanedPath}\\${selectedFile.name}` : '',
                    }));
                  }}
                  fullWidth
                />

                {/* Sélection d’un fichier unique */}
                <TextField
                  label="Fichier sélectionné"
                  variant="outlined"
                  value={selectedFile ? selectedFile.name : ''}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />

                <Button
                  variant="outlined"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    } else {
                      console.warn('fileInputRef is not attached to any input element');
                    }
                  }}
                >
                  Sélectionner un fichier vidéo
                </Button>

                {/* Input caché pour le vrai fichier */}
                <input
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </Box>
            )}

            {/* movie VERSION (vostfr or multi) */}
            <FormControl sx={{ m: 1 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">version:</FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              >
                <FormControlLabel value="none" control={<Radio />} label="none" />
                <FormControlLabel value="VOSTFR" control={<Radio />} label="VOSTFR" />
                <FormControlLabel value="MULTI" control={<Radio />} label="MULTI" />
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>

      {/* movie COVER */}
      <div className="Adm_l2b">
        <img className="preview_cover" src={coverPreview} alt="Couverture" />

        <input
          type="file"
          name="cover"
          style={{ display: 'none' }}
          onChange={handleCoverChange}
          ref={fileCoverRef}
          accept="image/*"
        />

        <button type="button" onClick={() => fileCoverRef.current.click()}>
          Sélectionner une image
        </button>
      </div>
    </section>
  );
}

export default AddMovieMediaSection;
