//frontend/src/utils/tvShowUtils.js

export const parseTvSeasons = (tvSeasons) => {
  if (!tvSeasons) return [];

  return tvSeasons
    .split(',')
    .map((block) => block.trim())
    .flatMap((block) => {
      if (block.includes('-')) {
        const [start, end] = block.split('-').map(Number);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      }

      return [Number(block)];
    });
};

export const formatTvSeasons = (selectedSeasons) => {
  if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
    return '';
  }

  const sortedSeasons = [...selectedSeasons].sort((a, b) => a - b);

  const isConsecutive = sortedSeasons.every((num, i, arr) => i === 0 || num === arr[i - 1] + 1);

  if (isConsecutive) {
    return sortedSeasons.length === 1
      ? `${sortedSeasons[0]}`
      : `${sortedSeasons[0]}-${sortedSeasons[sortedSeasons.length - 1]}`;
  }

  return sortedSeasons.join(', ');
};

export const calculateTotalEpisodes = (selectedSeasons, seasonsInfo) => {
  if (!Array.isArray(selectedSeasons) || selectedSeasons.length === 0) {
    return 0;
  }

  return selectedSeasons.reduce((sum, seasonNumber) => {
    const season = seasonsInfo.find((s) => s.season_number === seasonNumber);
    return sum + (season ? season.episode_count : 0);
  }, 0);
};

export const calculateTotalDuration = (nbTvEpisodes, episodeDuration) => {
  if (!nbTvEpisodes || !episodeDuration) {
    return '';
  }

  return nbTvEpisodes * episodeDuration;
};
