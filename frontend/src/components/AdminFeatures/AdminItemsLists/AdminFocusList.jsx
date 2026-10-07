/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getFocusSortedById, deleteFocus } from '../../../services/focusService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardFocus';
import AdminModal from '../AdminModal/AdminModal';
import AdminCreateItemModal from '../AdminCreateItemModal/AdminCreateItemModal';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

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
      {/* List header */}
      <AdminListHeader
        title="fOCUS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un focus..."
        actionLabel="ADD NEW FOCUS"
        onAction={openModalNewFocus}
      />
      {/* end List header */}

      {/* list table */}
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
      {/* end list table */}

      {/* Pagination */}
      <AdminListPagination totalPages={totalPages} onChange={handlePageChange} />
      {/* end Pagination */}

      {/* ADMIN CARD */}
      {selectedItem && (
        <AdminModal open={!!selectedItem} onClose={closeModal}>
          <AdminItemsCard
            item={selectedItem}
            origin={origin}
            onUpdate={refreshFocus}
            closeModal={closeModal}
            showImage
            showPitch
            showWikilink
            showImdbLink
          />
        </AdminModal>
      )}
      {/* END ADMIN CARD */}

      {/* CREATED CARD */}
      {newFocus && (
        <AdminCreateItemModal
          open={!!newFocus}
          onClose={closeModalNewFocus}
          origin={origin}
          onUpdate={refreshFocus}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminFocusList;
