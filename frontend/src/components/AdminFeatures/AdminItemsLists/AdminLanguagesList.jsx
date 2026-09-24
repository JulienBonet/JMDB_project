/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refector
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getLanguagesSortedById, deleteLanguage } from '../../../services/referenceDataService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

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
    <AdminListLayout>
      <AdminListHeader
        title="LANGUAGES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher une langue..."
        actionLabel="ADD NEW LANGUAGE"
        onAction={openModalNewLanguage}
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
            label: 'LANGUAGE',
            mobileLabel: 'LANGUAGE',
            render: (item) => item.name,
          },
          {
            label: 'VIEW',
            mobileLabel: 'VIEW',
            width: '15%',
            render: (item) => (
              <Preview className="admin_tools_ico" onClick={() => openModal(item)} />
            ),
          },
          {
            label: 'DELETE',
            mobileLabel: 'DELETE',
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
    </AdminListLayout>
  );
}

export default AdminLanguagesList;
