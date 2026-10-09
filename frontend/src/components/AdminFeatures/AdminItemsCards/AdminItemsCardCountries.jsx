// admin Pays
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { Card, CardContent, Stack, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Services
import { updateAdminItem, updateAdminItemImage } from '../../../services/adminItemService';
// Components
import AdminItemsCardImage from './AdminItemsCardShared/AdminItemsCardImage';
import AdminItemsCardActions from './AdminItemsCardShared/AdminItemsCardActions';
import AdminItemsCardResponsiveDivider from './AdminItemsCardShared/AdminItemsCardResponsiveDivider';
// SX
import { labelSx, infoSx, inputSx } from './constants/adminItemsCardStyles';

function AdminItemsCardCountries({ item, origin, onUpdate, closeModal }) {
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  // Fonction Cloudinary
  const getImageUrl = (publicId) => {
    if (!publicId) return '00_jmtb_item_default.jpg';
    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  };

  const [isModify, setIsModify] = useState(false);
  const [name, setName] = useState(item.name);
  const [image, setImage] = useState(getImageUrl(item.image));
  const [showUploadButton, setShowUploadButton] = useState(true);
  const fileInputRef = useRef(null);

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

    return data.url; // cloudinary url
  };

  const handleValidate = async () => {
    try {
      const hasChanges = name !== item.name;

      if (hasChanges) {
        const data = {
          name,
        };

        // 1. Mettre à jour les infos
        await updateAdminItem(origin, item.id, data);
      }

      // 2. Mettre à jour l'image
      let newImageUrl = image;
      if (fileInputRef.current.files[0]) {
        newImageUrl = await handleUpdateImage();
      }

      // Mettre à jour l'état avec la nouvelle URL d'image
      if (newImageUrl) {
        setImage(newImageUrl);
      }

      // 3. Réinitialiser les états locaux
      toast.success(`${origin} successfully updated`, {
        className: 'custom-toast',
      });
      setIsModify(false);
      setShowUploadButton(true);

      onUpdate();
      closeModal();
    } catch (error) {
      console.error('Request error:', error);
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
    setName(item.name);
    setImage(getImageUrl(item.image));
    setIsModify(false);
    setShowUploadButton(true);
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

  return (
    <Card
      id="AdminItemsCardCountries"
      sx={{
        bgcolor: 'var(--color-04)',
        mx: '5%',
        p: 2,
      }}
    >
      {/* CARD CONTENTS */}
      <CardContent
        id="AdminItemsCardCountries_Content"
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
          id="AdminItemsCardCountries_ImageMobile"
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
          {/* image mobile/tablette */}
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
          {/* end image mobile/tablette */}

          {/* divider mobile/tablette */}
          <AdminItemsCardResponsiveDivider />
          {/* end divider mobile/tablette */}
        </Stack>
        {/* End IMAGE - placement version mobile/tablette */}

        {/* CARD INFORMATIONS / ACTIONS */}
        <Stack
          id="AdminItemsCardCountries_Infos_actions"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: {
              xs: '95%',
              lg: '70%',
            },
            mx: {
              xs: 'auto',
              lg: 0,
            },
          }}
        >
          {/* ID */}
          <Stack id="ID_AdminItemsCardCountries" direction="row" spacing={2} alignItems="center">
            <Typography sx={labelSx}>ID:</Typography>

            <Typography sx={infoSx}>{item.id}</Typography>
          </Stack>
          {/* END ID */}

          {/* NAME */}
          <Stack id="NAME_AdminItemsCardCountries" direction="row" spacing={2} alignItems="center">
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

          {/* ACTIONS */}
          <AdminItemsCardActions
            isEditing={isModify}
            onReturn={handleReturn}
            onEdit={openModif}
            onValidate={handleValidate}
            onUndo={handleUndo}
          />
          {/* END ACTIONS */}
        </Stack>
        {/* END CARD INFORMATIONS / ACTIONS */}

        {/* IMAGE - version desktop */}
        <Stack
          id="AdminItemsCardCountries_ImageDesktop"
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
          {/* end image desktop */}
        </Stack>
        {/* END IMAGE - version desktop */}
      </CardContent>
      {/* END CARD CONTENTS */}
    </Card>
  );
}

export default AdminItemsCardCountries;
