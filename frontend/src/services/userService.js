import api from '../api/apiClient';

export const getUsersSortedById = async () => {
  const response = await api.get('/api/user/sorted_id');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/auth/user/${id}`);
  return response.status;
};

export const updateUserPassword = async (id, password) => {
  const response = await api.patch(`/api/auth/user/${id}/password`, {
    password,
  });

  return response.data;
};
