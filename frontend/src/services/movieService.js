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

export const updateMovieImage = async (id, file) => {
  const formData = new FormData();
  formData.append('cover', file);

  const response = await api.put(`/api/movie/${id}/image`, formData);

  return response.data;
};

export const getCollection = async (route) => {
  const response = await api.get(`/api/${route}`);
  return response.data;
};

export const getByName = async (endpoint, name) => {
  const response = await api.get(`/api/${endpoint}/byname/${encodeURIComponent(name)}`);

  return response.data;
};
