import { useEffect, useState } from 'react';
import { searchTmdb } from '../services/tmdbService';

export const useMovieInfosEntrance = (title) => {
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [adult, setAdult] = useState(false);
  const [error, setError] = useState(null);
  const [genresLoaded, setGenresLoaded] = useState(false);

  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    setError(null);
    setData([]);
    setGenresLoaded(false);

    const fetchData = async () => {
      try {
        const result = await searchTmdb({
          query: encodedTitle,
          includeAdult: adult,
          page,
        });

        const { movieRes, tvRes, genresMovie, genresTV } = result;

        const movieResults = movieRes.results.map((movie) => ({
          ...movie,
          media_type: 'movie',
        }));

        const tvResults = tvRes.results.map((tvShow) => ({
          ...tvShow,
          media_type: 'tv',
        }));

        const combined = [...movieResults, ...tvResults].sort(
          (a, b) => b.popularity - a.popularity
        );

        setData(combined);

        setFullData({
          total_results: movieRes.total_results + tvRes.total_results,
          total_pages: Math.max(movieRes.total_pages, tvRes.total_pages),
        });

        setGenres([
          ...genresMovie.genres,
          ...genresTV.genres.filter(
            (tvGenre) => !genresMovie.genres.some((movieGenre) => movieGenre.id === tvGenre.id)
          ),
        ]);

        setGenresLoaded(true);
      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchData();
  }, [page, adult, encodedTitle]);

  return {
    data,
    fullData,
    genres,
    page,
    setPage,
    adult,
    setAdult,
    error,
    genresLoaded,
  };
};
