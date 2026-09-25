/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Pagination,
} from '@mui/material';
import { Delete, Preview } from '@mui/icons-material';
// services
import { getCollection, deleteMovie } from '../../../services/movieService';
// hooks
import useAdminItemsList from '../../../hooks/useAdminItemsList';
// components
import MovieCard from '../../MovieCard/MovieCard';
// UI
import AdminListHeader from './ui/AdminListHeader';
import AdminDataTable from './ui/AdminDataTable';
import AdminListLayout from './ui/AdminListLayout';

function AdminMovieList() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  const origin = 'movie';

  const fetchMovies = useCallback(() => getCollection('movies'), []);

  const deleteMovieItem = useCallback((id) => deleteMovie(id), []);

  const {
    setData,
    loading,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    handlePageChange,
  } = useAdminItemsList({
    fetchItems: fetchMovies,
    deleteItem: deleteMovieItem,
    searchKey: 'title',
  });

  const openModal = (movieData) => {
    setSelectedMovie(movieData);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  // NAVIGATION VERS NEW MOVIE
  const navigate = useNavigate();

  const handleAddNewMovie = () => {
    navigate('/new_movie');
  };

  // UPDATE MOVIE FROM MOVIECARD
  const updateMovieData = (updatedMovie) => {
    setData((prevData) =>
      prevData.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );

    if (selectedMovie && selectedMovie.id === updatedMovie.id) {
      setSelectedMovie(updatedMovie);
    }
  };

  // DELETE MOVIE
  const handleOpenDeleteConfirm = (id) => {
    setMovieIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setIsConfirmDeleteOpen(false);
    setMovieIdToDelete(null);
  };

  const handleDeleteMovie = async () => {
    if (!movieIdToDelete) return;

    console.info('Tentative de suppression du film avec ID:', movieIdToDelete);

    setIsConfirmDeleteOpen(false);

    try {
      const status = await deleteMovieItem(movieIdToDelete);

      if (status >= 200 && status < 300) {
        setData((prevData) => prevData.filter((movie) => movie.id !== movieIdToDelete));

        setSelectedMovie(null);
        setMovieIdToDelete(null);

        toast.info('Film supprimé avec succès');
      } else {
        toast.error('Erreur lors de la suppression du film');
        console.error('Erreur lors de la suppression du film');
      }
    } catch (error) {
      console.error('Erreur durant la suppression:', error);
      toast.error('Erreur lors de la suppression du film');
    }
  };

  // DELETE MOVIE FROM MOVIECARD
  const handleDeleteMovieFromMovieCard = (movieId) => {
    setData((prevData) => prevData.filter((movie) => movie.id !== movieId));
  };

  return (
    <AdminListLayout>
      <AdminListHeader
        title="MOVIES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un film..."
        actionLabel="ADD NEW FILM"
        onAction={handleAddNewMovie}
      />

      <AdminDataTable
        columns={[
          {
            label: 'ID',
            width: '10%',
            render: (item) => item.id,
          },
          {
            label: 'TITLE',
            render: (item) => item.title,
          },
          {
            label: 'YEAR',
            width: '10%',
            render: (item) => item.year,
          },
          {
            label: 'SUPPORT',
            width: '15%',
            render: (item) => item.videoSupport,
          },
          {
            label: 'VIEW',
            width: '10%',
            render: (item) => (
              <Preview className="admin_tools_ico" onClick={() => openModal(item)} />
            ),
          },
          {
            label: 'DELETE',
            mobileLabel: 'DELETE',
            width: '10%',
            render: (item) => (
              <Delete
                className="admin_tools_ico"
                onClick={() => handleOpenDeleteConfirm(item.id)}
              />
            ),
          },
        ]}
        rows={currentItems}
        loading={loading}
      />

      <Dialog open={isConfirmDeleteOpen} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirmer Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>Es-tu sûr de vouloir effacer ce film ?</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Annuler
          </Button>

          <Button onClick={handleDeleteMovie} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Pagination count={totalPages} shape="rounded" onChange={handlePageChange} />
      </Box>

      {selectedMovie && (
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

              <MovieCard
                movie={selectedMovie}
                origin={origin}
                onUpdateMovie={updateMovieData}
                onDeleteMovie={handleDeleteMovieFromMovieCard}
                closeModal={closeModal}
              />
            </Container>
          </Box>
        </Modal>
      )}
    </AdminListLayout>
  );
}

export default AdminMovieList;
