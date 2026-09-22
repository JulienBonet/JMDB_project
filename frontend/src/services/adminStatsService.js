import api from '../api/apiClient';

export const getAdminStats = async () => {
  const response = await api.get('/api/admin/stats');
  return response.data;
};

export const exportAdminCsv = async () => {
  return api.get('/api/admin/export-csv', {
    responseType: 'blob',
  });
};
