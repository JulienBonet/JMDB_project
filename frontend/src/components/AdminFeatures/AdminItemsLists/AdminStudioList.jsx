/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import './adminLists.css';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardArtists';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refacto
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';

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
    <section className="AdminItemsSection">
      <AdminListHeader
        title="STUDIOS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un studio..."
        actionLabel="ADD NEW STUDIO"
        onAction={openModalNewStudio}
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
            label: 'STUDIO',
            mobileLabel: 'STUDIO',
            render: (item) => item.name,
          },
          {
            label: 'VIEW',
            mobileLabel: 'VIEW',
            width: '15%',
            render: (item) => (
              <PreviewIcon className="admin_tools_ico" onClick={() => openModal(item)} />
            ),
          },
          {
            label: 'DELETE',
            mobileLabel: 'DELETE',
            width: '15%',
            render: (item) => (
              <DeleteIcon className="admin_tools_ico" onClick={() => handleDelete(item.id)} />
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
                onUpdate={refreshStudios}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newStudio && (
        <Modal open onClose={closeModalNewStudio} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewStudio}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewStudio();
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
                onUpdate={refreshStudios}
                closeModal={closeModalNewStudio}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </section>
  );
}

export default AdminStudioList;
