/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { Preview, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// Refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getTagsSortedById, deleteTag } from '../../../services/tagService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminTagsList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTag, setNewTag] = useState(false);

  const origin = 'tag';

  const fetchTags = useCallback(() => getTagsSortedById(), []);

  const deleteTagItem = useCallback((id) => deleteTag(id), []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshTag,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchTags,
    deleteItem: deleteTagItem,
    onDeleteSuccess: () => {
      toast.success('tag deleted', {
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

  const openModalNewTag = () => {
    setNewTag(true);
  };

  const closeModalNewTag = () => {
    setNewTag(false);
  };

  return (
    <AdminListLayout>
      <AdminListHeader
        title="TAGS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un tag..."
        actionLabel="ADD NEW TAG"
        onAction={openModalNewTag}
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
            label: 'TAG',
            mobileLabel: 'TAG',
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
                onUpdate={refreshTag}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {newTag && (
        <Modal open onClose={closeModalNewTag} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewTag}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewTag();
                  }
                }}
                role="button"
                tabIndex={0}
                className="modal_closed_btn"
              >
                X Fermer
              </div>
              <CreateItemCard origin={origin} onUpdate={refreshTag} closeModal={closeModalNewTag} />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminTagsList;
