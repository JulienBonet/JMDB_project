import { useLoaderData } from 'react-router-dom';
import { Box } from '@mui/material';
import ArtistList from './ArtistList';
import ArtistFilmo from './ArtistFilmo';
import MovieArtistSearchBar from './MovieArtistSearchBar';
import useMovieArtistPage from '../../hooks/useMovieArtistPage';

function MovieArtistPage({ type, placeholder }) {
  const initialData = useLoaderData();

  const {
    data,
    selectedArtist,
    search,
    sortOrderA,
    sortOrderY,
    movieAmount,
    selectedArtistByLetter,
    openSideBar,
    filteredArtists,
    artistsAmount,
    selectedArtistAmount,
    setOpenSideBar,
    handleLetterChange,
    handleArtistClick,
    handleTyping,
    movieSortedA,
    movieSortedZ,
    movieSortedYear,
    movieSortedYearDesc,
    fetchMoviesByArtist,
    handleDeleteMovie,
    handleResetSearch,
  } = useMovieArtistPage({
    type,
    initialData,
  });

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      <Box
        component="section"
        id="MovieArtist_content"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          component="section"
          id="MovieArtist_search_bar"
          sx={{
            width: '100%',
          }}
        >
          <MovieArtistSearchBar
            placeholder={placeholder}
            search={search}
            onSearchChange={handleTyping}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            selectedItem={selectedArtist}
          />
        </Box>

        <div className="dashed_secondary_bar" />

        <Box
          component="section"
          id="MovieArtist_search_container"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <ArtistList
            handleLetterChange={handleLetterChange}
            search={search}
            selectedByLetter={selectedArtistByLetter}
            filteredArtist={filteredArtists}
            handleArtistClick={handleArtistClick}
            origin={type}
            artistAmount={artistsAmount}
            selectedArtistAmount={selectedArtistAmount}
          />

          <ArtistFilmo
            selectedArtist={selectedArtist}
            origin={type}
            data={data}
            sortOrderA={sortOrderA}
            movieSortedZ={movieSortedZ}
            movieSortedA={movieSortedA}
            sortOrderY={sortOrderY}
            movieSortedYearDesc={movieSortedYearDesc}
            movieSortedYear={movieSortedYear}
            movieAmount={movieAmount}
            onUpdateMovie={fetchMoviesByArtist}
            onDeleteMovie={handleDeleteMovie}
            onReset={handleResetSearch}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MovieArtistPage;
