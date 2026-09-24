/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getKindsSortedById, deleteKind } from '../../../services/referenceDataService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminGenreList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newKind, setNewKind] = useState(false);

  const origin = 'kind';

  const openModal = (DataItem) => {
    setSelectedItem(DataItem);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const openModalNewKind = () => {
    setNewKind(true);
  };

  const closeModalNewKind = () => {
    setNewKind(false);
  };

  const fetchKinds = useCallback(() => getKindsSortedById(), []);

  const deleteKindItem = useCallback(async (id) => {
    const response = await deleteKind(id);
    return response.status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshKind,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchKinds,
    deleteItem: deleteKindItem,
    onDeleteSuccess: () => {
      toast.success('kind deleted', {
        className: 'custom-toast',
      });
    },
  });

  return (
    <AdminListLayout>
      <AdminListHeader
        title="GENRES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un genre..."
        actionLabel="ADD NEW KIND"
        onAction={openModalNewKind}
      />
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '15%',
            render: (item) => item.id,
          },
          {
            label: 'GENRE',
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
                onUpdate={refreshKind}
                closeModal={closeModal}
                fields={{ name: true }}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newKind && (
        <Modal open onClose={closeModalNewKind} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewKind}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewKind();
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
                onUpdate={refreshKind}
                closeModal={closeModalNewKind}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminGenreList;
