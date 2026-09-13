import purgeOrphanRecords from '../utils/purgeOrphanRecords';

export function useAddMovieForm({
  navigate,
  setMovie,
  setSelectedKinds,
  setSelectedDirectors,
  setSelectedCasting,
  setSelectedScreenwriters,
  setSelectedMusic,
  setSelectedStudios,
  setSelectedCountries,
  setSelectedLanguages,
  setSelectedTags,
  setSelectedFocus,
  setCoverPreview,
  initialCoverPreview,
  resetCoverFile,
  setTmdbSeasonsInfo,
  setSelectedSeasons,
  setTvSeasons,
  setNbTvEpisodes,
  setVersion,
}) {
  const handleReturn = async () => {
    navigate('/admin_feat');

    try {
      await purgeOrphanRecords();
      console.info('Purge exécutée avec succès après le reset.');
    } catch (error) {
      console.error('Erreur lors de la purge :', error);
    }
  };

  const handleChangeMovieDb = (event) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      idTheMovieDb: event.target.value,
    }));
  };

  const resetStates = async (isTvShow = false, withPurge = true) => {
    setMovie({
      title: '',
      altTitle: '',
      year: '',
      duration: 0,
      pitch: '',
      story: '',
      posterUrl: '',
      trailer: '',
      location: null,
      videoFormat: '',
      videoSupport: '',
      fileSize: null,
      idTheMovieDb: '',
      idIMDB: '',
      isTvShow,
      nbTvSeasons: '',
      tvSeasons: '',
      nbTvEpisodes: null,
      episodeDuration: 0,
    });

    setSelectedKinds([]);
    setSelectedDirectors([]);
    setSelectedCasting([]);
    setSelectedScreenwriters([]);
    setSelectedMusic([]);
    setSelectedStudios([]);
    setSelectedCountries([]);
    setSelectedLanguages([]);
    setSelectedTags([]);
    setSelectedFocus([]);

    setCoverPreview(initialCoverPreview);
    resetCoverFile();

    setTmdbSeasonsInfo([]);
    setSelectedSeasons([]);
    setTvSeasons('');
    setNbTvEpisodes('');
    setVersion('none');

    if (withPurge) {
      try {
        await purgeOrphanRecords();
        console.info('Purge exécutée avec succès après le reset.');
      } catch (error) {
        console.error('Erreur lors de la purge :', error);
      }
    }
  };

  return {
    handleReturn,
    handleChangeMovieDb,
    resetStates,
  };
}
