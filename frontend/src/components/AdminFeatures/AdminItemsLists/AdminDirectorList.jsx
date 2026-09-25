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
      <AdminListHeader
        title="DIRECTORS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un réalisateur..."
        actionLabel="ADD NEW DIRECTOR"
        onAction={openModalNewDirector}
      />

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
                onUpdate={refreshDirectors}
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
      {newDirector && (
        <Modal open onClose={closeModalNewDirector} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewDirector}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewDirector();
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
                onUpdate={refreshDirectors}
                closeModal={closeModalNewDirector}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminDirectorList;
