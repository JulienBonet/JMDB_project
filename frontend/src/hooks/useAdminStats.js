import { useEffect, useState } from 'react';
import { getAdminStats } from '../services/adminStatsService';

function useAdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();

        const totalSizeTB =
          typeof data.totalSizeMB === 'number' ? +(data.totalSizeMB / 1024 / 1024).toFixed(3) : 0;

        const totalDurationMinutes =
          typeof data.totalDuration === 'string'
            ? Number(data.totalDuration)
            : data.totalDuration || 0;

        const totalDurationHours = Math.floor(totalDurationMinutes / 60);

        setStats({
          ...data,
          totalSizeTB,
          totalDurationHours,
        });
      } catch (err) {
        console.error('Erreur stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
  };
}

export default useAdminStats;
