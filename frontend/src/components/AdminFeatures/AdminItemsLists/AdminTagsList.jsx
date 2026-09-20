/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { Button, Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import './adminLists.css';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AdminItemsCard from '../AdminItemsCards/AdminItemsCardkindsLanguagesTags';
import CreateItemCard from '../CreateItemCard/CreateItemCard';
// Refactor
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import { getTagsSortedById, deleteTag } from '../../../services/tagService';

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
    <section className="AdminItemsSection">
      <section className="HeaderAdminItemsSection">
        <div className="admin_Title_feat_container">
          <h1 className="admin_Title_feat">TAGS LIST</h1>
        </div>
        <div className="admin_feat_tools_line">
          <div className="Admin_search_bar_container">
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un tags..."
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
          <Button variant="contained" onClick={() => openModalNewTag()}>
            ADD NEW TAG
          </Button>
        </div>
      </section>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">TAG</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="LoaderTemp">LOADING...</div>
          ) : (
            currentItems.map((DataItem) => (
              <tr key={DataItem.id}>
                <th scope="row">{DataItem.id}</th>
                <td data-label="Tag">{DataItem.name}</td>
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
    </section>
  );
}

export default AdminTagsList;
