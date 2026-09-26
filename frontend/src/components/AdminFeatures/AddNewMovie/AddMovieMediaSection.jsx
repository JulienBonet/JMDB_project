// -----------------------------
// MEDIAS SECTION FORM
// ----------------------------

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
  //--------------
  // SX
  //--------------
  const btnDownloadImageSx = {
    color: 'black',
    border: 'solid 1px black',
    fontSize: 'x-small',
    '&:hover': {
      border: 'solid 1px grey',
      color: 'black',
    },
  };

  //--------------
  // RETURN
  //--------------
  return (
    <Box
      component="section"
      id="AdM_Medias_section"
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: {
          xs: 'center',
          lg: 'stretch',
        },
        py: 2,
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
      }}
    >
      {/* movie FILE */}
      <Box
        id="AdM_Media_Support"
        sx={{
          width: {
            xs: '90%',
            lg: '40%',
          },
          border: { xs: '1px dotted black' },
          p: 2,
          mb: {
            xs: 2,
            lg: 0,
          },
        }}
      >
        {/* movie SUPPORT */}
        <FormControl id="AdM_Support_FormControl" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Support</InputLabel>

          <Select
            id="AdM_Support_Select"
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
            <Box>
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
                <FormControl id="AdM_Format_FromControl" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>format</InputLabel>

                  <Select
                    id="AdM_Format_select"
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
                  id="Adm_FileSize"
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
            </Box>

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
            <FormControl id="Adm_LanguageVersion_FormControl" sx={{ m: 1 }}>
              <FormLabel>version:</FormLabel>

              <RadioGroup
                row
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
      </Box>

      {/* movie COVER */}
      <Box
        id="AdM_Media_Cover"
        sx={{
          width: {
            xs: '90%',
            lg: '40%',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dotted black',
          p: 2,
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={coverPreview}
          alt="Couverture"
          sx={{
            width: {
              xl: '20%',
              lg: '20%',
              md: '25%',
              sm: '35%',
              xs: '50%',
            },
          }}
        />

        <input
          type="file"
          name="cover"
          style={{ display: 'none' }}
          onChange={handleCoverChange}
          ref={fileCoverRef}
          accept="image/*"
        />

        <Button
          variant="outlined"
          sx={btnDownloadImageSx}
          onClick={() => fileCoverRef.current.click()}
        >
          Sélectionner une image
        </Button>
      </Box>
    </Box>
  );
}

export default AddMovieMediaSection;
