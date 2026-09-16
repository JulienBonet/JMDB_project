import api from '../api/apiClient';

export const getArtists = async (type) => {
  const response = await api.get(`/api/${type}`);
  return response.data;
};

export const getArtistsSortedById = async (type) => {
  const response = await api.get(`/api/${type}/sorted_id`);
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

export const deleteArtist = async (type, id) => {
  const endpoints = {
    directors: `/api/director/delete/${id}`,
    casting: `/api/casting/${id}`,
    screenwriters: `/api/screenwriter/${id}`,
    music: `/api/compositor/${id}`,
    studio: `/api/studio/${id}`,
  };

  const response = await api.delete(endpoints[type]);

  return response.status;
};

export const getRandomArtistFocus = async (type) => {
  const response = await api.get(`/api/${type}/focus/random`);
  return response.data;
};
