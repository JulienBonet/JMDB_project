/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import '../../../assets/css/reactQuill_html_parametrage.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CachedIcon from '@mui/icons-material/Cached';
import CircularProgress from '@mui/material/CircularProgress';
import './adminItemsCard.css';
// refacto
import {
  getFocusCategories,
  updateAdminItem,
  updateFocusImage,
} from '../../../services/adminItemService';
import AdminItemsCardImage from './AdminItemsCardImage';

function AdminItemsCard4({ item, origin, onUpdate, closeModal }) {
  // console.info("origin", origin);

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

  return (
    <article className="ItemsCard">
      <section className="ItemsCard_Col_0">
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

        <div className="ItemsCard_bar" />
      </section>
      <section className="ItemsCard_Col1">
        <div className="Info_item_line">
          <h2 className="ItemsCard_title">ID: </h2>
          <p className="Items_info">{item.id}</p>
        </div>
        <div className="Info_item_line">
          <h2 className="ItemsCard_title">NAME: </h2>
          {isModify ? (
            <input type="text" value={name} onChange={handleNameChange} />
          ) : (
            <p className="Items_info">{name}</p>
          )}
        </div>
        {!isFocus && (
          <div className="Info_item_line">
            <h2 className="ItemsCard_title">PITCH: </h2>
            {isModify ? (
              <input type="text" value={pitch} onChange={(e) => setPitch(e.target.value)} />
            ) : (
              <p className="Items_info">{pitch}</p>
            )}
          </div>
        )}
        {isFocus && (
          <div className="Info_item_line_html">
            <h2 className="ItemsCard_title">PITCH: </h2>
            {isModify ? (
              <ReactQuill
                value={pitch}
                onChange={setPitch}
                theme="snow"
                modules={modules}
                formats={formats}
                style={{
                  width: '91%',
                  minHeight: '200px',
                }}
                className="Items_info"
              />
            ) : (
              <div
                className="Items_info_artistFocus"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pitch) }}
              />
            )}
          </div>
        )}
        <div className="Info_item_line">
          {isModify && isFocus ? (
            <>
              <h2 className="ItemsCard_title">CATEGORY: </h2>
              <FormControl fullWidth size="small">
                <Select
                  labelId="edit-focus-category-label"
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  input={<OutlinedInput label="Category" />}
                  sx={{
                    backgroundColor: 'white',
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <h2 className="ItemsCard_title">CATEGORY: </h2>
              <p className="Items_info">{item.categoryName}</p>
            </>
          )}
        </div>
        <div className="Info_Btn-Modify">
          {isModify ? (
            <section className="Item_Editing_Buttons">
              {isLoading ? (
                <CircularProgress
                  size={22}
                  thickness={5}
                  color="inherit"
                  className="Item_loader_mui"
                />
              ) : (
                <DoneOutlineIcon className="Item_validateButton" onClick={handleValidate} />
              )}
              <UndoIcon className="Item_UndoButton" onClick={handleUndo} />
            </section>
          ) : (
            <section className="Item_Editing_Buttons">
              <KeyboardReturnIcon className="item_return_ico" onClick={handleReturn} />
              <ModeIcon className="item_tools_ico" onClick={() => openModif()} />
            </section>
          )}
        </div>
      </section>

      <section className="ItemsCard_Col2">
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
      </section>
    </article>
  );
}

export default AdminItemsCard4;
