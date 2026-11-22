import api from '../api/apiClient';

export const getFavoriteStatus = async (movieId) => {
  const response = await api.get(`/api/favorites/${movieId}`);
  return response.data;
};

export const addFavorite = async (movieId) => {
  const response = await api.post('/api/favorites', {
    movieId,
  });

  return response.data;
};

export const removeFavorite = async (movieId) => {
  const response = await api.delete('/api/favorites', {
    data: {
      movieId,
    },
  });

  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get('/api/favorites');
  return response.data;
};

export const getFavoritesAlphaAsc = async () => {
  const response = await api.get('/api/favorites/sorted0');
  return response.data;
};

export const getFavoritesAlphaDesc = async () => {
  const response = await api.get('/api/favorites/sorted1');
  return response.data;
};

export const getFavoritesYearAsc = async () => {
  const response = await api.get('/api/favorites/sorted2');
  return response.data;
};

export const getFavoritesYearDesc = async () => {
  const response = await api.get('/api/favorites/sorted3');
  return response.data;
};
