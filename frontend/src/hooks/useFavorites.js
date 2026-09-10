import { useEffect, useState } from 'react';
import { getFavoriteStatus, addFavorite, removeFavorite } from '../services/favoriteService';

export function useFavorites(userId, movieId) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userId || !movieId) return;

    const fetchFavoriteStatus = async () => {
      try {
        const data = await getFavoriteStatus(userId, movieId);
        setIsFavorite(data.isFavorite);
      } catch (err) {
        console.error('Erreur récupération favori', err);
      }
    };

    fetchFavoriteStatus();
  }, [userId, movieId]);

  const toggleFavorite = async () => {
    if (!userId) return null;

    if (isFavorite) {
      await removeFavorite(userId, movieId);
      setIsFavorite(false);
      return false;
    }

    await addFavorite(userId, movieId);
    setIsFavorite(true);
    return true;
  };

  return {
    isFavorite,
    toggleFavorite,
  };
}
