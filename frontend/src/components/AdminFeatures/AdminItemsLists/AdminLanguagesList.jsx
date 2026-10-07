/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getLanguagesSortedById, deleteLanguage } from '../../../services/referenceDataService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import AdminModal from '../AdminModal/AdminModal';
import AdminCreateItemModal from '../AdminCreateItemModal/AdminCreateItemModal';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

function AdminLanguagesList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newLanguage, setNewLanguage] = useState(false);

  const origin = 'language';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewLanguage = () => {
    setNewLanguage(true);
  };

  const closeModalNewLanguage = () => {
    setNewLanguage(false);
  };

  const fetchLanguages = useCallback(() => getLanguagesSortedById(), []);

  const deleteLanguageItem = useCallback(async (id) => {
    const response = await deleteLanguage(id);
    return response.status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshLanguage,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchLanguages,
    deleteItem: deleteLanguageItem,
    onDeleteSuccess: () => {
      toast.success('Language deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="LANGUAGES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher une langue..."
        actionLabel="ADD NEW LANGUAGE"
        onAction={openModalNewLanguage}
      />
      {/* end List header */}

      {/* list table */}
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '15%',
            render: (item) => item.id,
          },
          {
            label: 'LANGUAGE',
            render: (item) => item.name,
          },
          {
            label: 'VIEW',
            width: '15%',
            render: (item) => <Preview onClick={() => openModal(item)} />,
          },
          {
            label: 'DELETE',
            width: '15%',
            render: (item) => <Delete onClick={() => handleDelete(item.id)} />,
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
            onUpdate={refreshLanguage}
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
      {newLanguage && (
        <AdminCreateItemModal
          open={!!newLanguage}
          onClose={closeModalNewLanguage}
          origin={origin}
          onUpdate={refreshLanguage}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminLanguagesList;
