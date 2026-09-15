import api from '../api/apiClient';

// KINDS
export const getKinds = async () => {
  const response = await api.get('/api/kinds');
  return response.data;
};

export const getKindsSortedById = async () => {
  const response = await api.get('/api/kinds/sorted_id');
  return response.data;
};

export const deleteKind = async (id) => {
  return api.delete(`/api/kind/${id}`);
};

// COUNTRIES
export const getCountries = async () => {
  const response = await api.get('/api/country');
  return response.data;
};

export const getCountriesSortedById = async () => {
  const response = await api.get('/api/country/sorted_id');
  return response.data;
};

export const deleteCountry = async (id) => {
  return api.delete(`/api/country/${id}`);
};

// LANGUAGES
export const getLanguagesSortedById = async () => {
  const response = await api.get('/api/languages/sorted_id');
  return response.data;
};

export const deleteLanguage = async (id) => {
  return api.delete(`/api/language/${id}`);
};
