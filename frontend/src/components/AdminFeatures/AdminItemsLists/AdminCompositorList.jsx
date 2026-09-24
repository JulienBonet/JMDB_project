/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardArtists';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
//refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminCompositorList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCompositor, setNewCompositor] = useState(false);

  const origin = 'compositor';

  const fetchCompositors = useCallback(() => getArtistsSortedById('music'), []);

  const deleteCompositor = useCallback((id) => deleteArtist('music', id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshCompositors,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchCompositors,
    deleteItem: deleteCompositor,
    onDeleteSuccess: () => {
      toast.success('compositor deleted', {
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

  const openModalNewCompositor = () => {
    setNewCompositor(true);
  };

  const closeModalNewCompositor = () => {
    setNewCompositor(false);
  };

  return (
    <AdminListLayout>
      <AdminListHeader
        title="COMPOSITORS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un compositeur..."
        actionLabel="ADD NEW COMPOSITOR"
        onAction={openModalNewCompositor}
      />
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            mobileLabel: 'ID',
            width: '15%',
            render: (item) => item.id,
          },
          {
            label: 'COMPOSITOR',
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
                onUpdate={refreshCompositors}
                closeModal={closeModal}
                fields={{
                  name: true,
                  pitch: true,
                  wikilink: true,
                  imdblink: true,
                }}
                showImage
                showPitch
                showWikilink
                showImdbLink
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newCompositor && (
        <Modal open onClose={closeModalNewCompositor} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewCompositor}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewCompositor();
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
                onUpdate={refreshCompositors}
                closeModal={closeModalNewCompositor}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminCompositorList;
