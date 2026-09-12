import api from '../api/apiClient';

// GENRE
export const searchGenreInDatabase = async (genreName) => {
  try {
    const response = await api.get(`/api/kind/${encodeURIComponent(genreName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for genre in database: ${error.message}`);
  }
};

export const createGenreInDatabase = async (genreName) => {
  try {
    const response = await api.post('/api/kind', { name: genreName });

    if (response.status === 201 && response.data) {
      return response.data;
    }

    throw new Error('Failed to create genre in database');
  } catch (error) {
    throw new Error(`Error creating genre in database: ${error.message}`);
  }
};

// STUDIO
export const searchStudioInDatabase = async (studioName) => {
  try {
    const regexStudioName = studioName.replace(/\//g, '-');
    const response = await api.get(`/api/studio/byname/${encodeURIComponent(regexStudioName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for studio in database: ${error.message}`);
  }
};

export const createStudioInDatabase = async (studioName) => {
  const regexStudioName = studioName.replace(/\//g, '-');

  const response = await api.post('/api/studio', {
    name: regexStudioName,
  });

  return response.data;
};

// COUNTRY
export const searchCountryInDatabase = async (countryName) => {
  try {
    const response = await api.get(`/api/country/byname/${encodeURIComponent(countryName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for country in database: ${error.message}`);
  }
};

export const createCountryInDatabase = async (countryName) => {
  const response = await api.post('/api/country', {
    name: countryName,
  });

  return response.data;
};

// LANGUAGE
export const searchLanguageInDatabase = async (languageName) => {
  try {
    const response = await api.get(`/api/language/byname/${encodeURIComponent(languageName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for language in database: ${error.message}`);
  }
};

export const createLanguageInDatabase = async (languageName) => {
  const response = await api.post('/api/language', {
    name: languageName,
  });

  return response.data;
};

// DIRECTOR
export const searchDirectorInDatabase = async (directorName) => {
  try {
    const response = await api.get(`/api/director/byname/${encodeURIComponent(directorName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for director in database: ${error.message}`);
  }
};

export const createDirectorInDatabase = async (directorName) => {
  const response = await api.post('/api/director', {
    name: directorName,
  });

  return response.data;
};

// SCREENWRITER
export const searchScreenwriterInDatabase = async (screenwriterName) => {
  try {
    const response = await api.get(
      `/api/screenwriter/byname/${encodeURIComponent(screenwriterName)}`
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for screenwriter in database: ${error.message}`);
  }
};

export const createScreenwriterInDatabase = async (screenwriterName) => {
  const response = await api.post('/api/screenwriter', {
    name: screenwriterName,
  });

  return response.data;
};

// COMPOSITOR
export const searchCompositorInDatabase = async (compositorName) => {
  try {
    const response = await api.get(`/api/music/byname/${encodeURIComponent(compositorName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for compositor in database: ${error.message}`);
  }
};

export const createCompositorInDatabase = async (compositorName) => {
  const response = await api.post('/api/compositor', {
    name: compositorName,
  });

  return response.data;
};

// CASTING
export const searchCastingInDatabase = async (castingName) => {
  try {
    const response = await api.get(`/api/casting/byname/${encodeURIComponent(castingName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for casting in database: ${error.message}`);
  }
};

export const createCastingInDatabase = async (castingName) => {
  const response = await api.post('/api/casting', {
    name: castingName,
  });

  return response.data;
};

// TAG
export const searchTagInDatabase = async (tagName) => {
  try {
    const response = await api.get(`/api/tag/byname/${encodeURIComponent(tagName)}`);

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    throw new Error(`Error searching for tag in database: ${error.message}`);
  }
};

export const createTagInDatabase = async (tagName) => {
  const response = await api.post('/api/tag', {
    name: tagName,
  });

  return response.data;
};
