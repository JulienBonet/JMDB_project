// frontend/src/services/favoriteService.js

import api from '../api/apiClient';

export const getFavoriteStatus = async (userId, movieId) => {
  const response = await api.get(`/api/favorites/${userId}/${movieId}`);
  return response.data;
};

export const addFavorite = async (userId, movieId) => {
  const response = await api.post('/api/favorites', {
    userId,
    movieId,
  });

  return response.data;
};

export const removeFavorite = async (userId, movieId) => {
  const response = await api.delete('/api/favorites', {
    data: {
      userId,
      movieId,
    },
  });

  return response.data;
};
