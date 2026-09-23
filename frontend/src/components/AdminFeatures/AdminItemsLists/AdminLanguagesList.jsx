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
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refector
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getLanguagesSortedById, deleteLanguage } from '../../../services/referenceDataService';
import AdminListHeader from './ui/AdminListHeader';

function AdminLanguagesList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newLanguage, setNewLanguage] = useState(false);

  const origin = 'language';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewLanguage = () => {
    setNewLanguage(true);
  };

  const closeModalNewLanguage = () => {
    setNewLanguage(false);
  };

  const fetchLanguages = useCallback(() => getLanguagesSortedById(), []);

  const deleteLanguageItem = useCallback(async (id) => {
    const response = await deleteLanguage(id);
    return response.status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshLanguage,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchLanguages,
    deleteItem: deleteLanguageItem,
    onDeleteSuccess: () => {
      toast.success('Language deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <section className="AdminItemsSection">
      <AdminListHeader
        title="LANGUAGES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher une langue..."
        actionLabel="ADD NEW LANGUAGE"
        onAction={openModalNewLanguage}
      />
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">LANGUAGE</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="LoaderTemp">LOADING...</div>
          ) : (
            currentItems.map((DataItem) => (
              <tr key={DataItem.id}>
                <th scope="row">{DataItem.id}</th>
                <td data-label="Langue">{DataItem.name}</td>
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
                onUpdate={refreshLanguage}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newLanguage && (
        <Modal open onClose={closeModalNewLanguage} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewLanguage}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewLanguage();
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
                onUpdate={refreshLanguage}
                closeModal={closeModalNewLanguage}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </section>
  );
}

export default AdminLanguagesList;
