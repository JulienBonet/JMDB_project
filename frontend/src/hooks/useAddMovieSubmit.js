import { useState } from 'react';
import { toast } from 'react-toastify';
import { createMovie } from '../services/movieService';

export function useAddMovieSubmit({
  movie,
  version,
  selectedFocus,
  selectedKinds,
  selectedDirectors,
  selectedCasting,
  selectedScreenwriters,
  selectedMusic,
  selectedStudios,
  selectedCountries,
  selectedLanguages,
  selectedTags,
  selectedCoverFile,
  handleReturn,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!movie.title) {
      toast.warn('Merci de saisir un titre');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const bodyData = {
        ...movie,
        vostfr: version === 'VOSTFR' ? 1 : 0,
        multi: version === 'MULTI' ? 1 : 0,
        isTvShow: movie.isTvShow ? 1 : 0,
        focus: selectedFocus,
        genres: selectedKinds,
        directors: selectedDirectors.map((d) => d.name),
        castings: selectedCasting.map((c) => c.name),
        screenwriters: selectedScreenwriters.map((s) => s.name),
        compositors: selectedMusic.map((m) => m.name),
        studios: selectedStudios.map((s) => s.name),
        countries: selectedCountries.map((c) => c.name),
        languages: selectedLanguages.map((l) => l.name),
        tags: selectedTags.map((t) => t.name),
      };

      Object.entries(bodyData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (selectedCoverFile) {
        formData.append('cover', selectedCoverFile);
      } else if (movie.posterUrl) {
        formData.append('coverUrl', movie.posterUrl);
      }

      await createMovie(formData);

      toast.success('Le film a été ajouté avec succès !');
      handleReturn();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du film 😱");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleFormSubmit,
  };
}
