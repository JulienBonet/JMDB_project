// frontend/src/services/tmdbService.js

import api from '../api/apiClient';

export const getSeasons = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/seasons`);
  return response.data;
};

export const searchTmdb = async ({ query, includeAdult, page }) => {
  const response = await api.get('/api/tmdb/search', {
    params: {
      query,
      include_adult: includeAdult,
      page,
    },
  });

  return response.data;
};

export const getTmdbMovieDetails = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/details`);
  return response.data;
};

export const getTmdbMovie = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}`);
  return response.data;
};

export const getTmdbData = async (idTheMovieDb) => {
  const response = await api.get(`/api/tmdb/${idTheMovieDb}`);
  return response.data;
};

export const getTmdbKeywords = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/keywords`);
  return response.data;
};

export const getTmdbTrailer = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/trailer`);
  return response.data;
};

export const getTmdbCover = async (mediaType, movieId) => {
  const response = await api.get(`/api/tmdb/${mediaType}/${movieId}/cover`);
  return response.data;
};
