/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getCountriesSortedById, deleteCountry } from '../../../services/referenceDataService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardCountries';
import CreateItemCard from '../AdminItemsCards/CreateItemCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

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
    <AdminListLayout>
      {/* List header */}
      <AdminListHeader
        title="COUNTRIES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un pays..."
        actionLabel="ADD NEW COUNTRY"
        onAction={openModalNewCountry}
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
                onUpdate={refreshCountry}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {/* END ADMIN CARD */}

      {/* CREATED CARD */}
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
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminCountryList;
