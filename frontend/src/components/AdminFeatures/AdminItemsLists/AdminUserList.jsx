/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import './adminLists.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardUsers';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getUsersSortedById, deleteUser } from '../../../services/userService';
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';

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
    <section className="AdminItemsSection">
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
            mobileLabel: 'ID',
            width: '10%',
            render: (item) => item.id,
          },
          {
            label: 'NAME',
            mobileLabel: 'NAME',
            render: (item) => item.name,
          },
          {
            label: 'CREATED AT',
            mobileLabel: 'CREATED AT',
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
            mobileLabel: 'STATUS',
            width: '10%',
            render: (item) => (item.isAdmin === 1 ? 'admin' : 'user'),
          },
          {
            label: 'PASSWORD',
            mobileLabel: 'PASSWORD',
            width: '10%',
            render: (item) => (
              <VpnKeyIcon
                className="admin_tools_ico"
                onClick={() => setPasswordItem(item)}
                titleAccess="Change password"
              />
            ),
          },
          {
            label: 'DELETE',
            mobileLabel: 'DELETE',
            width: '10%',
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
    </section>
  );
}

export default AdminUsersList;
