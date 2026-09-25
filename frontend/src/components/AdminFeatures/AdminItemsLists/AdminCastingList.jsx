/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardArtists';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

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
      <AdminListHeader
        title="CASTING LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un acteur..."
        actionLabel="ADD NEW CASTING"
        onAction={openModalNewCasting}
      />
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
                onUpdate={refreshCastings}
                closeModal={closeModal}
                showImage
                showPitch
                showWikilink
                showImdbLink
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newCasting && (
        <Modal open onClose={closeModalNewCasting} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewCasting}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewCasting();
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
                onUpdate={refreshCastings}
                closeModal={closeModalNewCasting}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminCastingList;
