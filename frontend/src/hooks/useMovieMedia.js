import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export function useMovieMedia(movieData, setMovieData) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!movieData) return;

    const support = movieData.videoSupport?.toLowerCase() || '';

    // Fichier unique
    if (
      !movieData.isTvShow &&
      support.includes('fichier multimédia') &&
      movieData.location &&
      !movieData.path
    ) {
      const segments = movieData.location.split('\\');
      const filename = segments.pop();
      const folderPath = segments.join('\\');

      setMovieData((prev) => ({
        ...prev,
        path: folderPath || prev.path || '',
        location: filename || prev.location || '',
      }));
    }

    // Série TV
    if (movieData.isTvShow && support.includes('fichier multimédia') && !movieData.path) {
      const folderName = movieData.title?.replace(/[^\w\s]/g, '').trim() || 'Série non identifiée';

      setMovieData((prev) => ({
        ...prev,
        path: prev.path || folderName,
        location: prev.location || folderName,
      }));
    }
  }, [movieData?.id]);

  // Gestion fichier unique
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const extension = file.name.split('.').pop().toLowerCase();
    const validFormats = ['avi', 'mkv', 'mp4'];

    if (!validFormats.includes(extension)) {
      toast.warn('Veuillez sélectionner un fichier vidéo valide (avi, mkv, mp4).');
      return;
    }

    const sizeGB = file.size / (1024 * 1024 * 1024);

    setMovieData((prev) => ({
      ...prev,
      location: file.name,
      path: '',
      videoFormat: extension,
      videoSupport: 'Fichier multimédia',
      fileSize: `${sizeGB.toFixed(2)} GB`,
    }));

    toast.success(`Fichier "${file.name}" chargé (${sizeGB.toFixed(2)} GB)`);
  };

  // Gestion dossier complet
  const handleFolderChange = (event) => {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    const videoExtensions = ['avi', 'mkv', 'mp4'];

    const videoFiles = files.filter((file) =>
      videoExtensions.includes(file.name.split('.').pop().toLowerCase())
    );

    if (videoFiles.length === 0) {
      toast.warn('Aucun fichier vidéo trouvé dans ce dossier.');
      return;
    }

    const totalBytes = videoFiles.reduce((acc, file) => acc + file.size, 0);

    const totalGB = totalBytes / (1024 * 1024 * 1024);

    const totalSizeDisplay =
      totalGB < 1 ? `${(totalBytes / (1024 * 1024)).toFixed(2)} MB` : `${totalGB.toFixed(2)} GB`;

    const firstPath = videoFiles[0].webkitRelativePath;
    const rootPath = firstPath.split('/')[0];

    setMovieData((prev) => ({
      ...prev,
      path: rootPath,
      location: rootPath,
      videoSupport: 'Fichier multimédia',
      fileSize: totalSizeDisplay,
      isTvShow: true,
    }));

    toast.success(
      `📁 Dossier "${rootPath}" chargé (${videoFiles.length} vidéos, ${totalSizeDisplay})`
    );
  };

  const handleFormatSupportChange = (event) => {
    const newSupport = event.target.value;

    setMovieData((prevData) => {
      if (newSupport === 'DVD original' || newSupport === 'DVD R/RW') {
        return {
          ...prevData,
          videoSupport: newSupport,
          location: '',
          videoFormat: '',
          fileSize: '',
          vostfr: 0,
          multi: 0,
        };
      }

      return {
        ...prevData,
        videoSupport: newSupport,
      };
    });
  };

  return {
    fileInputRef,
    selectedFile,
    handleFileChange,
    handleFolderChange,
    handleFormatSupportChange,
  };
}
