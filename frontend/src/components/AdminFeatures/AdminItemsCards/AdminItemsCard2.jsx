/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './adminItemsCard.css';
// refactor
import { updateAdminItem } from '../../../services/adminItemService';
import AdminItemsCardActions from './AdminItemsCardActions';

function AdminItemsCard2({ item, origin, onUpdate, closeModal }) {
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
    <article className="ItemsCard">
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

        <AdminItemsCardActions
          isEditing={isModify}
          onReturn={handleReturn}
          onEdit={openModif}
          onValidate={handleValidate}
          onUndo={handleUndo}
        />
      </section>
    </article>
  );
}

export default AdminItemsCard2;
