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

function AdminDirectorList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newDirector, SetNewDirector] = useState(false);

  const origin = 'director';

  const fetchDirectors = useCallback(() => getArtistsSortedById('directors'), []);

  const deleteDirector = useCallback((id) => deleteArtist('directors', id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshDirectors,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchDirectors,
    deleteItem: deleteDirector,
    onDeleteSuccess: () => {
      toast.success('director deleted', {
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

  const openModalNewDirector = () => {
    SetNewDirector(true);
  };

  const closeModalNewDirector = () => {
    SetNewDirector(false);
  };

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="DIRECTORS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un réalisateur..."
        actionLabel="ADD NEW DIRECTOR"
        onAction={openModalNewDirector}
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
            label: 'DIRECTOR',
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
      {/* end liste table */}

      {/* Pagination */}
      <AdminListPagination totalPages={totalPages} onChange={handlePageChange} />
      {/* end Pagination */}

      {/* ADMIN CARD */}
      {selectedItem && (
        <AdminModal open={!!selectedItem} onClose={closeModal}>
          <AdminItemsCard
            item={selectedItem}
            origin={origin}
            onUpdate={refreshDirectors}
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
      {newDirector && (
        <AdminCreateItemModal
          open={!!newDirector}
          onClose={closeModalNewDirector}
          origin={origin}
          onUpdate={refreshDirectors}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminDirectorList;
