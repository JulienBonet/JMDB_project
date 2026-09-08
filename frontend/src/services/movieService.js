// frontend/src/services/movieService.js

import api from '../api/apiClient';

export const getMovie = async (id) => {
  const response = await api.get(`/api/movies/${id}`);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/api/movie/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/api/movie/${id}`);
  return response.data;
};
