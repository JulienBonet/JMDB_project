/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getKindsSortedById, deleteKind } from '../../../services/referenceDataService';
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

function AdminGenreList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newKind, setNewKind] = useState(false);

  const origin = 'kind';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewKind = () => {
    setNewKind(true);
  };

  const closeModalNewKind = () => {
    setNewKind(false);
  };

  const fetchKinds = useCallback(() => getKindsSortedById(), []);

  const deleteKindItem = useCallback(async (id) => {
    const response = await deleteKind(id);
    return response.status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshKind,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchKinds,
    deleteItem: deleteKindItem,
    onDeleteSuccess: () => {
      toast.success('kind deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="GENRES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un genre..."
        actionLabel="ADD NEW KIND"
        onAction={openModalNewKind}
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
            label: 'GENRE',
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
            onUpdate={refreshKind}
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
      {newKind && (
        <AdminCreateItemModal
          open={!!newKind}
          onClose={closeModalNewKind}
          origin={origin}
          onUpdate={refreshKind}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminGenreList;
