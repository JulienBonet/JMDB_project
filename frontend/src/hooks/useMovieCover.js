import { useEffect, useRef, useState } from 'react';
import { updateMovieImage } from '../services/movieService';

export function useMovieCover({ movie, isModify, getImageUrl }) {
  const [image, setImage] = useState(getImageUrl(movie.cover));
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showImageButton, setShowImageButton] = useState(true);

  const fileCoverRef = useRef(null);

  useEffect(() => {
    if (!isModify) return;

    const originalImageUrl = getImageUrl(movie.cover);

    setShowUploadButton(image === originalImageUrl);
  }, [isModify, image, movie.cover, getImageUrl]);

  // Prépare une image locale ou distante sans l'enregistrer
  const handleCoverFileSelection = (file) => {
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    if (fileCoverRef.current) {
      fileCoverRef.current.files = dataTransfer.files;
    }

    setImage(newImageUrl);
    setShowUploadButton(false);

    return newImageUrl;
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    handleCoverFileSelection(file);
  };

  const handleUploadClick = () => {
    fileCoverRef.current?.click();
  };

  const handleResetImage = () => {
    if (fileCoverRef.current) {
      fileCoverRef.current.value = '';
    }

    setImage(getImageUrl(movie.cover));
    setShowUploadButton(true);
  };

  const handleUpdateImage = async () => {
    const file = fileCoverRef.current?.files[0];

    if (!file) return null;

    const data = await updateMovieImage(movie.id, file);

    setImage(data.url);

    return data;
  };

  return {
    image,
    setImage,
    showUploadButton,
    showImageButton,
    setShowImageButton,
    fileCoverRef,
    handleCoverUpload,
    handleCoverFileSelection,
    handleUploadClick,
    handleResetImage,
    handleUpdateImage,
  };
}
