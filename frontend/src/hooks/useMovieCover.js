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

    if (image === originalImageUrl) {
      setShowUploadButton(true);
    } else {
      setShowUploadButton(false);
    }
  }, [isModify, image, movie.cover, getImageUrl]);

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    const newImageUrl = URL.createObjectURL(file);

    setImage(newImageUrl);
    setShowUploadButton(false);
  };

  const handleUploadClick = () => {
    fileCoverRef.current.click();
  };

  const handleResetImage = () => {
    setImage(getImageUrl(movie.cover));
    setShowUploadButton(true);
  };

  const handleUpdateImage = async () => {
    const file = fileCoverRef.current.files[0];

    if (!file) return null;

    const data = await updateMovieImage(movie.id, file);

    setImage(data.url);

    return data.publicId;
  };

  return {
    image,
    setImage,
    showUploadButton,
    showImageButton,
    setShowImageButton,
    fileCoverRef,
    handleCoverUpload,
    handleUploadClick,
    handleResetImage,
    handleUpdateImage,
  };
}
