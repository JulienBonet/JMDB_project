import api from '../api/apiClient';

export const getArtists = async (type) => {
  const response = await api.get(`/api/${type}`);
  return response.data;
};

export const getArtistsByLetter = async (type, letter) => {
  const response = await api.get(`/api/${type}/sorted/${letter}`);
  return response.data;
};

export const getArtistMovies = async (type, id) => {
  const response = await api.get(`/api/${type}/${id}`);
  return response.data;
};

export const getArtistMoviesSorted = async (type, id, sort) => {
  const response = await api.get(`/api/${type}/${id}/sorted/${sort}`);
  return response.data;
};
