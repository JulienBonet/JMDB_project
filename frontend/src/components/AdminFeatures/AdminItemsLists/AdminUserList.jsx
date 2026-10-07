/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { VpnKey, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// services
import { getUsersSortedById, deleteUser } from '../../../services/userService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardUsers';
import AdminModal from '../AdminModal/AdminModal';
import AdminCreateItemModal from '../AdminCreateItemModal/AdminCreateItemModal';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';
import AdminListPagination from './ui/AdminListPagination';

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
      {/* List header */}
      <AdminListHeader
        title="USERS LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un utilisateur..."
        actionLabel="ADD NEW USER"
        onAction={openModalNewUser}
      />
      {/* end List header */}

      {/* list table */}
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
      {/* end list table */}

      {/* Pagination */}
      <AdminListPagination totalPages={totalPages} onChange={handlePageChange} />
      {/* end Pagination */}

      {/* ADMIN CARD */}
      {passwordItem && (
        <AdminModal open={!!passwordItem} onClose={() => setPasswordItem(null)}>
          <AdminItemsCard
            item={passwordItem}
            onUpdate={refreshUsers}
            closeModal={() => setPasswordItem(null)}
          />
        </AdminModal>
      )}
      {/* END ADMIN CARD */}

      {/* CREATED CARD */}
      {newUser && (
        <AdminCreateItemModal
          open={!!newUser}
          onClose={closeModalNewUser}
          origin={origin}
          onUpdate={refreshUsers}
        />
      )}
      {/* END CREATED CARD */}
    </AdminListLayout>
  );
}

export default AdminUsersList;
