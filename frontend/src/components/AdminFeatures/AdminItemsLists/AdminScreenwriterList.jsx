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
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getArtistsSortedById, deleteArtist } from '../../../services/artistService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';

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
    <section className="AdminItemsSection">
      <AdminListHeader
        title="SCREENWRITERS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un scénariste..."
        actionLabel="ADD NEW SCREENWRITER"
        onAction={openModalNewScreenWriter}
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
            label: 'SCREENWRITER',
            mobileLabel: 'SCREENWRITER',
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
    </section>
  );
}

export default AdminScreenwriterList;
