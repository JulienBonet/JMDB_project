/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ModeIcon from '@mui/icons-material/Mode';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UndoIcon from '@mui/icons-material/Undo';
import './adminItemsCard.css';
// refactor
import { updateAdminItem, updateAdminItemImage } from '../../../services/adminItemService';
import AdminItemsCardImage from './AdminItemsCardImage';

function AdminItemsCard3({ item, origin, onUpdate, closeModal }) {
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  // Fonction Cloudinary
  const getImageUrl = (publicId) => {
    if (!publicId) return '00_jmtb_item_default.jpg';
    return `${CLOUDINARY_BASE_URL}/${publicId}`;
  };

  const [isModify, setIsModify] = useState(false);
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(getImageUrl(item.image));
  const [showUploadButton, setShowUploadButton] = useState(true);
  const fileInputRef = useRef(null);

  const openModif = () => {
    setIsModify(true);
    setIsEditing(true);
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
      setIsEditing(false);
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
    setIsEditing(false);
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

        <div className="Info_Btn-Modify">
          {isEditing ? (
            <section className="Item_Editing_Buttons">
              <DoneOutlineIcon className="Item_validateButton" onClick={handleValidate} />
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

export default AdminItemsCard3;
