/* eslint-disable no-plusplus */
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
// Services
import { getMoviesSortedNox } from '../../services/movieService';
// components
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';

function Home() {
  const initialData = useLoaderData();
  const [movies, setMovies] = useState(initialData);

  // xs < 600px → 1 film
  // sm 600–899px → 2 films
  // md et plus → 4 films
  const isMobile = useMediaQuery('(max-width:599.95px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:899.95px)');

  const moviesToShow = isMobile ? 1 : isTablet ? 2 : 4;

  const handleShuffle = async () => {
    const newMovies = await getMoviesSortedNox();
    setMovies(newMovies);
  };

  return (
    <Box
      component="main"
      id="Home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      {/* Home title */}
      <Box
        component="section"
        id="Home_title_container"
        sx={{
          flex: '0 0 auto',
        }}
      >
        <Box
          component="section"
          id="Home_title_position"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '5rem',
          }}
        >
          <Typography
            component="h1"
            id="Home_Main_Title"
            sx={{
              fontFamily: 'var(--font-01)',
              fontSize: '54px',
              color: 'var(--color-03)',
              display: 'flex',
              alignItems: 'center',
              m: 0,
            }}
          >
            J M D B
          </Typography>
        </Box>
      </Box>

      <div className="dashed_secondary_bar" />

      {/* Welcome content */}
      <Box
        component="section"
        id="Home_welcome_container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Box
          id="Home_welcome_content"
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            py: 4,
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Box
            id="Home_ShuffleThumbnails_welcome"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              id="Home_MovieThumbnails_welcome"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                border: '1px dashed white',
                borderRadius: '25px',
                py: 2,
                mb: 2,
              }}
            >
              {movies.slice(0, moviesToShow).map((movie) => (
                <MovieThumbnail key={movie.id} data={movie} homepage />
              ))}
            </Box>

            <Button
              value="New Shuffle"
              onClick={handleShuffle}
              variant="outlined"
              size="medium"
              sx={{
                color: 'var(--color-01)',
                borderColor: 'rgba(255, 255, 255, 0.6)',
                '&:hover': {
                  borderColor: 'var(--color-01)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Un film au hasard ?
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
