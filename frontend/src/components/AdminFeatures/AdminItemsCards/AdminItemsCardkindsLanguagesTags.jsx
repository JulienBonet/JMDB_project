// Admin Genres - Langues - Tags
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Card, CardContent, Stack, Typography, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { updateAdminItem } from '../../../services/adminItemService';
// component
import AdminItemsCardActions from './AdminItemsCardShared/AdminItemsCardActions';
import { inputSx } from './constants/adminItemsCardStyles';

function AdminItemsCardkindsLanguagesTags({ item, origin, onUpdate, closeModal }) {
  const [isModify, setIsModify] = useState(false);
  const [name, setName] = useState(item.name);

  const openModif = () => {
    setIsModify(true);
  };

  const handleReturn = () => {
    closeModal();
  };

  const handleValidate = async () => {
    try {
      const hasChanges = name !== item.name;

      if (hasChanges) {
        const data = {
          name,
        };

        console.log('ORIGIN :', origin);
        console.log('ITEM ID :', item.id);
        console.log('DATA :', data);

        // 1. Mettre à jour les infos
        await updateAdminItem(origin, item.id, data);
      }

      // 3. Réinitialiser les états locaux
      toast.success(`${origin} successfully updated`, {
        className: 'custom-toast',
      });
      setIsModify(false);
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
    setIsModify(false);
    closeModal();
  };

  return (
    <Card
      id="KindsLangTags_Card_Container"
      sx={{
        bgcolor: 'var(--color-04)',
        mx: '5%',
        p: 2,
      }}
    >
      {/* CARD CONTENTS */}
      <CardContent id="KindsLangTags_Card_Contents">
        {/* Id */}
        <Stack id="ID_KindsLangTags_Card" direction="row" spacing={2} alignItems="center">
          <Typography fontFamily="var(--font-05)" color="var(--color-02)">
            ID:
          </Typography>

          <Typography fontFamily="var(--font-06)" color="var(--color-01)">
            {item.id}
          </Typography>
        </Stack>
        {/* end Id */}

        {/* name */}
        <Stack
          id="NAME_KindsLangTags_Card"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Typography fontFamily="var(--font-05)" color="var(--color-02)" fontSize="medium">
            NAME:
          </Typography>

          {isModify ? (
            <TextField
              size="small"
              fullWidth
              value={name}
              onChange={handleNameChange}
              sx={inputSx}
            />
          ) : (
            <Typography fontFamily="var(--font-06)" color="var(--color-01)" fontSize="medium">
              {name}
            </Typography>
          )}
        </Stack>
        {/* name */}

        {/* Card Actions */}
        <AdminItemsCardActions
          isEditing={isModify}
          onReturn={handleReturn}
          onEdit={openModif}
          onValidate={handleValidate}
          onUndo={handleUndo}
        />
        {/* end Card Actions */}
      </CardContent>
      {/* END CARD CONTENTS */}
    </Card>
  );
}

export default AdminItemsCardkindsLanguagesTags;
