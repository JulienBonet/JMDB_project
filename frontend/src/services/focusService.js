import api from '../api/apiClient';

export const getFocusSortedById = async () => {
  const response = await api.get('/api/focus/sorted_id');
  return response.data;
};

export const getFocusByCategory = async (categoryId) => {
  const response = await api.get(`/api/focus/${categoryId}`);
  return response.data;
};

export const deleteFocus = async (id) => {
  const response = await api.delete(`/api/focus/${id}`);
  return response.status;
};

export const getFocusByCategoryAsc = async (categoryId) => {
  const response = await api.get(`/api/focus/${categoryId}/sorted0`);
  return response.data;
};

export const getFocusByCategoryDesc = async (categoryId) => {
  const response = await api.get(`/api/focus/${categoryId}/sorted1`);
  return response.data;
};

export const getFocusMovies = async (focusId) => {
  const response = await api.get(`/api/focus/${focusId}/movies`);
  return response.data;
};

export const getFocusMoviesSorted = async (focusId, sort) => {
  const response = await api.get(`/api/focus/${focusId}/movies/sorted${sort}`);
  return response.data;
};
