/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getFocusSortedById, deleteFocus } from '../../../services/focusService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardFocus';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

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
    <AdminListLayout>
      <AdminListHeader
        title="fOCUS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un focus..."
        actionLabel="ADD NEW FOCUS"
        onAction={openModalNewFocus}
      />
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '10%',
            render: (item) => item.id,
          },
          {
            label: 'FOCUS',
            render: (item) => item.name,
          },
          {
            label: 'CATEGORY',
            width: '25%',
            render: (item) => item.categoryName,
          },
          {
            label: 'VIEW',
            width: '10%',
            render: (item) => (
              <Preview className="admin_tools_ico" onClick={() => openModal(item)} />
            ),
          },
          {
            label: 'DELETE',
            width: '10%',
            render: (item) => (
              <Delete className="admin_tools_ico" onClick={() => handleDelete(item.id)} />
            ),
          },
        ]}
        rows={currentItems}
        loading={loading}
      />
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
    </AdminListLayout>
  );
}

export default AdminFocusList;
