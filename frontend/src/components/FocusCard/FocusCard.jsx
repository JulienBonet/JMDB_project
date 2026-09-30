/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import '../../assets/css/reactQuill_html_parametrage.css';
import wikipediaIco from '../../assets/ico/wikipedia_ico.png';
import imdbIco from '../../assets/ico/imdb_ico.png';
import senscritiqueIco from '../../assets/ico/sens_critique_ico.png';
import webIco from '../../assets/ico/web_ico.png';

function FocusCard({ selectedFocus, origin }) {
  if (!selectedFocus) return null;

  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
  const getImageUrl = (image) => {
    if (!image) return `${CLOUDINARY_BASE_URL}/00_jmtb_item_default`;
    if (image.startsWith('http')) return image;
    return `${CLOUDINARY_BASE_URL}/${image}`;
  };

  const imageUrl = getImageUrl(selectedFocus.image);
  const ArtistFocus = origin === 'ArtistFocus';

  const focusLinks = [
    { key: 'wikilink', icon: wikipediaIco, alt: 'Wikipedia' },
    { key: 'imdblink', icon: imdbIco, alt: 'IMDb' },
    { key: 'senscritiquelink', icon: senscritiqueIco, alt: 'Sens Critique' },
    { key: 'websitelink', icon: webIco, alt: 'Website' },
  ];

  return (
    <Box
      component="article"
      id="FocusCard_Container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* CARD CONTENTS */}
      <Box
        component="section"
        id="FocusCard_Content"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: {
            xs: '90%',
            md: '800px',
            lg: '900px',
            xl: '1200px',
          },
          backgroundColor: 'var(--color-04)',
          px: 3,
          py: { xs: 3, lg: 2.5 },
          gap: 3,
          flexDirection: {
            xs: 'column',
            md: 'column',
            lg: 'row',
          },
          borderRadius: 1,
        }}
      >
        {/* illustration */}
        <Box
          component="img"
          src={imageUrl}
          alt={selectedFocus.name}
          sx={{
            width: {
              xs: '50%',
              md: '40%',
              lg: '30%',
            },
            height: 'auto',
            borderRadius: '10px',
          }}
        />
        {/* end illustration */}

        {/* FOCUS INFOS */}
        <Box
          id="FocusCard_infos"
          sx={{
            width: '100%',
          }}
        >
          {/* focus title */}
          <Typography
            component="h2"
            id="FocusCard_Title"
            sx={{
              fontFamily: 'var(--font-02)',
              color: 'var(--color-01)',
              fontSize: {
                xs: 'x-large',
                md: 'xx-large',
              },
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            {selectedFocus.name}
          </Typography>
          {/* end focus title */}

          {/* top divider */}
          <Box
            sx={{
              backgroundColor: 'whitesmoke',
              width: '100%',
              height: '1px',
              my: 2,
            }}
          />
          {/* en top divider */}

          {/* focus pitch */}
          <Typography
            component="p"
            sx={{
              fontFamily: 'var(--font-02)',
              color: 'var(--color-01)',
              fontSize: 'medium',
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedFocus.pitch),
            }}
          />
          {/* end focus pitch */}

          {/* down divider */}
          <Box
            sx={{
              borderTop: '1px dashed whitesmoke',
              width: '100%',
              my: {
                xs: 3,
                md: 2,
              },
            }}
          />
          {/* end down divider */}

          {/* artists links */}
          {ArtistFocus && focusLinks.some((link) => selectedFocus?.[link.key]) && (
            <Box
              id="FocusCard_Links"
              sx={{
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'flex-end',
                },
                gap: {
                  xs: 3,
                  md: 2,
                },
              }}
            >
              {focusLinks.map(
                ({ key, icon, alt }) =>
                  selectedFocus?.[key] && (
                    <a
                      key={key}
                      href={selectedFocus[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Box
                        component="img"
                        src={icon}
                        alt={alt}
                        sx={{
                          width: {
                            xs: '2.5rem',
                            md: '2rem',
                          },
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </a>
                  )
              )}
            </Box>
          )}
          {/* end artists links */}
        </Box>
        {/* END FOCUS INFOS */}
      </Box>
      {/* END CARD CONTENTS */}
    </Box>
  );
}

export default FocusCard;
