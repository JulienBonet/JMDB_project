/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, Stack, Typography, TextField, Box } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
// Services
import { updateUserPassword } from '../../../services/userService';
// SX
import {
  labelSx,
  infoSx,
  inputSx,
  validateIconSx,
  undoIconSx,
} from './constants/adminItemsCardStyles';

function AdminItemsCardUsers({ item, onUpdate, closeModal }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUndo = () => {
    setNewPassword('');
    setConfirmNewPassword('');
    closeModal();
  };

  const handleValidate = async () => {
    // validations simples
    if (!newPassword || !confirmNewPassword) {
      toast.error('Merci de renseigner les deux champs', {
        className: 'custom-toast',
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('Les mots de passe ne correspondent pas', {
        className: 'custom-toast',
      });
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères', {
        className: 'custom-toast',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await updateUserPassword(item.id, newPassword);

      toast.success('Mot de passe mis à jour', { className: 'custom-toast' });
      setIsSubmitting(false);
      onUpdate();
      closeModal();
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message;

      console.error('Error change password:', message);
      toast.error(message || 'Erreur lors du changement de mot de passe');
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      id="AdminItemsCardUsers"
      sx={{
        bgcolor: 'var(--color-04)',
        mx: '5%',
        p: 2,
      }}
    >
      {/* CARD CONTENTS */}
      <CardContent
        id="AdminItemsCardUsers_Content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 0,
          '&:last-child': {
            pb: 0,
          },
        }}
      >
        {/* ID */}
        <Stack id="ID_AdminItemsCardUsers" direction="row" spacing={2} alignItems="center">
          <Typography sx={labelSx}>ID:</Typography>

          <Typography sx={infoSx}>{item.id}</Typography>
        </Stack>
        {/* END ID */}

        {/* NAME */}
        <Stack id="NAME_AdminItemsCardUsers" direction="row" spacing={2} alignItems="center">
          <Typography sx={labelSx}>NAME:</Typography>

          <Typography sx={infoSx}>{item.name}</Typography>
        </Stack>
        {/* END NAME */}

        {/* NEW PASSWORD */}
        <Stack
          id="NewPassword_AdminItemsCardUsers"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Typography sx={labelSx}>NEW PASSWORD:</Typography>

          <TextField
            type="password"
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Stack>
        {/* END NEW PASSWORD */}

        {/* CONFIRM PASSWORD */}
        <Stack
          id="ConfirmPassword_AdminItemsCardUsers"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Typography sx={labelSx}>CONFIRM PASSWORD:</Typography>

          <TextField
            type="password"
            size="small"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Stack>
        {/* END CONFIRM PASSWORD */}

        {/* ACTIONS */}
        <Box
          id="AdminItemsCardUsers_Actions"
          sx={{
            pt: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <DoneOutlineIcon onClick={handleValidate} sx={validateIconSx(isSubmitting)} />

            <UndoIcon onClick={handleUndo} sx={undoIconSx} />
          </Stack>
        </Box>
        {/* END ACTIONS */}
      </CardContent>
      {/* END CARD CONTENTS */}
    </Card>
  );
}

export default AdminItemsCardUsers;
