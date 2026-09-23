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
    currentItems: currentArtists,
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
    <section className="AdminItemsSection">
      <AdminListHeader
        title="DIRECTORS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un réalisateur..."
        actionLabel="ADD NEW DIRECTOR"
        onAction={openModalNewDirector}
      />

      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DIRECTOR</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="LoaderTemp">LOADING...</div>
          ) : (
            currentArtists.map((DataItem) => (
              <tr key={DataItem.id}>
                <th scope="row">{DataItem.id}</th>
                <td data-label="Réalisateur">{DataItem.name}</td>
                <td data-label="Aperçu">
                  <PreviewIcon className="admin_tools_ico" onClick={() => openModal(DataItem)} />
                </td>
                <td data-label="Supprimer">
                  <DeleteIcon
                    className="admin_tools_ico"
                    onClick={() => handleDelete(DataItem.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
    </section>
  );
}

export default AdminDirectorList;
