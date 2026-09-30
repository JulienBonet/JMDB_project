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

function AdminScreenwriterList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newScreenWriter, setNewScreenWriter] = useState(false);

  const origin = 'screenwriter';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewScreenWriter = () => {
    setNewScreenWriter(true);
  };

  const closeModalNewScreenWriter = () => {
    setNewScreenWriter(false);
  };

  const fetchScreenwriters = useCallback(() => getArtistsSortedById('screenwriters'), []);

  const deleteScreenwriter = useCallback((id) => deleteArtist('screenwriters', id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshScreenwriters,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchScreenwriters,
    deleteItem: deleteScreenwriter,
    onDeleteSuccess: () => {
      toast.success('screenwriter deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="SCREENWRITERS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un scénariste..."
        actionLabel="ADD NEW SCREENWRITER"
        onAction={openModalNewScreenWriter}
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
            label: 'SCREENWRITER',
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
      {/* list table */}

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
                onUpdate={refreshScreenwriters}
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
      {/* END ADMIN CARD */}

      {/* CREATED CARD */}
      {newScreenWriter && (
        <Modal open onClose={closeModalNewScreenWriter} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewScreenWriter}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewScreenWriter();
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
                onUpdate={refreshScreenwriters}
                closeModal={closeModalNewScreenWriter}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminScreenwriterList;
