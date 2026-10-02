/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
} from '@mui/material';
import { VirtuosoGrid } from 'react-virtuoso';
import CachedIcon from '@mui/icons-material/Cached';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
//hooks
import useMovieSearchPage from '../../hooks/useMovieSearchPage';
// components
import YearDropdown from '../../components/MovieSearchFilters/YearDropdown';
import CountryDropdown from '../../components/MovieSearchFilters/CountryDropdown';
import KindsDropdown from '../../components/MovieSearchFilters/KindsDropdown';
import MovieThumbnail from '../../components/MovieThumbnail/MovieThumbnail';
import MovieCount from '../../components/MovieCount/MovieCount';
import ToggleSortedButton from '../../components/ToggleSortedBtn/ToggleSortedButton';
import SideActionBar from '../../components/StickySideBar/StickySideBar';
import LoaderCowardlySquid from '../../components/LoaderCowardlySquid/LoaderCowardlySquid';
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

  // header toggle
  const [headerToggleOpen, setHeaderToggleOpen] = useState(false);

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
          minHeight: '5rem',
        }}
      >
        {/* header contents */}
        <Box
          component="section"
          id="MovieSearch_Filters"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 2,
            py: 2,
          }}
        >
          {/* SEARCH ROW */}
          <Box
            id="MovieSearch_SearchRow"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: 1,
            }}
          >
            {/* Search bar */}
            <Box
              id="MovieSearch_SearchBar"
              sx={{
                width: {
                  xs: '60%',
                  sm: '70%',
                  md: '450px',
                },
                maxWidth: '450px',
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

            {/* Header toggle */}
            <Box
              component="button"
              id="MovieSearch_HeaderToggle"
              type="button"
              onClick={() => setHeaderToggleOpen(!headerToggleOpen)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                cursor: 'pointer',
                fontSize: '1.2rem',
                borderRadius: '50%',
                border: '1px solid var(--color-01)',
                p: 1,
                mx: 2,
                color: 'var(--color-01)',
                backgroundColor: 'var(--color-04)',
              }}
            >
              {headerToggleOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            {/* end header toggle */}
          </Box>

          {/* CONTROLS ROW */}
          <Box
            id="MovieSearch_ControlsRow"
            sx={{
              display: headerToggleOpen ? 'flex' : 'none',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: {
                xs: 2.5,
                md: 3,
                lg: 4,
              },
            }}
          >
            {/* Dropdowns */}
            <Box
              id="MovieSearch_Dropdowns"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 2,
                width: {
                  xs: '100%',
                  md: 'auto',
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

            {/* Filter buttons */}
            <Box
              id="MovieSearch_FilterButtons"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                width: {
                  xs: '100%',
                  md: 'auto',
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
          </Box>
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
