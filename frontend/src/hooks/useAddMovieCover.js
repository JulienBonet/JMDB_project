import { useRef, useState } from 'react';

export function useAddMovieCover({ setCoverPreview }) {
  const fileCoverRef = useRef(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState('');

  const handleCoverChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverPreview(reader.result);
    };

    reader.readAsDataURL(file);
    setSelectedCoverFile(file);
  };

  const resetCoverFile = () => {
    setSelectedCoverFile('');

    if (fileCoverRef.current) {
      fileCoverRef.current.value = '';
    }
  };

  return {
    fileCoverRef,
    selectedCoverFile,
    handleCoverChange,
    resetCoverFile,
  };
}
