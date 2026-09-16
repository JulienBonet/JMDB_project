// frontend/src/services/movieService.js

import api from '../api/apiClient';

export const getMovie = async (id) => {
  const response = await api.get(`/api/movies/${id}`);
  return response.data;
};

export const getMoviesSortedNox = async () => {
  const response = await api.get('/api/movies/sorted/nox');
  return response.data;
};

export const createMovie = async (formData) => {
  const response = await api.post('/api/movie', formData);
  return response.data;
};

export const updateMovie = async (id, movieData) => {
  const response = await api.put(`/api/movie/${id}`, movieData);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/api/movie/${id}`);
  return response.status;
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

export const searchMovies = async ({
  search = '',
  kind = '',
  country = '',
  year = '',
  tvshow = 'all',
  orderby = 'id',
  direction = 'DESC',
}) => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (kind) params.append('kind', kind);
  if (country) params.append('country', country);
  if (year) params.append('year', year);

  if (tvshow !== 'all') {
    params.append('tvshow', tvshow === 'movies' ? 0 : 1);
  }

  params.append('orderby', orderby);
  params.append('direction', direction);

  const response = await api.get(`/api/movies/search-filter?${params.toString()}`);

  return response.data;
};
