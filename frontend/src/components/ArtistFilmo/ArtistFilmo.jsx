/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
// components
import MovieCountArtistMovie from '../MovieCountArtistMovie/MovieCountArtistMovie';
import MovieThumbnail from '../MovieThumbnail/MovieThumbnail';
// illustrations
import DirectorBear from '../../assets/ico/director_bear_01.jpeg';
import ActorBear from '../../assets/ico/actor-bear.jpg';
import ScreenwriterBear from '../../assets/ico/screenwiter-bear.jpeg';
import MusicBear from '../../assets/ico/compositor-bear.jpeg';
import StudioBear from '../../assets/ico/studio_bear.jpeg';
import TagBear from '../../assets/ico/search_Bear_02.jpeg';
import SideActionBar from '../StickySideBar/StickySideBar';

// config Bear artist content
const artistBearContent = {
  directors: {
    image: DirectorBear,
    alt: 'a Bear director',
    text: 'QUEL REALISATEUR CHERCHONS NOUS ?',
  },
  casting: {
    image: ActorBear,
    alt: 'a Bear actor',
    text: 'QUEL ACTEUR CHERCHONS NOUS ?',
  },
  screenwriters: {
    image: ScreenwriterBear,
    alt: 'a Bear screenwriter',
    text: 'QUEL SCENARISTE CHERCHONS NOUS ?',
  },
  music: {
    image: MusicBear,
    alt: 'a Bear MUSIC COMPOSITOR',
    text: 'QUEL MAESTRO CHERCHONS NOUS ?',
  },
  studio: {
    image: StudioBear,
    alt: 'a Bear MUSIC COMPOSITOR',
    text: 'QUEL STUDIO CHERCHONS NOUS ?',
  },
  tags: {
    image: TagBear,
    alt: 'a Bear searching movie',
    text: 'AVEC QUEL TAG CHERCHONS NOUS ?',
  },
};

function ArtistFilmo({
  selectedArtist,
  origin,
  data,
  movieAmount,
  onUpdateMovie,
  onDeleteMovie,
  movieSortedA,
  movieSortedZ,
  movieSortedYear,
  movieSortedYearDesc,
  sortOrderA,
  sortOrderY,
  onReset,
  openSideBar,
}) {
  const bearContent = artistBearContent[origin];

  // sorted Logics
  const handleAlphabeticBtnClick = async () => {
    if (sortOrderA === 'asc') {
      await movieSortedZ();
    } else {
      await movieSortedA();
    }
  };

  const handleChronologicBtnClick = async () => {
    if (sortOrderY === 'asc') {
      await movieSortedYearDesc();
    } else {
      await movieSortedYear();
    }
  };

  const handleResetSearch = () => {
    onReset();
  };

  return (
    <Box
      component="section"
      id="MovieArtist_filmo_section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: {
          xs: '50%',
          md: '70%',
          lg: '80%',
        },
        height: '90vh',
        borderLeft: '1px solid white',
      }}
    >
      {/* BEAR TITLE SECTION */}
      {selectedArtist === '' && (
        <Box
          component="section"
          id="MovieArtist_bear"
          sx={{
            width: '90%',
            height: '75vh',
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Box
            id="MovieArtist_bear_position"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Box
              id="MovieArtist_bear_container"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: {
                  xs: '100%',
                  lg: '88%',
                },
                gap: {
                  xs: 2,
                  lg: 0,
                },
                flexDirection: {
                  xs: 'column',
                  lg: 'row',
                },
              }}
            >
              <Box
                id="MovieArtist_pitch_container"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Typography
                  id="MovieArtist_pitch"
                  sx={{
                    fontFamily: 'var(--font-03)',
                    textAlign: 'center',
                    lineHeight: 'normal',
                    color: 'var(--color-01)',
                    fontSize: {
                      xs: 'large',
                      md: 'x-large',
                      lg: 'xx-large',
                    },
                  }}
                >
                  {bearContent.text}
                </Typography>
              </Box>

              <Box
                component="img"
                src={bearContent.image}
                alt={bearContent.alt}
                sx={{
                  width: { xs: '80%', md: '45%' },
                  borderRadius: '25px',
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      {/* END BEAR TITLE SECTION */}

      {/* ARTIST MOVIES LIST */}
      {selectedArtist !== '' && (
        <Box
          component="section"
          id="MovieArtist_filmo"
          sx={{
            width: '100%',
          }}
        >
          <SideActionBar
            onAlphabeticClick={handleAlphabeticBtnClick}
            onChronologicClick={handleChronologicBtnClick}
            onResetClick={handleResetSearch}
            selectedItems={selectedArtist}
            origin={origin}
            openSideBar={openSideBar}
          />

          <Box>
            <MovieCountArtistMovie movieAmount={movieAmount} />
          </Box>

          <Box
            id="MovieArtist_filmo_thumbs"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              height: '75vh',
              pt: 2,
              overflow: 'auto',
            }}
          >
            {data.map((filmo) => (
              <MovieThumbnail
                key={filmo.id}
                data={filmo}
                onUpdateMovie={onUpdateMovie}
                onDeleteMovie={onDeleteMovie}
              />
            ))}
          </Box>
        </Box>
      )}
      {/* END ARTIST MOVIES LIST */}
    </Box>
  );
}

export default ArtistFilmo;
