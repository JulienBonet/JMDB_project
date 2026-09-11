import { useEffect, useState } from 'react';
import { getByName } from '../services/movieService';

export function useMovieRelations({
  genres,
  directors,
  casting,
  screenwriters,
  music,
  studios,
  countries,
  tags,
  focus,
}) {
  const [selectedKinds, setSelectedKinds] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedCasting, setSelectedCasting] = useState([]);
  const [selectedScreenwriters, setSelectedScreenwriters] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState([]);
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState([]);

  const fetchByNames = async (namesString, endpoint, setter) => {
    if (!namesString) return;

    try {
      const namesArray = namesString.split(', ').map(async (name) => {
        try {
          return await getByName(endpoint, name);
        } catch (err) {
          console.warn(`Error fetching ${endpoint} ${name}:`, err);
          return null;
        }
      });

      const result = (await Promise.all(namesArray)).filter(Boolean);
      setter(result);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const getSelectedNames = (list) => list.map((item) => item.name).join(', ');

  useEffect(() => {
    fetchByNames(genres, 'kind', setSelectedKinds);
  }, [genres]);

  useEffect(() => {
    fetchByNames(directors, 'director', setSelectedDirectors);
  }, [directors]);

  useEffect(() => {
    fetchByNames(casting, 'casting', setSelectedCasting);
  }, [casting]);

  useEffect(() => {
    fetchByNames(screenwriters, 'screenwriter', setSelectedScreenwriters);
  }, [screenwriters]);

  useEffect(() => {
    fetchByNames(music, 'music', setSelectedMusic);
  }, [music]);

  useEffect(() => {
    fetchByNames(studios, 'studio', setSelectedStudios);
  }, [studios]);

  useEffect(() => {
    fetchByNames(countries, 'country', setSelectedCountries);
  }, [countries]);

  useEffect(() => {
    fetchByNames(tags, 'tags', setSelectedTags);
  }, [tags]);

  useEffect(() => {
    fetchByNames(focus, 'focus', setSelectedFocus);
  }, [focus]);

  return {
    selectedKinds,
    selectedDirectors,
    selectedCasting,
    selectedScreenwriters,
    selectedMusic,
    selectedStudios,
    selectedCountries,
    selectedTags,
    selectedFocus,

    setSelectedKinds,
    setSelectedDirectors,
    setSelectedCasting,
    setSelectedScreenwriters,
    setSelectedMusic,
    setSelectedStudios,
    setSelectedCountries,
    setSelectedTags,
    setSelectedFocus,

    fetchByNames,
    getSelectedNames,
  };
}
