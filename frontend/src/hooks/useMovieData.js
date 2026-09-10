import { useEffect, useState } from 'react';
import { getMovie } from '../services/movieService';

export function useMovieData(movie, origin) {
  const [movieData, setMovieData] = useState({
    id: movie.id || '',
    title: movie.title || '',
    altTitle: movie.altTitle || '',
    year: movie.year || '',
    duration: movie.duration || '',
    videoSupport:
      movie.videoSupport === 'Fichier multimédia' ? 'FICHIER MULTIMEDIA' : movie.videoSupport || '',
    multi: movie.multi || 0,
    vostfr: movie.vostfr || 0,
    story: movie.story || '',
    location: movie.location || '',
    fileSize: movie.fileSize || '',
    comment: movie.comment || '',
    isTvShow: movie.isTvShow || '',
    tvSeasons: movie.tvSeasons || '',
    nbTvEpisodes: movie.nbTvEpisodes || '',
    episodeDuration: movie.episodeDuration || '',
    idTheMovieDb: movie.idTheMovieDb || '',
  });

  const fetchMovieData = async () => {
    try {
      const movieId = origin === 'country' ? movie.movieId : movieData.id;

      const data = await getMovie(movieId);

      setMovieData(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [movie.id, movieData.id]);

  useEffect(() => {
    setMovieData(movie);
  }, [movie]);

  return {
    movieData,
    setMovieData,
    refetchMovieData: fetchMovieData,
  };
}
