// frontend/src/services/tmdbService.js

import api from '../api/apiClient';

export const getSeasons = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/seasons`);
  return response.data;
};
