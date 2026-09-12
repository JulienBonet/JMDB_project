import { useEffect, useState } from 'react';
import { getSeasons } from '../services/tmdbService';
import {
  parseTvSeasons,
  formatTvSeasons,
  calculateTotalEpisodes,
  calculateTotalDuration,
} from '../utils/tvShowUtils';

export function useTvSeasons({
  isModify,
  isTvShow,
  idTheMovieDb,
  movieData,
  setMovieData,
  externalSeasonsInfo = null,
}) {
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [seasonsInfo, setSeasonsInfo] = useState(externalSeasonsInfo || []);
  const [tvSeasons, setTvSeasons] = useState(movieData.tvSeasons || '');
  const [nbTvEpisodes, setNbTvEpisodes] = useState(movieData.nbTvEpisodes || 0);

  // Utilise les informations de saisons fournies par le composant parent
  useEffect(() => {
    if (externalSeasonsInfo === null) return;

    setSeasonsInfo(externalSeasonsInfo);
  }, [externalSeasonsInfo]);

  // Parse tvSeasons de movieData dès le mode modify
  useEffect(() => {
    if (!isModify || !isTvShow) return;
    if (!movieData.tvSeasons) return;

    const parsed = parseTvSeasons(movieData.tvSeasons);
    setSelectedSeasons(parsed);
  }, [isModify, isTvShow, movieData.tvSeasons]);

  // Récupération des infos season episodes TMDB en mode modify
  useEffect(() => {
    if (externalSeasonsInfo !== null || !isModify || !isTvShow || !idTheMovieDb) {
      return;
    }

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
  }, [externalSeasonsInfo, isModify, isTvShow, idTheMovieDb]);

  // Mise à jour du nombre total d’épisodes
  useEffect(() => {
    if (!isTvShow) return;

    // AddNewMovie en mode manuel :
    // ne pas écraser le nombre d'épisodes saisi par l'utilisateur.
    if (externalSeasonsInfo !== null && seasonsInfo.length === 0) {
      return;
    }

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
      setMovieData((prev) => ({ ...prev, duration: '' }));
    }
  }, [nbTvEpisodes, movieData.episodeDuration, isTvShow]);

  // Mise à jour automatique de tvSeasons selon les saisons sélectionnées
  useEffect(() => {
    if (!isTvShow) return;

    // AddNewMovie en mode manuel :
    // ne pas écraser les saisons saisies par l'utilisateur.
    if (externalSeasonsInfo !== null && seasonsInfo.length === 0) {
      return;
    }

    if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
      setTvSeasons('');
      setMovieData((prev) => ({ ...prev, tvSeasons: '' }));
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
