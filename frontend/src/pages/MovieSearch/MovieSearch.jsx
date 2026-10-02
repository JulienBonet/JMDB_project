/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup, TextField } from '@mui/material';
import { VirtuosoGrid } from 'react-virtuoso';
import CachedIcon from '@mui/icons-material/Cached';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
//hooks
import useMovieSearchPage from '../../hooks/useMovieSearchPage';
// components
import YearDropdown from '../../components/YearOption/YearDropdown';
import CountryDropdown from '../../components/CountryOption/CountryDropdown';
import KindsDropdown from '../../components/KindOption/KindsDropdown';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import MovieCount from '../../components/MovieCount/MovieCount';
import LoaderCowardlySquid from '../../components/LoaderCowardlySquid/LoaderCowardlySquid';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
// styles
import '../../assets/css/scrollButton.css';
import './movieSearchVirtuoso.css';

function MovieSearch() {
  const {
    movies,
    search,
    selectedKind,
    selectedCountry,
    selectedYear,
    selectedTvShow,
    isLoading,

    setSelectedTvShow,

    handleTyping,
    handleKindChange,
    handleYearChange,
    handleCountryChange,

    handleAlphabeticBtnClick,
    handleChronologicBtnClick,
    handleResetSearch,
    clearSearch,

    handleUpdateMovie,
    handleDeleteMovie,
  } = useMovieSearchPage();

  // filtres / tri
  const [openSideBar, setOpenSideBar] = useState(false);

  // nombre de films
  const movieAmount = movies.length;

  // responsive / virtualisation
  const [mobileToggleOpen, setMobileToggleOpen] = useState(false);

  // movie list

  //-----------------------------
  // SX STYLES
  //-----------------------------
  const searchToggleGroupButtonSx = { borderRadius: '10px' };

  const searchToggleButtonSx = {
    color: 'var(--color-01)',
    border: 'solid 1px white',
    borderRadius: '10px',
    height: '40px',
    textTransform: 'none',
    '&.Mui-selected': { color: 'var(--color-03)' },
    '&:hover': {
      backgroundColor: 'var(--color-05)',
      border: 'solid 1px white',
    },
  };

  const ResetSearchButtonSx = {
    width: '3rem',
    height: '3rem',
    color: 'var(--color-01)',
    cursor: 'pointer',
    borderRadius: '50%',
    border: '2px solid var(--color-01)',
    p: 0.5,
    transition: 'all 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'transparent',

    '&:hover': {
      color: 'var(--color-02)',
      borderColor: 'var(--color-02)',
      transform: 'rotate(-0.25turn) scale(1.2)',
      boxShadow: '0 0 15px var(--color-03), 0 0 25px var(--color-03) inset',
      backgroundColor: 'rgba(255,255,255,0.1)',
    },

    '&:active': {
      color: 'var(--color-02)',
      borderColor: 'var(--color-02)',
      transform: 'scale(0.95) rotate(-0.1turn)',
      boxShadow: '0 0 10px var(--color-02) inset',
    },
  };

  //-----------------------------
  // RETURN
  //-----------------------------
  return (
    <Box
      component="main"
      id="MovieSearch_Main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <Box
        component="section"
        id="MovieSearch_Header"
        sx={{
          flex: '0 0 auto',
        }}
      >
        {/* header contents */}
        <Box
          component="section"
          id="MovieSearch_Filters"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            px: 2,
            minHeight: '5rem',

            flexDirection: {
              xs: 'column',
              lg: 'row',
            },

            py: {
              xs: 2,
              lg: 0,
            },
          }}
        >
          {/* Search bar */}
          <Box
            id="MovieSearch_SearchBar"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              p: {
                xs: '10px 0',
                xl: '10px',
              },

              width: {
                xs: '80%',
                lg: 'auto',
              },
            }}
          >
            <TextField
              value={search}
              onChange={handleTyping}
              placeholder="Rechercher un film..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#aaa' }} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSearch} size="small">
                      <ClearIcon sx={{ color: '#888' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--color-03)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--color-03)',
                    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                  },
                },
                input: {
                  color: '#333',
                  '&::placeholder': {
                    color: '#aaa',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>
          {/* end Search bar */}

          {/* Toggle button pour mobile */}
          <Box
            component="button"
            id="MovieSearch_MobileToggle"
            type="button"
            onClick={() => setMobileToggleOpen(!mobileToggleOpen)}
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.5rem',
              borderRadius: '100%',
              border: '1px solid var(--color-01)',
              p: 1,
              color: 'var(--color-01)',
              backgroundColor: 'var(--color-04)',
            }}
          >
            <span>{mobileToggleOpen ? '▲' : '▼'}</span>
          </Box>
          {/* end Toggle button pour mobile */}

          {/* Dropdowns */}
          <Box
            id="MovieSearch_Dropdowns"
            sx={{
              display: {
                xs: mobileToggleOpen ? 'flex' : 'none',
                md: 'flex',
              },

              alignItems: 'center',
              justifyContent: 'center',

              width: {
                xs: '80%',
                lg: '50%',
              },

              gap: {
                xs: 4,
                lg: 2,
              },

              flexWrap: {
                xs: 'wrap',
                lg: 'nowrap',
              },
            }}
          >
            <KindsDropdown
              onKindChange={handleKindChange}
              search={search}
              selectedKindData={selectedKind}
              handleUpdateMovie={handleUpdateMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
            <CountryDropdown
              onCountryChange={handleCountryChange}
              search={search}
              selectedCountryData={selectedCountry}
              handleUpdateMovie={handleUpdateMovie}
              handleDeleteMovie={handleDeleteMovie}
            />
            <YearDropdown
              onYearChange={handleYearChange}
              search={search}
              selectedYearData={selectedYear}
            />
          </Box>
          {/* end Dropdowns */}

          {/* Filter buttons */}
          <Box
            id="MovieSearch_FilterButtons"
            sx={{
              display: {
                xs: mobileToggleOpen ? 'flex' : 'none',
                md: 'flex',
              },

              alignItems: 'center',
              justifyContent: 'center',

              gap: {
                xs: 2,
                xl: 4,
              },

              flexDirection: {
                xs: 'column',
                md: 'row',
              },

              mb: {
                xs: 1,
                md: 0,
              },
            }}
          >
            <ToggleButtonGroup
              value={selectedTvShow}
              exclusive
              className="tvShowToggleGroup"
              onChange={(e, newValue) => newValue && setSelectedTvShow(newValue)}
              sx={searchToggleGroupButtonSx}
            >
              <ToggleButton value="all" sx={searchToggleButtonSx}>
                TOUS
              </ToggleButton>
              <ToggleButton value="movies" sx={searchToggleButtonSx}>
                FILMS
              </ToggleButton>
              <ToggleButton value="series" sx={searchToggleButtonSx}>
                SERIES
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleSortedButton
              active={movies.length > 0}
              onClick={() => setOpenSideBar(!openSideBar)}
            />
          </Box>
          {/* end Filter buttons */}
        </Box>
        {/* end header contents */}
      </Box>
      {/* END HEADER */}

      <div className="dashed_secondary_bar" />
      <MovieCount movieAmount={movieAmount} />

      {/* MOVIES LIST CONTENTS */}
      <Box
        component="section"
        id="MovieSearch_Results"
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: 'calc(100vh - 200px)',
        }}
      >
        {isLoading ? (
          // loader
          <Box
            id="MovieSearch_Loader"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LoaderCowardlySquid />
          </Box>
        ) : (
          <>
            {/* movies List */}
            <Box
              id="MovieSearch_ThumbnailsContainer"
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                pt: 2,
              }}
            >
              {/* sorted sticky bar */}
              <SideActionBar
                onAlphabeticClick={handleAlphabeticBtnClick}
                onChronologicClick={handleChronologicBtnClick}
                onResetClick={handleResetSearch}
                openSideBar={openSideBar}
                origin="movies"
              />
              {/* end sorted sticky bar */}

              {movies.length === 0 && (
                <Box
                  id="MovieSearch_NoResults"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '60vh',
                    textAlign: 'center',
                    gap: 3,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{
                      fontSize: '3rem',
                      fontFamily: 'var(--font-02)',
                      color: 'var(--color-03)',
                    }}
                  >
                    NO MOVIE FOUND ...
                  </Typography>

                  <CachedIcon onClick={handleResetSearch} sx={ResetSearchButtonSx} />
                </Box>
              )}

              {movies.length > 0 && (
                <>
                  {/* Movie List - Grid Virtuoso */}
                  <VirtuosoGrid
                    totalCount={movies.length}
                    listClassName="movieSearchVirtuosoList"
                    itemClassName="movieSearchVirtuosoItem"
                    itemContent={(index) => {
                      const movie = movies[index];

                      if (!movie) return null;

                      return (
                        <MovieThumbnail
                          key={movie.id}
                          data={movie}
                          onDeleteMovie={handleDeleteMovie}
                          onUpdateMovie={handleUpdateMovie}
                        />
                      );
                    }}
                  />
                  {/* end Movie List - Grid Virtuoso */}
                </>
              )}
            </Box>
            {/* end movies List */}
          </>
        )}
      </Box>
      {/* MOVIES LIST CONTENTS */}
    </Box>
  );
}

export default MovieSearch;
