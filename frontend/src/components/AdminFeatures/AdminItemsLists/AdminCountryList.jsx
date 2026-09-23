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
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardCountries';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getCountriesSortedById, deleteCountry } from '../../../services/referenceDataService';
import AdminListHeader from './ui/AdminListHeader';

function AdminCountryList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCountry, setNewCountry] = useState(false);

  const origin = 'country';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewCountry = () => {
    setNewCountry(true);
  };

  const closeModalNewCountry = () => {
    setNewCountry(false);
  };

  const fetchCountries = useCallback(() => getCountriesSortedById(), []);

  const deleteCountryItem = useCallback(async (id) => {
    const response = await deleteCountry(id);
    return response.status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshCountry,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchCountries,
    deleteItem: deleteCountryItem,
    onDeleteSuccess: () => {
      toast.success('country deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <section className="AdminItemsSection">
      <AdminListHeader
        title="COUNTRIES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un pays..."
        actionLabel="ADD NEW COUNTRY"
        onAction={openModalNewCountry}
      />
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">COUNTRY</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="LoaderTemp">LOADING...</div>
          ) : (
            currentItems.map((DataItem) => (
              <tr key={DataItem.id}>
                <th scope="row">{DataItem.id}</th>
                <td data-label="Pays">{DataItem.name}</td>
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
                onUpdate={refreshCountry}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newCountry && (
        <Modal open onClose={closeModalNewCountry} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewCountry}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewCountry();
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
                onUpdate={refreshCountry}
                closeModal={closeModalNewCountry}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </section>
  );
}

export default AdminCountryList;
