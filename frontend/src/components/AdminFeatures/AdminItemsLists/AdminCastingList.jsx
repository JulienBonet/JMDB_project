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
import AdminCreateItemModal from '../AdminCreateItemModal/AdminCreateItemModal';
import AdminModal from '../AdminModal/AdminModal';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

function AdminCastingList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCasting, SetNewCasting] = useState(false);

  const origin = 'casting';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewCasting = () => {
    SetNewCasting(true);
  };

  const closeModalNewCasting = () => {
    SetNewCasting(false);
  };

  const fetchCastings = useCallback(() => getArtistsSortedById('casting'), []);

  const deleteCasting = useCallback((id) => deleteArtist('casting', id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshCastings,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchCastings,
    deleteItem: deleteCasting,
    onDeleteSuccess: () => {
      toast.success('casting deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="CASTING LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un acteur..."
        actionLabel="ADD NEW CASTING"
        onAction={openModalNewCasting}
      />
      {/* end List header */}

      {/* liste table */}
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '15%',
            render: (item) => item.id,
          },
          {
            label: 'CASTING',
            render: (item) => item.name,
          },
          {
            label: 'VIEW',
            width: '15%',
            render: (item) => (
              <Preview className="admin_tools_ico" onClick={() => openModal(item)} />
            ),
          },
          {
            label: 'DELETE',
            width: '15%',
            render: (item) => (
              <Delete className="admin_tools_ico" onClick={() => handleDelete(item.id)} />
            ),
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
            onUpdate={refreshCastings}
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
      {newCasting && (
        <AdminCreateItemModal
          open={!!newCasting}
          onClose={closeModalNewCasting}
          origin={origin}
          onUpdate={refreshCastings}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminCastingList;
