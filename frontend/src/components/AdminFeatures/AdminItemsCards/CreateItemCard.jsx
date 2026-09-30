/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
  Box,
} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
// Services
import { getFocusCategories, createAdminItem } from '../../../services/adminItemService';
// SX
import { labelSx, inputSx, validateIconSx, undoIconSx } from './constants/adminItemsCardStyles';

function CreateItemCard({ origin, onUpdate, closeModal }) {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fonctions pour filtrer les caractères interdits
  const regexInput = (value) => {
    if (!value) return '';

    // Remplacer / et \ par un tiret, et , par un espace
    let cleaned = value.replace(/[\\/]/g, '-').replace(/,/g, ' ');

    // Supprimer l'espace au début
    cleaned = cleaned.replace(/^\s+/, '');

    // Mettre la première lettre en majuscule
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

    return cleaned;
  };

  const handleNameChange = (e) => {
    const regexValue = regexInput(e.target.value);
    setName(regexValue);
  };

  // Fetch catégories (origin === "focus")
  useEffect(() => {
    if (origin === 'focus') {
      getFocusCategories()
        .then((data) => setCategories(data))
        .catch((err) => console.error('Error fetching categories:', err));
    }
  }, [origin]);

  const handleValidate = async () => {
    // Vérification des champs requis
    if (!name || (origin === 'user' && (!password || !confirmPassword))) {
      toast.error('Please fill all required fields', {
        className: 'custom-toast',
      });
      return;
    }

    // Vérification correspondance des mots de passe pour les users
    if (origin === 'user' && password !== confirmPassword) {
      toast.error('Passwords do not match', {
        className: 'custom-toast',
      });
      return;
    }

    // Vérification catégorie pour focus
    if (origin === 'focus' && !categoryId) {
      toast.error('Merci de choisir une catégorie pour ce focus.', {
        className: 'custom-toast',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Préparer les données à envoyer
      const data = { name };

      if (origin === 'user') {
        data.password = password;
        data.isAdmin = isAdmin ? 1 : 0;
      }

      if (origin === 'focus') {
        data.categoryId = categoryId;
      }

      await createAdminItem(origin, data);

      toast.success(`${origin.toUpperCase()} successfully created`, {
        className: 'custom-toast',
      });

      onUpdate(name);
      closeModal();
    } catch (error) {
      console.error('Request error:', error);
      toast.error('Error creating item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    closeModal();
  };

  //--------------
  // SX
  //--------------

  const cardSx = {
    bgcolor: 'var(--color-04)',
    mx: '5%',
    p: 2,
  };

  const titleSx = {
    fontFamily: 'var(--font-05)',
    color: 'var(--color-01)',
    fontSize: 'large',
  };

  const selectSx = {
    backgroundColor: 'white',
  };

  return (
    <Card id="CreateItemCard" sx={cardSx}>
      <CardContent
        id="CreateItemCard_Content"
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
        {/* TITLE */}
        <Stack id="Created_Info_item_line_Title" direction="row" alignItems="center">
          <Typography sx={titleSx}>NEW {origin.toUpperCase()}</Typography>
        </Stack>
        {/* END TITLE */}

        {/* NAME */}
        <Stack
          id="NAME_Created_Info_item_line"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <Typography sx={{ ...labelSx, flexShrink: 0 }}>ENTER NAME:</Typography>

          <TextField
            type="text"
            size="small"
            value={name}
            onChange={handleNameChange}
            fullWidth
            sx={{
              ...inputSx,
              width: {
                xs: '100%',
                sm: '70%',
              },
            }}
          />
        </Stack>
        {/* END NAME */}

        {/* FOCUS CATEGORY */}
        {origin === 'focus' && (
          <Stack
            id="FocusCategory_Created_Info_item_line"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Typography sx={{ ...labelSx, flexShrink: 0 }}>CATEGORY:</Typography>

            <FormControl fullWidth size="small" sx={{ width: { xs: '100%', sm: '70%' } }}>
              <Select
                labelId="focus-category-label"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                input={<OutlinedInput label="Category" />}
                sx={selectSx}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* END FOCUS CATEGORY */}

        {/* USER FIELDS */}
        {origin === 'user' && (
          <>
            {/* PASSWORD */}
            <Stack
              id="Created_Info_item_line_Password"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography sx={{ ...labelSx, flexShrink: 0 }}>ENTER PASSWORD:</Typography>

              <TextField
                type="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  ...inputSx,
                  width: {
                    xs: '100%',
                    sm: '70%',
                  },
                }}
              />
            </Stack>

            {/* CONFIRM PASSWORD */}
            <Stack
              id="Created_Info_item_line_ConfirmPassword"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography sx={{ ...labelSx, flexShrink: 0 }}>CONFIRM PASSWORD:</Typography>

              <TextField
                type="password"
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{
                  ...inputSx,
                  width: {
                    xs: '100%',
                    sm: '70%',
                  },
                }}
              />
            </Stack>

            {/* ROLE */}
            <Stack
              id="Created_Info_item_line_Role"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography sx={{ ...labelSx, flexShrink: 0 }}>ROLE:</Typography>

              <FormControl
                size="small"
                sx={{
                  width: {
                    xs: '100%',
                    sm: '70%',
                  },
                }}
              >
                <Select
                  labelId="user-role-label"
                  value={isAdmin ? 'admin' : 'user'}
                  onChange={(e) => setIsAdmin(e.target.value === 'admin')}
                  input={<OutlinedInput label="Role" />}
                  sx={selectSx}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </>
        )}
        {/* END USER FIELDS */}

        {/* ACTIONS */}
        <Box
          id="Btn-Modify_Created_Info"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Stack id="Editing_Buttons_Created_Item" direction="row" spacing={4}>
            {isLoading ? (
              <CircularProgress size={22} thickness={5} color="inherit" />
            ) : (
              <DoneOutlineIcon onClick={handleValidate} sx={validateIconSx(isLoading)} />
            )}

            <UndoIcon onClick={handleUndo} sx={undoIconSx} />
          </Stack>
        </Box>
        {/* END ACTIONS */}
      </CardContent>
    </Card>
  );
}

export default CreateItemCard;
