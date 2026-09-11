import { useEffect, useState } from 'react';
import { getSeasons } from '../services/tmdbService';
import {
  parseTvSeasons,
  formatTvSeasons,
  calculateTotalEpisodes,
  calculateTotalDuration,
} from '../utils/tvShowUtils';

export function useTvSeasons({ isModify, isTvShow, idTheMovieDb, movieData, setMovieData }) {
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [seasonsInfo, setSeasonsInfo] = useState([]);
  const [tvSeasons, setTvSeasons] = useState(movieData.tvSeasons || '');
  const [nbTvEpisodes, setNbTvEpisodes] = useState(movieData.nbTvEpisodes || 0);

  // Parse tvSeasons de movieData dès le mode modify
  useEffect(() => {
    if (!isModify || !isTvShow) return;

    if (!movieData.tvSeasons) return;

    const parsed = parseTvSeasons(movieData.tvSeasons);

    setSelectedSeasons(parsed);
  }, [isModify, isTvShow, movieData.tvSeasons]);

  // Récupération des infos season episodes TMDB
  useEffect(() => {
    if (!isModify || !isTvShow || !idTheMovieDb) return;

    const fetchSeasonsInfo = async () => {
      try {
        const [mediaType, movieId] = idTheMovieDb.split('/');
        const data = await getSeasons(mediaType, movieId);

        if (data.seasons && data.seasons.length > 0) {
          setSeasonsInfo(data.seasons);
        }
      } catch (err) {
        console.error('Erreur récupération saisons via backend :', err);
        setSeasonsInfo([]);
      }
    };

    fetchSeasonsInfo();
  }, [isModify, isTvShow, idTheMovieDb]);

  // Mise à jour du nombre total d’épisodes
  useEffect(() => {
    if (!isTvShow) return;

    if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
      setNbTvEpisodes(0);
      setMovieData((prev) => ({ ...prev, nbTvEpisodes: 0 }));
      return;
    }

    const totalEpisodes = calculateTotalEpisodes(selectedSeasons, seasonsInfo);

    setNbTvEpisodes(totalEpisodes);
    setMovieData((prev) => ({
      ...prev,
      nbTvEpisodes: totalEpisodes,
    }));
  }, [selectedSeasons, seasonsInfo, isTvShow]);

  // Mise à jour de la durée totale
  useEffect(() => {
    if (!isTvShow) return;

    if (!movieData.episodeDuration || movieData.episodeDuration === 0) {
      setMovieData((prev) => ({ ...prev, duration: '' }));
      return;
    }

    if (nbTvEpisodes > 0) {
      const total = calculateTotalDuration(nbTvEpisodes, movieData.episodeDuration);

      setMovieData((prev) => ({
        ...prev,
        duration: total,
      }));
    } else {
      setMovieData((prev) => ({
        ...prev,
        duration: '',
      }));
    }
  }, [nbTvEpisodes, movieData.episodeDuration, isTvShow]);

  // Mise à jour automatique de tvSeasons
  // selon les saisons sélectionnées
  useEffect(() => {
    if (!isTvShow) return;

    if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
      setTvSeasons('');
      setMovieData((prev) => ({
        ...prev,
        tvSeasons: '',
      }));
      return;
    }

    const displayValue = formatTvSeasons(selectedSeasons);

    setTvSeasons(displayValue);
    setMovieData((prev) => ({
      ...prev,
      tvSeasons: displayValue,
    }));
  }, [selectedSeasons, isTvShow]);

  return {
    selectedSeasons,
    setSelectedSeasons,
    seasonsInfo,
    tvSeasons,
    setTvSeasons,
    nbTvEpisodes,
    setNbTvEpisodes,
  };
}
