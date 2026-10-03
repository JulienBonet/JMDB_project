/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';
import '../../assets/css/common_elements.css';
import '../../assets/css/scrollButton.css';
import AlphabetDropdown from '../AlphabetOption/AlphabetDropdown';
import Counter from '../Counters/Counters';

function ArtistList({
  handleLetterChange,
  search,
  selectedByLetter,
  filteredArtist,
  handleArtistClick,
  origin,
  artistAmount,
  selectedArtistAmount,
}) {
  const artistsToDisplay = search === '' ? selectedByLetter : filteredArtist;

  const countToDisplay = search === '' ? artistAmount : selectedArtistAmount;
  return (
    <Box
      component="section"
      id="MovieArtist_group_section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: {
          xs: '50%',
          md: '30%',
          lg: '20%',
        },
        height: '90vh',
      }}
    >
      <Counter origin={origin} countAmount={countToDisplay} />
      <AlphabetDropdown
        onLetterChange={handleLetterChange}
        origin={origin}
        AlphabetDropdownClassName="artistlist"
        search={search}
      />
      <Box
        id="MovieArtist_list_container"
        sx={{
          width: '100%',
          height: {
            xs: '60vh',
            sm: '75vh',
            md: '65vh',
          },

          overflow: 'auto',
          my: 1,
          pt: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          id="MovieArtist_list"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {artistsToDisplay.map((artist) => (
            <Button
              key={artist.id}
              variant="text"
              color="primary"
              size="small"
              onClick={() => handleArtistClick(artist)}
              sx={{
                fontFamily: 'var(--font-04)',
                color: 'var(--color-01)',
                fontSize: 'medium',
                display: 'flex',
                flexWrap: 'wrap',
                width: '90%',
              }}
            >
              {artist.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
export default ArtistList;
