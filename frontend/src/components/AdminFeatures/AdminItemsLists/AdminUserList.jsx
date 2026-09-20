/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Button, Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import './adminLists.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardUsers';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getUsersSortedById, deleteUser } from '../../../services/userService';

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
      <section className="HeaderAdminItemsSection">
        <div className="admin_Title_feat_container">
          <h1 className="admin_Title_feat">USERS LIST</h1>
        </div>
        <div className="admin_feat_tools_line">
          <div className="Admin_search_bar_container">
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un utilisateur..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#aaa' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')} size="small">
                      <ClearIcon sx={{ color: '#888' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 300, // ajuste si besoin
                borderRadius: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--color-03)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-03)',
                    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                  },
                },
                input: {
                  color: '#333',
                  '&::placeholder': {
                    color: '#aaa',
                    opacity: 1,
                  },
                },
              }}
            />
          </div>
          <Button variant="contained" onClick={() => openModalNewUser()}>
            ADD NEW USER
          </Button>
        </div>
      </section>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">STATUT</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="LoaderTemp">
                LOADING...
              </td>
            </tr>
          ) : (
            currentItems.map((DataItem) => {
              // Formater la date
              const createdAt = new Date(DataItem.created_at);
              const formattedDate = `${String(createdAt.getDate()).padStart(2, '0')}/${String(
                createdAt.getMonth() + 1
              ).padStart(2, '0')}/${createdAt.getFullYear()}`;

              // Statut
              const status = DataItem.isAdmin === 1 ? 'admin' : 'user';

              return (
                <tr key={DataItem.id}>
                  <th scope="row">{DataItem.id}</th>
                  <td data-label="name">{DataItem.name}</td>
                  <td data-label="created at">{formattedDate}</td>
                  <td data-label="Statut">{status}</td>
                  <td data-label="Change Password">
                    <VpnKeyIcon
                      className="admin_tools_ico"
                      onClick={() => setPasswordItem(DataItem)}
                      titleAccess="Change password"
                    />
                  </td>
                  <td data-label="Supprimer">
                    <DeleteIcon
                      className="admin_tools_ico"
                      onClick={() => handleDelete(DataItem.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
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
