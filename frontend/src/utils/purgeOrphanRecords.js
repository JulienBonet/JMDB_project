import { purgeOrphanRecords as purge } from '../services/movieService';

// -----------------/ PURGE ALL ORPHANS RECORDS IN BDD backend /----------------- //

const purgeOrphanRecords = async () => {
  try {
    const data = await purge();

    console.info('✅ Purge réussie :', data.message);
    return data;
  } catch (error) {
    console.error('❌ Erreur dans purgeOrphanRecords :', error);
    throw error;
  }
};

export default purgeOrphanRecords;
