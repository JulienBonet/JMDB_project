import api from '../api/apiClient';

export const getFocusSortedById = async () => {
  const response = await api.get('/api/focus/sorted_id');
  return response.data;
};

export const deleteFocus = async (id) => {
  const response = await api.delete(`/api/focus/${id}`);
  return response.status;
};
