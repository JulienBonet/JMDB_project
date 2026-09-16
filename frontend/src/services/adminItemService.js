import api from '../api/apiClient';

export const getFocusCategories = async () => {
  const response = await api.get('/api/focuscategory');
  return response.data;
};

export const createAdminItem = async (origin, data) => {
  const endpoint = origin === 'user' ? `/api/auth/${origin}` : `/api/${origin}`;

  const response = await api.post(endpoint, data);

  return response.data;
};
