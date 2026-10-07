/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardArtists';
import AdminModal from '../AdminModal/AdminModal';
import AdminCreateItemModal from '../AdminCreateItemModal/AdminCreateItemModal';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

function AdminStudioList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newStudio, setNewStudio] = useState(false);

  const origin = 'studio';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewStudio = () => {
    setNewStudio(true);
  };

  const closeModalNewStudio = () => {
    setNewStudio(false);
  };

  const fetchStudios = useCallback(() => getArtistsSortedById('studio'), []);

  const deleteStudio = useCallback((id) => deleteArtist('studio', id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshStudios,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchStudios,
    deleteItem: deleteStudio,
    onDeleteSuccess: () => {
      toast.success('studio deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="STUDIOS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un studio..."
        actionLabel="ADD NEW STUDIO"
        onAction={openModalNewStudio}
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
            label: 'STUDIO',
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
            onUpdate={refreshStudios}
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
      {newStudio && (
        <AdminCreateItemModal
          open={!!newStudio}
          onClose={closeModalNewStudio}
          origin={origin}
          onUpdate={refreshStudios}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminStudioList;
