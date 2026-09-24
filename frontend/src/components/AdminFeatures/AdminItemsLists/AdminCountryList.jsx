/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardCountries';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getCountriesSortedById, deleteCountry } from '../../../services/referenceDataService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminCountryList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCountry, setNewCountry] = useState(false);

  const origin = 'country';

  const openModal = (DataItem) => {
    console.log('COUNTRY sélectionné :', DataItem);
    console.log('IMAGE :', DataItem.image);
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
    <AdminListLayout>
      <AdminListHeader
        title="COUNTRIES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un pays..."
        actionLabel="ADD NEW COUNTRY"
        onAction={openModalNewCountry}
      />

      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '15%',
            render: (item) => item.id,
          },
          {
            label: 'COUNTRY',
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
    </AdminListLayout>
  );
}

export default AdminCountryList;
