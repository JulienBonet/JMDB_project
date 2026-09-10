import { useState } from 'react';

export function useTrailer() {
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  const toggleTrailerVideo = () => {
    setIsTrailerVisible(!isTrailerVisible);
    setIsTrailerLoading(true);
  };

  const handleTrailerReady = () => {
    setIsTrailerLoading(false);
  };

  const handleTrailerStart = () => {
    setIsTrailerLoading(false);
  };

  return {
    isTrailerVisible,
    isTrailerLoading,
    toggleTrailerVideo,
    handleTrailerReady,
    handleTrailerStart,
  };
}
