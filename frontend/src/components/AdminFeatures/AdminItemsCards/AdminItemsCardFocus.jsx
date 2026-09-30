// admin focus
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
// styles react-quill
import 'react-quill/dist/quill.snow.css';
import '../../../assets/css/reactQuill_html_parametrage.css';
// services
import {
  getFocusCategories,
  updateAdminItem,
  updateFocusImage,
} from '../../../services/adminItemService';
// components
import AdminItemsCardImage from './AdminItemsCardShared/AdminItemsCardImage';
import AdminItemsCardActions from './AdminItemsCardShared/AdminItemsCardActions';
import AdminItemsCardResponsiveDivider from './AdminItemsCardShared/AdminItemsCardResponsiveDivider';
// SX
import { labelSx, infoSx, inputSx, pitchDisplaySx } from './constants/adminItemsCardStyles';

function AdminItemsCardFocus({ item, origin, onUpdate, closeModal }) {
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
  const isFocus = origin === 'focus';

  const getImageUrl = (publicId) => {
    if (!publicId) return '00_jmtb_item_default.jpg';

    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  };

  const [isModify, setIsModify] = useState(false);
  const [name, setName] = useState(item.name);
  const [pitch, setPitch] = useState(item.pitch);
  const [image, setImage] = useState(getImageUrl(item.image));
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(item.categoryId ? Number(item.categoryId) : '');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const openModif = () => {
    setIsModify(true);
  };

  const handleReturn = () => {
    closeModal();
  };

  // Fetch catégories (origin === "focus")
  useEffect(() => {
    if (origin === 'focus') {
      getFocusCategories()
        .then((data) => setCategories(data))
        .catch((err) => console.error('Error fetching categories:', err));
    }
  }, [origin]);
  // End Fetch catégories (origin === "focus")

  const handleUpdateImage = async () => {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (!file) return null;

    const data = await updateFocusImage(item.id, file);

    return data.url;
  };

  const handleValidate = async () => {
    try {
      setIsLoading(true);

      const hasChanges =
        name !== item.name || pitch !== item.pitch || categoryId !== item.categoryId;

      // 1️⃣ Mettre à jour les infos
      if (hasChanges) {
        const data = { name, pitch, categoryId };
        await updateAdminItem(origin, item.id, data);
      }

      // 2️⃣ Mettre à jour l'image
      let newImageUrl = image;
      if (fileInputRef.current.files[0]) {
        try {
          newImageUrl = await handleUpdateImage();
          setImage(newImageUrl);
        } catch (err) {
          console.error('Erreur upload image :', err);
          toast.error(`Erreur upload image : ${err.message}`, {
            className: 'custom-toast',
          });
          return;
        }
      }

      // 3️⃣ Réinitialiser les états locaux
      if (newImageUrl) setImage(newImageUrl);

      toast.success(`${origin} successfully updated`, {
        className: 'custom-toast',
      });
      setIsModify(false);
      setShowUploadButton(true);
      onUpdate();
      closeModal();
    } catch (error) {
      console.error('Request error:', error);
      toast.error(`Erreur inattendue : ${error.message}`, {
        className: 'custom-toast',
      });
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
    setName(item.name);
    setPitch(item.pitch);
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

  const categorySelectSx = {
    backgroundColor: 'white',
  };

  return (
    <Card
      id="AdminItemsCardFocus"
      sx={{
        bgcolor: 'var(--color-04)',
        mx: '5%',
        p: 2,
      }}
    >
      {/* CARD CONTENTS */}
      <CardContent
        id="AdminItemsCardFocus_Content"
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
          id="AdminItemsCardFocus_ImageMobile"
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
          id="AdminItemsCardFocus_Infos_actions"
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
          <Stack id="ID_AdminItemsCardFocus" direction="row" spacing={2} alignItems="center">
            <Typography sx={labelSx}>ID:</Typography>

            <Typography sx={infoSx}>{item.id}</Typography>
          </Stack>
          {/* END ID */}

          {/* NAME */}
          <Stack
            id="NAME_AdminItemsCardFocus"
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

          {/* PITCH TEXT */}
          {!isFocus && (
            <Stack
              id="PITCH_AdminItemsCardFocus"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <Typography sx={labelSx}>PITCH:</Typography>

              {isModify ? (
                <TextField
                  type="text"
                  size="small"
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  fullWidth
                  sx={inputSx}
                />
              ) : (
                <Typography sx={infoSx}>{pitch}</Typography>
              )}
            </Stack>
          )}
          {/* END PITCH TEXT */}

          {/* PITCH HTML */}
          {isFocus && (
            <Stack
              id="PITCH_HTML_AdminItemsCardFocus"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'flex-start' }}
            >
              <Typography sx={labelSx}>PITCH:</Typography>

              {isModify ? (
                <Box
                  id="AdminItemsCardFocus_ReactQuill"
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
                  id="AdminItemsCardFocus_PitchPreview"
                  className="Items_info"
                  sx={pitchDisplaySx}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(pitch),
                  }}
                />
              )}
            </Stack>
          )}
          {/* END PITCH HTML */}

          {/* CATEGORY */}
          <Stack
            id="CATEGORY_AdminItemsCardFocus"
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
          >
            <Typography sx={labelSx}>CATEGORY:</Typography>

            {isModify && isFocus ? (
              <FormControl fullWidth size="small">
                <Select
                  labelId="edit-focus-category-label"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  input={<OutlinedInput label="Category" />}
                  sx={categorySelectSx}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography sx={infoSx}>{item.categoryName}</Typography>
            )}
          </Stack>
          {/* END CATEGORY */}

          {/* ACTIONS */}
          <AdminItemsCardActions
            isEditing={isModify}
            isLoading={isLoading}
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
          id="AdminItemsCardFocus_ImageDesktop"
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

export default AdminItemsCardFocus;
