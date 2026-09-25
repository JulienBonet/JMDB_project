/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container, Box, Modal, Pagination } from '@mui/material';
import { VpnKey, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getUsersSortedById, deleteUser } from '../../../services/userService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardUsers';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminUsersList() {
  const [newUser, setNewUser] = useState(false);
  const [passwordItem, setPasswordItem] = useState(null);

  const origin = 'user';

  const fetchUsers = useCallback(() => getUsersSortedById(), []);

  const deleteUserItem = useCallback(async (id) => {
    const status = await deleteUser(id);
    return status >= 200 && status < 300 ? 204 : status;
  }, []);

  const {
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
    refresh: refreshUsers,
    handleDelete,
  } = useAdminItemsList({
    fetchItems: fetchUsers,
    deleteItem: deleteUserItem,
    onDeleteSuccess: () => {
      toast.success('User deleted', {
        className: 'custom-toast',
      });
    },
  });

  const openModalNewUser = () => {
    setNewUser(true);
  };

  const closeModalNewUser = () => {
    setNewUser(false);
  };

  return (
    <AdminListLayout>
      <AdminListHeader
        title="USERS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un utilisateur..."
        actionLabel="ADD NEW USER"
        onAction={openModalNewUser}
      />
      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '10%',
            render: (item) => item.id,
          },
          {
            label: 'NAME',
            render: (item) => item.name,
          },
          {
            label: 'CREATED AT',
            width: '10%',
            render: (item) => {
              const createdAt = new Date(item.created_at);

              return `${String(createdAt.getDate()).padStart(2, '0')}/${String(
                createdAt.getMonth() + 1
              ).padStart(2, '0')}/${createdAt.getFullYear()}`;
            },
          },
          {
            label: 'STATUS',
            width: '10%',
            render: (item) => (item.isAdmin === 1 ? 'admin' : 'user'),
          },
          {
            label: 'PASSWORD',
            width: '10%',
            render: (item) => (
              <VpnKey
                className="admin_tools_ico"
                onClick={() => setPasswordItem(item)}
                titleAccess="Change password"
              />
            ),
          },
          {
            label: 'DELETE',
            width: '10%',
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

      {newUser && (
        <Modal open onClose={closeModalNewUser} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={closeModalNewUser}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    closeModalNewUser();
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
                onUpdate={refreshUsers}
                closeModal={closeModalNewUser}
              />
            </Container>
          </Box>
        </Modal>
      )}
      {passwordItem && (
        <Modal open onClose={() => setPasswordItem(null)} className="Movie_Modal">
          <Box>
            <Container maxWidth="sm">
              <div
                onClick={() => setPasswordItem(null)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setPasswordItem(null);
                  }
                }}
                role="button"
                tabIndex={0}
                className="modal_closed_btn"
              >
                X Fermer
              </div>

              <AdminItemsCard
                item={passwordItem}
                onUpdate={refreshUsers}
                closeModal={() => setPasswordItem(null)}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminUsersList;
