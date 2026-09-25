import { useState } from 'react';
import { exportAdminCsv } from '../services/adminStatsService';

function useAdminExportCsv() {
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  const handleExportCsv = async () => {
    setIsExportingCsv(true);

    try {
      const response = await exportAdminCsv();

      const disposition = response.headers['content-disposition'];

      let fileName = 'movies_export.csv';

      if (disposition && disposition.includes('filename=')) {
        fileName = disposition.split('filename=')[1].replace(/"/g, '');
      } else {
        const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
        fileName = `movies_export_${dateStr}.csv`;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Erreur export CSV', err);
    } finally {
      setIsExportingCsv(false);
    }
  };

  return {
    isExportingCsv,
    handleExportCsv,
  };
}

export default useAdminExportCsv;
