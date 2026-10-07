// admin Réalisateurs - Casting - Scénaristes - Compositeurs - Studios
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Card, CardContent, Stack, Typography, TextField, Box, Switch } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
// styles react-quill
import 'react-quill/dist/quill.snow.css';
import '../../../assets/css/reactQuill_html_parametrage.css';
// services
import { updateAdminItem, updateAdminItemImage } from '../../../services/adminItemService';
// components
import AdminItemsCardImage from './AdminItemsCardShared/AdminItemsCardImage';
import AdminItemsCardActions from './AdminItemsCardShared/AdminItemsCardActions';
import AdminItemsCardResponsiveDivider from './AdminItemsCardShared/AdminItemsCardResponsiveDivider';
// SX
import { labelSx, infoSx, inputSx, pitchDisplaySx } from './constants/adminItemsCardStyles';

function AdminItemsCardArtists({ item, origin, onUpdate, closeModal }) {
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  // Fonction Cloudinary
  const getImageUrl = (publicId) => {
    if (!publicId) return '00_jmtb_item_default.jpg';
    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  };

  const [isModify, setIsModify] = useState(false);
  const [name, setName] = useState(item.name || '');
  const [pitch, setPitch] = useState(item.pitch || '');
  const [wikilink, setWikilink] = useState(item.wikilink || '');
  const [imdblink, setImdblink] = useState(item.imdblink || '');
  const [senscritiquelink, setSenscritiquelink] = useState(item.senscritiquelink || '');
  const [websitelink, setWebsitelink] = useState(item.websitelink || '');
  const [birthDate, setBirthDate] = useState(item.birthDate || '');
  const [deathDate, setDeathDate] = useState(item.deathDate || '');
  const [isFocus, setIsFocus] = useState(item.isFocus || '');
  const [image, setImage] = useState(getImageUrl(item.image));
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isArtistFocus = origin === 'director' || origin === 'casting';

  const openModif = () => {
    setIsModify(true);
  };

  const handleReturn = () => {
    closeModal();
  };

  const handleUpdateImage = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return null;

    const data = await updateAdminItemImage(origin, item.id, file);

    return data.url;
  };

  const handleValidate = async () => {
    try {
      setIsLoading(true);

      const hasChanges =
        name !== item.name ||
        (isArtistFocus && pitch !== item.pitch) ||
        (isArtistFocus && wikilink !== item.wikilink) ||
        (isArtistFocus && imdblink !== item.imdblink) ||
        (isArtistFocus && senscritiquelink !== item.senscritiquelink) ||
        (isArtistFocus && websitelink !== item.websitelink) ||
        (isArtistFocus && birthDate !== item.birthDate) ||
        (isArtistFocus && deathDate !== item.deathDate) ||
        (isArtistFocus && isFocus !== item.isFocus);

      if (hasChanges) {
        const data = { name };

        if (isArtistFocus) {
          data.pitch = pitch || null;
          data.wikilink = wikilink || null;
          data.imdblink = imdblink || null;
          data.senscritiquelink = senscritiquelink || null;
          data.websitelink = websitelink || null;
          data.birthDate = birthDate || null;
          data.deathDate = deathDate || null;
          data.isFocus = Boolean(isFocus);
        }

        await updateAdminItem(origin, item.id, data);
      }

      // UPLOAD IMAGE CLOUDINARY

      let newImageUrl = image;

      if (fileInputRef.current.files[0]) {
        newImageUrl = await handleUpdateImage();
        setImage(newImageUrl);
      }

      toast.success(`${origin} successfully updated`, {
        className: 'custom-toast',
      });

      setIsModify(false);
      setShowUploadButton(true);

      onUpdate();
      closeModal();
    } catch (err) {
      toast.error(`Erreur : ${err.message}`, { className: 'custom-toast' });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonctions pour filtrer les caractères interdits
  const regexInput = (value) => {
    return value.replace(/[/\\]/g, '-');
  };

  const handleNameChange = (e) => {
    const sanitizedValue = regexInput(e.target.value);
    setName(sanitizedValue);
  };
  // end Fonctions pour filtrer les caractères interdits

  const handleUndo = () => {
    setIsModify(false);
    setName(item.name);
    setPitch(item.pitch);
    setBirthDate(item.birthDate);
    setDeathDate(item.deathDate);
    setWikilink(item.wikilink);
    setImdblink(item.imdblink);
    setSenscritiquelink(item.senscritiquelink);
    setWebsitelink(item.websitelink);
    setIsFocus(item.isFocus);
    setImage(getImageUrl(item.image));
    setShowUploadButton(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const newImageUrl = URL.createObjectURL(file);
    setImage(newImageUrl);
    setShowUploadButton(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleResetImage = () => {
    setImage(getImageUrl(item.image));
    setShowUploadButton(true);
  };

  // -------------------------------
  // HTML MODULE -- ReactQuill
  // -------------------------------
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet'];

  // -------------------------------
  // SX
  // -------------------------------

  const linkSx = {
    ...infoSx,
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  };

  return (
    <Card
      id="AdminItemsCardArtists"
      sx={{
        bgcolor: 'var(--color-04)',
        mx: '5%',
        p: 2,
      }}
    >
      {/* CARD CONTENTS */}
      <CardContent
        id="AdminItemsCardArtists_Content"
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          justifyContent: 'space-between',
          gap: 2,
          p: 0,
          '&:last-child': {
            pb: 0,
          },
        }}
      >
        {/* IMAGE - placement version mobile/tablette */}
        <Stack
          id="AdminItemsCardArtists_ImageMobile"
          sx={{
            display: {
              xs: 'flex',
              lg: 'none',
            },
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: {
              xs: '100%',
              lg: '25%',
            },
          }}
        >
          <AdminItemsCardImage
            image={image}
            itemName={item.name}
            isModify={isModify}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            showUploadButton={showUploadButton}
            handleUploadClick={handleUploadClick}
            handleResetImage={handleResetImage}
          />

          {/* divider mobile/tablette */}
          <AdminItemsCardResponsiveDivider />
          {/* end divider mobile/tablette */}
        </Stack>
        {/* END IMAGE - placement version mobile/tablette */}

        {/* CARD INFORMATIONS / ACTIONS */}
        <Stack
          id="AdminItemsCardArtists_Infos_actions"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: {
              xs: '95%',
              lg: '70%',
            },
            mx: {
              xs: 'auto',
              lg: 0,
            },
            p: 1,
          }}
        >
          {/* ID */}
          <Stack id="ID_AdminItemsCardArtist" direction="row" spacing={2} alignItems="center">
            <Typography sx={labelSx}>ID:</Typography>

            <Typography sx={infoSx}>{item.id}</Typography>
          </Stack>
          {/* END ID */}

          {/* NAME */}
          <Stack
            id="NAME_AdminItemsCardArtist"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Typography sx={labelSx}>NAME:</Typography>

            {isModify ? (
              <TextField
                type="text"
                size="small"
                value={name}
                onChange={handleNameChange}
                fullWidth
                sx={inputSx}
              />
            ) : (
              <Typography sx={infoSx}>{name}</Typography>
            )}
          </Stack>
          {/* END NAME */}

          {/* BIRTH */}
          {isArtistFocus && (
            <Stack id="BIRTH_AdminItemsCardArtist" direction="row" spacing={2} alignItems="center">
              <Typography sx={labelSx}>BIRTH:</Typography>
              {isModify ? (
                <TextField
                  type="text"
                  size="small"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  fullWidth
                  sx={inputSx}
                />
              ) : (
                <Typography sx={infoSx}>{birthDate}</Typography>
              )}
            </Stack>
          )}
          {/* END BIRTH */}

          {isArtistFocus && (
            <>
              {/* DEATH */}
              <Stack
                id="DEATH_AdminItemsCardArtist"
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Typography sx={labelSx}>DEATH:</Typography>
                {isModify ? (
                  <TextField
                    type="text"
                    size="small"
                    value={deathDate}
                    onChange={(e) => setDeathDate(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                ) : (
                  <Typography sx={infoSx}>{deathDate}</Typography>
                )}
              </Stack>
              {/* END DEATH */}

              {/* PITCH TEXT */}
              <Stack
                id="PITCH_AdminItemsCardArtist"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'flex-start' }}
              >
                <Typography sx={labelSx}>PITCH:</Typography>
                {isModify ? (
                  <Box
                    id="AdminItemsCardArtist_ReactQuill"
                    sx={{
                      width: { xs: '100%', sm: '91%' },
                      minHeight: '200px',
                    }}
                  >
                    <ReactQuill
                      value={pitch}
                      onChange={setPitch}
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      className="Items_info"
                    />
                  </Box>
                ) : (
                  <Box
                    id="AdminItemsCardArtists_PitchPreview"
                    className="Items_info"
                    sx={pitchDisplaySx}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(pitch),
                    }}
                  />
                )}
              </Stack>
              {/* END PITCH TEXT */}

              {/* WIKIPEDIA LINK */}
              <Stack
                id="WIKIPEDIA_AdminItemsCardArtist"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Typography sx={labelSx}>WIKIPEDIA: </Typography>
                {isModify ? (
                  <TextField
                    type="text"
                    size="small"
                    value={wikilink}
                    onChange={(e) => setWikilink(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                ) : (
                  <Typography sx={linkSx}>{wikilink}</Typography>
                )}
              </Stack>
              {/* END WIKIPEDIA LINK */}

              {/* IMDB LINK */}
              <Stack
                id="IMDB_AdminItemsCardArtist"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Typography sx={labelSx}>IMDB: </Typography>
                {isModify ? (
                  <TextField
                    type="text"
                    size="small"
                    value={imdblink}
                    onChange={(e) => setImdblink(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                ) : (
                  <Typography sx={linkSx}>{imdblink}</Typography>
                )}
              </Stack>
              {/* END IMDB LINK */}

              {/* SENS CRITIQUE LINK */}
              <Stack
                id="SENSCRITIQUE_AdminItemsCardArtist"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Typography sx={labelSx}>SENS CRITIQUE: </Typography>
                {isModify ? (
                  <TextField
                    type="text"
                    size="small"
                    value={senscritiquelink}
                    onChange={(e) => setSenscritiquelink(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                ) : (
                  <Typography sx={linkSx}>{senscritiquelink}</Typography>
                )}
              </Stack>
              {/* END SENS CRITIQUE LINK */}

              {/* WEBSITE LINK */}
              <Stack
                id="WEBSITE_AdminItemsCardArtist"
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Typography sx={labelSx}>WEBSITE: </Typography>
                {isModify ? (
                  <TextField
                    type="text"
                    size="small"
                    value={websitelink}
                    onChange={(e) => setWebsitelink(e.target.value)}
                    fullWidth
                    sx={inputSx}
                  />
                ) : (
                  <Typography sx={linkSx}>{websitelink}</Typography>
                )}
              </Stack>
              {/* WEBSITE LINK */}

              {/* FOCUS SWITCH */}
              <Stack
                id="isFOCUS_AdminItemsCardArtist"
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Typography sx={labelSx}>FOCUS: </Typography>
                {isModify ? (
                  <Switch
                    checked={Boolean(isFocus)}
                    onChange={(e) => setIsFocus(e.target.checked)}
                  />
                ) : (
                  <Typography sx={infoSx}>{isFocus ? 'OUI' : 'NON'}</Typography>
                )}
              </Stack>
              {/* END FOCUS SWITCH */}
            </>
          )}

          <AdminItemsCardActions
            isEditing={isModify}
            isLoading={isLoading}
            onReturn={handleReturn}
            onEdit={openModif}
            onValidate={handleValidate}
            onUndo={handleUndo}
          />
        </Stack>
        {/* END CARD INFORMATIONS / ACTIONS */}

        {/* IMAGE - version desktop */}
        <Stack
          id="AdminItemsCardArtist_ImageDesktop"
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '25%',
          }}
        >
          {/* image desktop */}
          <AdminItemsCardImage
            image={image}
            itemName={item.name}
            isModify={isModify}
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            showUploadButton={showUploadButton}
            handleUploadClick={handleUploadClick}
            handleResetImage={handleResetImage}
          />
        </Stack>
        {/* END IMAGE - version desktop */}
      </CardContent>
      {/* END CARD CONTENTS */}
    </Card>
  );
}

export default AdminItemsCardArtists;
