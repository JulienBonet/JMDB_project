import api from '../api/apiClient';

export const getTagsSortedById = async () => {
  const response = await api.get('/api/tags/sorted_id');
  return response.data;
};

export const getTagsByLetter = async (letter) => {
  const response = await api.get(`/api/tags/sorted/${letter}`);
  return response.data;
};

export const getTagMovies = async (id) => {
  const response = await api.get(`/api/tags/${id}`);
  return response.data;
};

export const getTagMoviesSorted = async (id, sort) => {
  const response = await api.get(`/api/tags/${id}/sorted/${sort}`);
  return response.data;
};

export const deleteTag = async (id) => {
  const response = await api.delete(`/api/tag/${id}`);
  return response.status;
};
