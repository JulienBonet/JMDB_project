/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import './adminLists.css';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardFocus';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getFocusSortedById, deleteFocus } from '../../../services/focusService';
import AdminListHeader from './ui/AdminListHeader';

function AdminFocusList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newFocus, setNewFocus] = useState(false);

  const origin = 'focus';

  const fetchFocus = useCallback(() => getFocusSortedById(), []);

  const deleteFocusItem = useCallback((id) => deleteFocus(id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshFocus,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchFocus,
    deleteItem: deleteFocusItem,
    onDeleteSuccess: () => {
      toast.success('focus deleted', {
        className: 'custom-toast',
      });
    },
  });

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewFocus = () => {
    setNewFocus(true);
  };

  const closeModalNewFocus = () => {
    setNewFocus(false);
  };

  return (
    <section className="AdminItemsSection">
      <AdminListHeader
        title="fOCUS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un focus..."
        actionLabel="ADD NEW FOCUS"
        onAction={openModalNewFocus}
      />
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">FOCUS</th>
            <th scope="col">CATEGORIE</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="LoaderTemp">LOADING...</div>
          ) : (
            currentItems.map((DataItem) => (
              <tr key={DataItem.id}>
                <th scope="row">{DataItem.id}</th>
                <td data-label="Focus">{DataItem.name}</td>
                <td data-label="Catégorie">{DataItem.category_name}</td>
                <td data-label="Aperçu">
                  <PreviewIcon className="admin_tools_ico" onClick={() => openModal(DataItem)} />
                </td>
                <td data-label="Supprimer">
                  <DeleteIcon
                    className="admin_tools_ico"
                    onClick={() => handleDelete(DataItem.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination count={totalPages} shape="rounded" onChange={handlePageChange} />
      </Box>
      {selectedItem && (
        <Modal open onClose={closeModal} className="Movie_Modal">
          <Box>
            <Container maxWidth="lg">
              <div
                onClick={closeModal}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModal();
                  }
                }}
                role="button"
                tabIndex={0}
                className="modal_closed_btn"
              >
                X Fermer
              </div>
              <AdminItemsCard
                item={selectedItem}
                origin={origin}
                onUpdate={refreshFocus}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newFocus && (
        <Modal open onClose={closeModalNewFocus} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewFocus}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewFocus();
                  }
                }}
                role="button"
                tabIndex={0}
                className="modal_closed_btn"
              >
                X Fermer
              </div>
              <CreateItemCard
                origin={origin}
                onUpdate={refreshFocus}
                closeModal={closeModalNewFocus}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </section>
  );
}

export default AdminFocusList;
