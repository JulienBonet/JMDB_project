/* eslint-disable no-alert */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { Button, Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import './adminLists.css';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import MovieCard from '../../MovieCard/MovieCard';

// refactor
import { getCollection, deleteMovie } from '../../../services/movieService';
import useAdminItemsList from '../../../hooks/useAdminItemsList';
import AdminListHeader from './ui/AdminListHeader';

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
    <section className="AdminItemsSection">
      <AdminListHeader
        title="MOVIES LIST"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Rechercher un film..."
        actionLabel="ADD NEW FILM"
        onAction={handleAddNewMovie}
      />

      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">TITLE</th>
            <th scope="col">YEAR</th>
            <th scope="col">DURATION</th>
            <th scope="col">SUPPORT</th>
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
            currentItems.map((movieData) => (
              <tr key={movieData.id}>
                <th scope="row">{movieData.id}</th>

                <td data-label="Titre">{movieData.title}</td>

                <td data-label="Année">{movieData.year}</td>

                <td data-label="Durée">{movieData.duration}</td>

                <td data-label="Support">{movieData.videoSupport}</td>

                <td data-label="Aperçu">
                  <PreviewIcon className="admin_tools_ico" onClick={() => openModal(movieData)} />
                </td>

                <td data-label="Supprimer">
                  <DeleteIcon
                    className="admin_tools_ico"
                    onClick={() => handleOpenDeleteConfirm(movieData.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
    </section>
  );
}

export default AdminMovieList;
