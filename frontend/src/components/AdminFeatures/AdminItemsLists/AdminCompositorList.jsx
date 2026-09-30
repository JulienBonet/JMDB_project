/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardArtists';
import CreateItemCard from '../AdminItemsCards/CreateItemCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

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
      {/* List header */}
      <AdminListHeader
        title="COMPOSITORS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un compositeur..."
        actionLabel="ADD NEW COMPOSITOR"
        onAction={openModalNewCompositor}
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
      {/* end liste table */}

      {/* Pagination */}
      <AdminListPagination totalPages={totalPages} onChange={handlePageChange} />
      {/* end Pagination */}

      {/* ADMIN CARD */}
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
      {/* END ADMIN CARD */}

      {/* CREATED CARD */}
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
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminCompositorList;
