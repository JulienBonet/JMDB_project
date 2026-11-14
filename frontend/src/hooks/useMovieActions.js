import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateMovie, deleteMovie } from '../services/movieService';

export function useMovieActions({
  movieData,
  selectedKinds,
  selectedDirectors,
  selectedCasting,
  selectedScreenwriters,
  selectedMusic,
  selectedStudios,
  selectedCountries,
  selectedTags,
  selectedFocus,
  fileCoverRef,
  handleUpdateImage,
  setMovieData,
  onUpdateMovie,
  onDeleteMovie,
  closeModifyMode,
  closeModal,
}) {
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState(null);

  // UPDATE MOVIE

  const handleOpenUpdateConfirm = () => {
    setIsConfirmUpdateOpen(true);
  };

  const handleCloseUpdateConfirm = () => {
    setIsConfirmUpdateOpen(false);
  };

  const handleUpdateMovie = async () => {
    // verification titre
    if (!movieData.title) {
      toast.warn('Merci de saisir un titre');
      return;
    }

    // verification date
    const currentYear = new Date().getFullYear();
    const year = Number(movieData.year);

    if (
      movieData.year === '' ||
      movieData.year == null ||
      !Number.isInteger(year) ||
      year < 1890 ||
      year > currentYear
    ) {
      toast.warn(`Merci de saisir une année comprise entre 1890 et ${currentYear}`);
      return;
    }

    setIsConfirmUpdateOpen(false);
    setIsUpdating(true);

    let imageWarning = null;

    try {
      if (fileCoverRef.current.files[0]) {
        const imageResult = await handleUpdateImage();
        imageWarning = imageResult?.warning || null;
      }

      const payload = {
        title: movieData.title,
        altTitle: movieData.altTitle,
        year,
        duration: movieData.duration || null,
        trailer: movieData.trailer,
        story: movieData.story,
        location: movieData.location,
        videoFormat: movieData.videoFormat,
        videoSupport: movieData.videoSupport,
        fileSize: movieData.fileSize,
        vostfr: movieData.vostfr,
        multi: movieData.multi,
        comment: movieData.comment,
        genres: selectedKinds.map((genre) => genre.id),
        directors: selectedDirectors.map((director) => director.id),
        castings: selectedCasting.map((cast) => cast.id),
        screenwriters: selectedScreenwriters.map((screenwriter) => screenwriter.id),
        musics: selectedMusic.map((compositor) => compositor.id),
        studios: selectedStudios.map((studio) => studio.id),
        countries: selectedCountries.map((country) => country.id),
        tags: selectedTags.map((tag) => tag.id),
        focus: selectedFocus.map((item) => item.id),
        isTvShow: Number(movieData.isTvShow) === 1 ? 1 : 0,
        tvSeasons: movieData.tvSeasons || null,
        nbTvEpisodes: movieData.nbTvEpisodes || null,
        episodeDuration: movieData.episodeDuration || null,
        idTheMovieDb: movieData.idTheMovieDb,
      };

      const updatedMovie = await updateMovie(movieData.id, payload);

      if (imageWarning) {
        toast.warning(imageWarning);
      } else {
        toast.success('Film mis à jour avec succès');
      }

      const newMovie = Array.isArray(updatedMovie) ? updatedMovie[0] : updatedMovie;

      setMovieData(newMovie);
      onUpdateMovie(newMovie);
      closeModifyMode();

      closeModal?.();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du film et de l'image", error);
    } finally {
      setIsUpdating(false);
    }
  };

  //   DELETE MOVIE

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

    setIsConfirmDeleteOpen(false);

    try {
      const result = await deleteMovie(movieData.id);

      if (result.warning) {
        toast.warning(result.warning);
      } else {
        toast.info('Film supprimé avec succès');
      }

      onDeleteMovie(movieData.id);

      if (typeof closeModal === 'function') {
        closeModal();
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression du film');
      console.error('Erreur durant la suppression:', error);
    }
  };

  return {
    isConfirmUpdateOpen,
    isUpdating,
    handleOpenUpdateConfirm,
    handleCloseUpdateConfirm,
    handleUpdateMovie,

    isConfirmDeleteOpen,
    handleOpenDeleteConfirm,
    handleCloseDeleteConfirm,
    handleDeleteMovie,
  };
}
