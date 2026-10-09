/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';

function MovieFocusThumbnail({ data, onClick }) {
  const { name, image: imageName } = data;
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  const getImageUrl = (image) => {
    if (!image) return `${CLOUDINARY_BASE_URL}/00_jmtb_item_default`;
    if (image.startsWith('http')) return image;
    return `${CLOUDINARY_BASE_URL}/${image}`;
  };

  // ------------
  // SX
  // ------------

  const containerMovieFocusThumbSx = {
    width: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',

    '&:hover img': {
      transform: 'scale(1.03)',
      filter: `
            drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 7px rgba(255, 255, 255, 0.7))
            brightness(1.20)
          `,
    },

    '&:hover .focus-thumbnail-name': {
      filter: 'brightness(1.20)',
    },
  };

  const imgMovieFocusThumbSX = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const titleMovieFocusThumbSx = {
    fontFamily: 'var(--font-02)',
    color: 'var(--color-01)',
    fontSize: 'medium',
  };

  // --------------
  // RETURN
  // --------------

  return (
    <Box
      key={data.id}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      sx={containerMovieFocusThumbSx}
    >
      <Box component="img" src={getImageUrl(imageName)} alt={name} sx={imgMovieFocusThumbSX} />

      <Typography sx={titleMovieFocusThumbSx}>{name}</Typography>
    </Box>
  );
}

export default MovieFocusThumbnail;
