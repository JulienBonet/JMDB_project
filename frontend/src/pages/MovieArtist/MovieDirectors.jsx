import { useLoaderData } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

import './movieArtist.css';
import './movieArtistMediaQueries.css';
import ArtistList from '../../components/ArtistList/ArtistList';
import ArtistFilmo from '../../components/ArtistFilmo/ArtistFilmo';
import MovieArtistSearchBar from '../../components/MovieArtistSearchBar/MovieArtistSearchBar';
import useMovieArtistPage from '../../hooks/useMovieArtistPage';

function MovieDirectors() {
  const directorsData = useLoaderData();

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
    type: 'directors',
    initialData: directorsData,
  });

  // ----------------------------------
  // STYLE MUI
  // ----------------------------------
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fefee2',
        light: '#ffa500',
        dark: '#e59100',
        contrastText: '#242105',
      },
      artists_list: {
        main: '#fefee2',
        light: '#ffa500',
        dark: '#e59100',
        contrastText: '#242105',
      },
    },
  });

  // ----------------------------------
  // PROPS FOR TEXTS & IMAGE
  // ----------------------------------
  const origin = 'directors';

  // ----------------------------------
  // RETURN
  // ----------------------------------
  return (
    <main className="Main_movieArtistPage">
      <section className="artists_content">
        <section className="artists_search_bar_contents">
          <MovieArtistSearchBar
            placeholder="recherche réalisateur"
            search={search}
            onSearchChange={handleTyping}
            onReset={handleResetSearch}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            selectedItem={selectedArtist}
          />
        </section>

        <div className="dashed_secondary_bar" />

        <section>
          <section className="artists_seach_container">
            <ArtistList
              handleLetterChange={handleLetterChange}
              search={search}
              theme={theme}
              selectedByLetter={selectedArtistByLetter}
              filteredArtist={filteredArtists}
              handleArtistClick={handleArtistClick}
              origin={origin}
              artistAmount={artistsAmount}
              selectedArtistAmount={selectedArtistAmount}
            />

            <ArtistFilmo
              selectedArtist={selectedArtist}
              origin={origin}
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
          </section>
        </section>
      </section>
    </main>
  );
}

export default MovieDirectors;
