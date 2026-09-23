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

export const updateAdminItem = async (origin, id, data) => {
  console.log('PUT DATA :', data);
  const response = await api.put(`/api/${origin}/${id}`, data);

  return response.data;
};

export const updateAdminItemImage = async (origin, id, file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.put(`/api/${origin}/${id}/image`, formData);

  return response.data;
};

export const updateFocusImage = async (id, file) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('focusId', id);

  const response = await api.put(`/api/focus/${id}/image`, formData);

  return response.data;
};
